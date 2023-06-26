import React from 'react';
import BookCard from '../components/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase';
import Swal from 'sweetalert2';
// import { useFirebase } from '../context/Firebase';

const HomePage = ({userName}) => {
    const navigate = useNavigate();
    const user = auth.currentUser;
    const handleAddClick = () => {
        if (user) {
          Swal.fire({
            title: 'Add your files',
            html:
            '<input id="fileInput" class="swal2-input custom-swal-input" placeholder="Enter file name" type="text">' +
            '<label for="file" class="swal2-file-input-label custom-swal-file-input-label">' +
            'Choose file <input id="file" class="swal2-file-input custom-swal-file-input" type="file" style="display:none">' +
            '</label>',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: () => {
              const fileName = document.getElementById('fileInput').value;
              const file = document.getElementById('file').files[0];
              // Handle the file submission or validation here
              if (!file) {
                Swal.showValidationMessage('Please select a file');
              } else {
                console.log('File Name:', fileName);
                console.log('File:', file);
              }
            },
            allowOutsideClick: () => !Swal.isLoading(),
            customClass: {
              confirmButton: 'custom-swal-confirm-button',
              cancelButton: 'custom-swal-cancel-button',
              choosefile : 'swal2-file-input',
            },
          });
        } else {
          alert(Swal.fire('Login first'));
        }
      };
    return (
        <div>
        <div className="container" style={{border: 'groove', 'borderRadius':'5px', marginTop: '20px', marginBottom: '20px'}}>
            <h1 className='text-primary' style={{textTransform : "capitalize"}} >Hey {userName ? userName : "User"},</h1>
            <hr style={{background: "cornflowerblue", height: "3px", border: "none"}}/>
            <h3 className='text-primary'  > {userName ? "Here are your recent audios:" : "Your audios will appear here"}</h3>
                {userName && <BookCard />}
        </div>
        {/* onClick={ () => { user ? navigate('/upload') : alert('Login First')  }} */}
        <Button 
        variant="success"
        onClick={handleAddClick}
         style={{display: "flex", marginLeft: 'auto', marginBottom: '5px'}}>ADD</Button> 
        </div>  
    );
};

export default HomePage;