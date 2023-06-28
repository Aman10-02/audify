const express = require('express')
const cors = require('cors')
<<<<<<< HEAD
const getText = require('./videos/whisper')
=======
>>>>>>> 3e8c79870f3af177065ae680ecf69409d2cbd186
const fs = require('fs')
const app = express();
const firebase = require('./firebase')
const { getDownloadURL, getStorage, ref, uploadBytesResumable } = require('firebase/storage')

const FFmpeg = require('fluent-ffmpeg');
<<<<<<< HEAD
const { exec } = require('child_process');
const getCaptions = require('./uploadSrt')
// const splitVideoPromise = require('./temp');
// const { timeStamp } = require('console');

function getFileDuration(filePath) {
    return new Promise((resolve, reject) => {
        const ffprobeCommand = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`;

        exec(ffprobeCommand, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            const durationInSeconds = parseFloat(stdout);
            const minutes = Math.floor(durationInSeconds / 60);
            const seconds = Math.floor(durationInSeconds % 60);
            const formattedDuration = `${minutes} min ${seconds} sec`;
            resolve(formattedDuration);
        });
    });
}


const uploadMp3 = async (res) => {

    console.log("inside uploadMp3");

    fs.readFile("./videos/temp.mp3", (err, file) => {
        if (err) {
            console.log("err from readFile :", err);
        } else {

            console.log("inside read file callback")

            const fileName = new Date().getTime() + "temp.mp3";
            const storage = getStorage(firebase);
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                    }
                },

                (error) => {
                    // Handle unsuccessful uploads
                    console.log("upload error", error);
                },

                async () => {
                    // Handle successful uploads on complete
                    console.log("second")
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log('File available at', downloadURL);



                    // const duration = await 
                    const duration = await getFileDuration('./videos/temp.mp3')
                        .then((duration) => {
                            console.log('Video duration:', duration);
                            return duration;
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });

                    // try {
                    const result = await getText();
                    console.log("after getText()", result);
                    const Captions = await getCaptions();
                    // } catch (error) {
                    //     console.log("from get Text :", error);
                    // }




                    fs.unlink('./videos/temp.mp3', () => {
                        res.json(
                            {
                                url: downloadURL,
                                captions: Captions,
                                duration: duration ? duration : "",
                                msg: "well done"
                            })
                        console.log("response sent after unlink")
                    })
                }

            );
        }
    });
}



app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.listen(5000, () => {
    console.log("listening")
});




app.post("/upload", (req, res) => {

    console.log("body is here", req.body)
    const url = req.body.url;

    new FFmpeg({ source: url }).withNoVideo()
        .on('progress', function (progress) {
            console.log('Processing: ' + progress.percent + '% done');
        })
        .on('end', async () => {
            console.log('Processing finished !');
            console.log("inside callback")
            console.log("mp3 generated")
            await uploadMp3(res);
        })
        .on('error', (err) => { console.log(err) })
        .saveToFile('./videos/temp.mp3')
})



=======
app.use(cors(
    {
        origin: "http://localhost:3000"
    }
    ))
    
app.use(express.json())
app.listen(5000, () => {
    console.log("listening")
} );

app.use(  (req,res) => {
//   console.log(req);
  console.log("body is here", req.body)
  const url = req.body.url;
  // var inStream = fs.createReadStream('./videos/aman.mp4');
//   const url = "https://firebasestorage.googleapis.com/v0/b/audify-2a5df.appspot.com/o/1687293597440aman.mp4?alt=media&token=13a862e3-9b46-4729-a32c-216cf5aed4aa"
 new FFmpeg({ source: url }).withNoVideo()
.on('progress', function(progress) {
    console.log('Processing: ' + progress.percent + '% done');
}).on('end',  () => {

    
        console.log('Processing finished !');
        console.log("inside callback")

    fs.readFile("./videos/amancool.mp3", (err, file) => {

    
    const fileName = new Date().getTime() + "test.mp3";
    const storage = getStorage(firebase);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
      (snapshot) => {
            // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
            }
          },
          (error) => {
                // Handle unsuccessful uploads
              },
        async () => {
            // Handle successful uploads on complete
            console.log("second")
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL);
            fs.unlink('./videos/amancool.mp3', () => {

                res.json(
                    {
                        url : downloadURL,
                        msg: "well done"
                    })
                } )
                
            } );
// }
        } );

    }
).on('error', (err) => {console.log(err)} )
.saveToFile( './videos/amancool.mp3',  )

    

})
>>>>>>> 3e8c79870f3af177065ae680ecf69409d2cbd186
