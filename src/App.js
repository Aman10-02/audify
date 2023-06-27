import React, { useEffect, useState } from "react";

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
import View from "./components/View/View";

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
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
    </div>
  );
}

export default App;