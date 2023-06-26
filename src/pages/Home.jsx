import React from 'react';
import BookCard from '../components/Card';
import Button from 'react-bootstrap/Button';
// import { useFirebase } from '../context/Firebase';

const HomePage = () => {

    return (
        <div>

        <div className="container" style={{border: 'groove', 'borderRadius':'5px',
         marginTop: '20px',
          marginBottom: '20px'
        }}
          >
            <div
             style={{ 
                display:'flex', justifyContent:'space-between',alignItems : 'center'
            }}
            >
           <div>
            <h1 className='text-primary'>Hey Sparsh,</h1>
            <hr style={{background: "cornflowerblue", height: "3px", border: "none"}}/>
            <h3 className='text-primary'>Here are your recent audios:</h3>
            </div>
            <Button variant="success" style={{ marginLeft: '10px' }}>ADD</Button>
        </div>
     <BookCard/>
      
        </div> 

        </div> 
    );
};

export default HomePage;