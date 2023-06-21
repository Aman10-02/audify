import React, { useState } from 'react';
import app from "../firebase"
import { getDownloadURL, getStorage, ref, uploadBytesResumable, deleteObject } from 'firebase/storage';

function Upload() {

  const [val, setVal] = useState("");
  const [file, setFile] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
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
        deleteObject(storageRef).then(() => {
          console.log("File deleted successfully")
        }).catch((error) => {
          console.log(error);
        });
      }
    );
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>

        <input type="file" required onChange={e =>setFile(e.target.files[0])}/>
        <input type="submit" value="done" />
      </form>
      {val &&
        <a href={val.url}  >click here to download audio</a>
      }
    </div>
  )
}

export default Upload