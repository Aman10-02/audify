const fs = require('fs');
const parser = require('subtitles-parser')

const getCaptions = () => {
    const srtFile = fs.readFileSync("./videos/temp.srt", 'utf-8' )
    console.log(srtFile);
    const Captions = parser.fromSrt(srtFile, true);
    console.log("inside read file callback", Captions);
    fs.unlink('./videos/temp.srt', () => {
        console.log("srt file unlinked");
    });
    return Captions;
}

module.exports = getCaptions