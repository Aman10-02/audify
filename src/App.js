import React, { useEffect, useState } from "react";
<<<<<<< HEAD

=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
>>>>>>> d72e695a845a203ae5d10857e9776eb02f35a24a
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

import { auth } from "./firebase";

import "./App.css";
<<<<<<< HEAD
import Upload from "./components/Upload/Upload";
import { Routes, Route } from 'react-router-dom';

//Components
import MyNavbar from './components/Navbar';

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
=======
>>>>>>> d72e695a845a203ae5d10857e9776eb02f35a24a

//Pages
import HomePage from './pages/Home';
import View from "./components/View/View";

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
<<<<<<< HEAD
        // console.log(user);
        setUserName(user.displayName);
      } else setUserName("");
    });
  });

  return (
    <div className="App">
    <MyNavbar userName = {userName} />
    <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {userName && <>
          <Route path="/upload" element={<Upload />} />
          <Route path="/view" element={<View />} />
          </>}

          <Route path="/" element={<HomePage userName={userName} />}></Route>
    </Routes>
=======
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/login" element={<Login />} />   
        <Route path="/signup" element={<Signup />} />  
          
          <Route path="/" element={<Home name={userName} />} />
        </Routes>
      </Router>
>>>>>>> d72e695a845a203ae5d10857e9776eb02f35a24a
    </div>
  );
}

export default App;