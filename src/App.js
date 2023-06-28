import React, { useEffect, useState } from "react";
<<<<<<< HEAD
<<<<<<< HEAD

=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
>>>>>>> d72e695a845a203ae5d10857e9776eb02f35a24a
=======

>>>>>>> 3e8c79870f3af177065ae680ecf69409d2cbd186
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

import { auth } from "./firebase";

import "./App.css";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3e8c79870f3af177065ae680ecf69409d2cbd186
import Upload from "./components/Upload/Upload";
import { Routes, Route } from 'react-router-dom';

//Components
import MyNavbar from './components/Navbar';

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
<<<<<<< HEAD
=======
>>>>>>> d72e695a845a203ae5d10857e9776eb02f35a24a

//Pages
import HomePage from './pages/Home';
import View from "./components/View/View";
=======

//Pages
import HomePage from './pages/Home';
>>>>>>> 3e8c79870f3af177065ae680ecf69409d2cbd186

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
<<<<<<< HEAD
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
=======
        // console.log(user);
>>>>>>> 3e8c79870f3af177065ae680ecf69409d2cbd186
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  return (
    <div className="App">
<<<<<<< HEAD
      <Router>
        <Routes>
        <Route path="/login" element={<Login />} />   
        <Route path="/signup" element={<Signup />} />  
          
          <Route path="/" element={<Home name={userName} />} />
        </Routes>
      </Router>
>>>>>>> d72e695a845a203ae5d10857e9776eb02f35a24a
=======
    <MyNavbar userName = {userName} />
    <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/" element={<HomePage userName={userName} />}></Route>
    </Routes>
>>>>>>> 3e8c79870f3af177065ae680ecf69409d2cbd186
    </div>
  );
}

export default App;