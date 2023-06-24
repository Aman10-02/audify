import React from 'react';
import BookCard from '../components/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase';
// import { useFirebase } from '../context/Firebase';

const HomePage = ({userName}) => {
    const navigate = useNavigate();
    const user = auth.currentUser;
    return (
        <div>
        <div className="container" style={{border: 'groove', 'borderRadius':'5px', marginTop: '20px', marginBottom: '20px'}}>
            <h1 className='text-primary' style={{textTransform : "capitalize"}} >Hey {userName ? userName : "User"},</h1>
            <hr style={{background: "cornflowerblue", height: "3px", border: "none"}}/>
            <h3 className='text-primary'  > {userName ? "Here are your recent audios:" : "Your audios will appear here"}</h3>
                {userName && <BookCard />}
        </div>
        <Button variant="success" onClick={ () => { user ? navigate('/upload') : alert('Login First')  }} style={{display: "flex", marginLeft: 'auto', marginBottom: '5px'}}>ADD</Button> 
        </div>  
    );
};

export default HomePage;