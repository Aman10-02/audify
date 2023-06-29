import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase"
import { signOut } from "firebase/auth";

function Home(props) {

 const navigate = useNavigate() 

 const user = auth.currentUser

 const handleSignout = () => {
    signOut(auth)
    .then(() => {
       navigate('/')
    })
 }

  return (
    <div>
        {
           !user && 
          <h1>
            <Link to="/signup">Signup</Link>
          </h1>
        }
        {
           user && 
           <h1>
              <button onClick={handleSignout}>Signout</button>
<<<<<<< HEAD
              <Link to="/upload" >Upload</Link>
=======
>>>>>>> d72e695a845a203ae5d10857e9776eb02f35a24a
           </h1>
        }
    </div>
  );
}

export default Home;