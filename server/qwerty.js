// const splitVideoPromise = require('./temp')
// const splitVideoPromise = require('./temp')
// import srtParser2 from "srt-parser-2"
// const fs = require('fs');
// // fs.readFile("./videos/aman.srt", (err, file) => {
// //     const parser = new srtParser2();
// //     if (err) {
// //         console.log("err from readFile :", err);
        
// //     } else {
// //         console.log(file);
// //         const captionsText = file.text();
// //         const parsedCaptions = parser.fromSrt(captionsText);
// //         console.log("inside read file callback",parsedCaptions )
// //     }})
// const srtToObj = require('srt-to-obj');

// const srtData = fs.readFileSync('./videos/aman.srt', 'utf8');
// const ret = async () => {

//     const subtitles = await srtToObj('./videos/aman.srt');
//     console.log(subtitles)
// }
// ret();
const fs = require('fs');
const parser = require('subtitles-parser')
const srt = fs.readFileSync('./videos/aman.srt','utf8');
 
const data = parser.fromSrt(srt, true);
console.log(data)