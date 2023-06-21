const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express();
const firebase = require('./firebase')
const { getDownloadURL, getStorage, ref, uploadBytesResumable } = require('firebase/storage')

const FFmpeg = require('fluent-ffmpeg');
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