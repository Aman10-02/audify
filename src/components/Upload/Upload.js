import React, { useEffect, useState } from 'react';
import { app, auth } from "../../firebase"
import { getDownloadURL, getStorage, ref, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
// import moment from 'moment';
import AudioPlayer from '../AudioPlayer';

import ReactAudioPlayer from "react-audio-player";
import axios from 'axios';
import srtParser2 from 'srt-parser-2';

function Upload() {
  const parser = new srtParser2();
  const navigate = useNavigate();
  const [val, setVal] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("")
  const handleSubmit = async (event) => {
    event.preventDefault();

    const tempFileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, tempFileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
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

      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const response = await fetch("http://localhost:5000/", {
          method: "POST",
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({url : downloadURL })
        });
        const data = await response.json();
        setVal(data);
        console.log("first : ", data, JSON.stringify(data))
        const db = getFirestore(app);
        const toUpload = {};
        toUpload[fileName] =  { 
                          createdOn : Date(),
                          updatedOn : Date(),
                          url : data.url,
                          duration: data.duration
                        }
        console.log(toUpload)
        const fileRef = doc(db, "Files", auth.currentUser.uid );
        deleteObject(storageRef).then(() => {
          console.log("File deleted successfully")
        }).catch((error) => {
          console.log(error);
        });
        await setDoc(fileRef, toUpload ,{merge: true})
        navigate('/');
      }
    );
  };

  const [currentTime, setCurrentTime] = useState();
  const [captions, setCaptions] = useState([]);
  useEffect(() => {
    const loadCaptions = async () => {
      console.log("inside load captions")
      const captionsData = await axios.get("aman.srt");
      console.log("cptData",captionsData)
      const captionsText = await captionsData.data;
      const parsedCaptions = parser.fromSrt(captionsText);
      setCaptions(parsedCaptions);
      console.log("cpt text",captionsText)
      console.log(parsedCaptions)
    };

    loadCaptions();
    // Update the current time based on the video player's time
    const handleTimeUpdate = (event) => {
      setCurrentTime(Math.floor(event.target.currentTime));
    };

    const audioElement = document.getElementById("toChange");
    console.log(audioElement)
    audioElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      // Clean up the event listener
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='name of file' required onChange={ e => setFileName(e.target.value) } />
        <input type="file" required onChange={e =>setFile(e.target.files[0])}/>
        <input type="submit" value="done" />
      </form>
      <div>{fileName}</div>
      {val &&
       
       
      <>
        <a href={val.url}  >click here to download audio</a>
        <div style={{width : "50px", height:"50px", margin:"auto", backgroundColor:"yellow"}} onClick={() => {
         const audio = new Audio(val.url);
         audio.play();
        }} >play</div>
      </>
      }
      <AudioPlayer captions={captions} currentTime={currentTime} />
      {/* <div className="caption">"this is caption" {console.log(currentCaption)}</div> */}
      <ReactAudioPlayer id='toChange' src="aman.mp3" controls />
      <div>{currentTime}</div>
    </div>
  )
}

export default Upload