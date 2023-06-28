import React, { useState } from 'react';
import BookCard from '../components/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import { app,auth } from '../firebase';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import './Home.css'



// import { useFirebase } from '../context/Firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

const HomePage = ({userName}) => {



    const navigate = useNavigate();
    const user = auth.currentUser;

    const handleSubmit = async (file, fileName) => {  
      console.log("inside handle submit",file,fileName)
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
          window.location.reload(); // Refresh the page
        }
      );
     
    };


    const handleAddClick = () => {
      if (user) {
        Swal.fire({
          title: 'Add your files',
          html: `
            <input id="fileInput" class="swal2-input custom-swal-input" placeholder="Enter file name" type="text">
            <label for="file" class="swal2-file-input-label custom-swal-file-input-label">
              Choose file <input id="file" class="swal2-file-input custom-swal-file-input" type="file" style="display:none">
            </label>`,
          showCancelButton: true,
          confirmButtonText: 'Submit',
          showLoaderOnConfirm: true,
          preConfirm: async () => {
            const fileName = document.getElementById('fileInput').value;
            const file = document.getElementById('file').files[0];
    
            if (!file || !fileName) {
              Swal.showValidationMessage('Please select a file or provide a file name');
            } else {
              Swal.showLoading(); // Show the loading indicator
              try {
                // Simulate an asynchronous operation (replace with your actual logic)
                await new Promise((resolve) => setTimeout(resolve, 2000));
    
                // Process the file submission or validation here
                console.log('File Name:', fileName);
                console.log('File:', file);
                handleSubmit(file, fileName);
    
                Swal.hideLoading(); // Hide the loading indicator
                Swal.close(); // Close the Swal modal
              } catch (error) {
                Swal.hideLoading(); // Hide the loading indicator
                Swal.showValidationMessage(`Error: ${error.message}`);
              }
            }
          },
          allowOutsideClick: () => !Swal.isLoading(),
          customClass: {
            confirmButton: 'custom-swal-confirm-button',
            cancelButton: 'custom-swal-cancel-button',
            choosefile: 'swal2-file-input',
          },
        });
      } else {
        Swal.fire({
          title: 'Login first',
          showCancelButton: false,
          confirmButtonText: 'OK',
        }).then(() => {
          // Redirect to the login page
          navigate('/login'); // Replace '/login' with the actual path to your login page
        });
      }
    };
    
    return (
      <div
      className="homepage-container"
    >
        <div className="container" style={{border: 'groove', 'borderRadius':'5px', marginTop: '20px', marginBottom: '20px'}}>
            <h1 style={{color:'aquamarine', textTransform : "capitalize"}}>Hey {userName ? userName : "User"},</h1>
            <hr style={{background: "aquamarine", height: "3px", border: "none"}}/>
            <h3 style={{color:'aquamarine'}}  > {userName ? "Please Find Your Recent Audios Here :" : "Your Audios Will Appear Here"}</h3>
                {userName && <BookCard />}
        </div>
        {/* onClick={ () => { user ? navigate('/upload') : alert('Login First')  }} */}
        <Button 
        className='bntt'
        variant="success"
        onClick={handleAddClick}
        style={{
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    zIndex: '9999',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    width: '50px',
    height: '50px',
    background:'black',
   backgroundBlendMode:'normal',
   background: 'rgb(238,174,202)',
background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',

        }}><FontAwesomeIcon icon={faFile} className="fa-regular fa-file fa-beat-fade fa-lg"    style={{ color: '010213' }} /></Button> 
        </div>  
    );
};

export default HomePage;
