import React, { useEffect, useState } from "react";
import { app, auth } from "../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Upload() {
  const navigate = useNavigate();
  const [val, setVal] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const tempFileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, tempFileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {},
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: downloadURL }),
        });
        const data = await response.json();
        setVal(data);
        console.log("first : ", data, JSON.stringify(data));
        const db = getFirestore(app);
        const toUpload = {};
        toUpload[fileName] =  { 
                          createdOn : Date(),
                          updatedOn : Date(),
                          url : data.url,
                          captions : data.captions,
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

  return (
    <div className="Add">
      <h2>Add a New Video</h2>
      <form onSubmit={handleSubmit}>
        <label>File Name:</label>
        <input
          className="textt"
          type="text"
          required
          onChange={(e) => setFileName(e.target.value)}
        />
        <div className="btn">
          <button>Select File</button>
          <input
            className="upload"
            type="file"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {/* <input type="submit" value="done" /> */}
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
      
    </div>
  );
}

export default Upload;
