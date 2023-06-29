const { spawn } = require("child_process");

const getText = () => {
    return new Promise((resolve, reject) => {
        console.log("inside promise");
        const outdata = spawn( "whisper", ["temp.mp3", "--model", "tiny", "--output_format", "srt"], {cwd : "./videos"});
        
        outdata.stdout.pipe(process.stdout);

        outdata.stderr.pipe(process.stdout);

        outdata.on('error', (error) => {
            console.log(`error: ${error.message}`);
        });

        outdata.on("close", code => {
            console.log(`child process exited with code ${code}`);
            // if(code === 0){
                resolve("success");
            // }else{
            //     reject("error");
            // }
        });
    });
}
module.exports = getText
// getText();