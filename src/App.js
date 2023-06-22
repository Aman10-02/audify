import React, { useEffect, useState } from "react";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

import { auth } from "./firebase";

import "./App.css";
import Upload from "./components/Upload/Upload";
import { Routes, Route } from 'react-router-dom';

//Components
import MyNavbar from './components/Navbar';

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//Pages
import HomePage from './pages/Home';

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log(user);
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  return (
    <div className="App">
    <MyNavbar />
    <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home name={userName} />} />
          <Route path="/upload" element={<Upload name={userName} />} />
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/login" element={<h1>Login</h1>}></Route>
    </Routes>
    </div>
  );
}

export default App;