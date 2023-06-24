// const splitVideoPromise = require('./temp')
// const splitVideoPromise = require('./temp')
const getText = require('./videos/whisper')
// const {timeStamps, totalSegments} =  splitVideoPromise('./videos/test.wav','./outputFiles/', 10 )
// console.log("first", timeStamps, totalSegments)
const start = async () => {

              
                const result =    await getText();
                console.log(result);
}
start();