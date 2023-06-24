const FFmpeg = require('fluent-ffmpeg');

// FFmpeg('./videos/Wheeler.mp3')
//             .outputOptions(
//                 '-vf' ,'subtitles = ./videos/Wheeler.srt'
//             )
//             .on('error', function(err) {
//                 console.log('Error: ' + err.message);
//             })
//             .save('./videos/merge.mp4');


const audioPath = './videos/Wheeler.mp4';
const subtitlePath = './videos/Wheeler.srt';
const outputPath = './outputFiles/output2.mp4';

FFmpeg()
  .input(audioPath)
  .outputOptions('-vf', `subtitles=${subtitlePath}`)
  .withNoVideo()
  .on('error', function (err) {
    console.log('Error: ' + err.message);
  })
  .on('end', function () {
    console.log('Subtitles added successfully.');
  })
  .save(outputPath);