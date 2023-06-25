const DeepSpeech = require('deepspeech');
const Fs = require('fs');
const Sox = require('sox-stream');
const MemoryStream = require('memory-stream');
const Duplex = require('stream').Duplex;
const Wav = require('node-wav');

const getText = (chunkNumber, timestamp, audioFile) => {

	console.log("inside getText", audioFile);
	let modelPath = './deepSpeechModels/deepspeech-0.9.3-models.pbmm';
	
	let model = new DeepSpeech.Model(modelPath);

	let desiredSampleRate = model.sampleRate();

	let scorerPath = './deepSpeechModels/deepspeech-0.9.3-models.scorer';

	model.enableExternalScorer(scorerPath);

	// let audioFile = process.argv[2] || './videos/test.wav';
	// let audioFile = './videos/test.wav';

	if (!Fs.existsSync(audioFile)) {
		console.log('file missing:', audioFile);
		process.exit();
	}

	const buffer = Fs.readFileSync(audioFile);
	const result = Wav.decode(buffer);

	if (result.sampleRate < desiredSampleRate) {
		console.error('Warning: original sample rate (' + result.sampleRate + ') is lower than ' + desiredSampleRate + 'Hz. Up-sampling might produce erratic speech recognition.');
	}

	function bufferToStream(buffer) {
		let stream = new Duplex();
		stream.push(buffer);
		stream.push(null);
		return stream;
	}
	
	let audioStream = new MemoryStream();
	bufferToStream(buffer)
	.pipe(Sox({
		global: {
			'no-dither': true,
		},
		output: {
			bits: 16,
			rate: desiredSampleRate,
			channels: 1,
			encoding: 'signed-integer',
			endian: 'little',
			compression: 0.0,
			type: 'raw'
		}
	}))
	.pipe(audioStream);

	audioStream.on('finish', () => {
		let audioBuffer = audioStream.toBuffer();
		
		const audioLength = (audioBuffer.length / 2) * (1 / desiredSampleRate);
		console.log('audio length', audioLength);
		
		let result = model.stt(audioBuffer);
		Fs.appendFileSync("./videos/speech.stt", `${chunkNumber}\n ${timestamp} \n${result}\n`);
		console.log('result:', result);
	});
}

module.exports = getText