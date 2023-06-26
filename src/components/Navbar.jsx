
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from "react";

import logo from "./audify-low-resolution-logo-color-on-transparent-background.png";


const MyNavbar = () => {
  const [isDarkMode,setIsDarkMode] = useState(false);

  const toggleDarkMode = ()=>{
    setIsDarkMode((prevMode)=>!prevMode);
  };
    return (
    <Navbar style={{background:isDarkMode? "darkmagenta": "skyblue"}}
    variant={isDarkMode?"dark":"light"}>
      <Container>
        <Navbar.Brand style={{color:  isDarkMode?"hotpink" : "Black"}} href="#home">
        <img
            src={logo}
            alt="Audify Logo"
            style={{
              width: "180px",
              height: "40px",
              marginRight: "10px",
            }}
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {/* <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text> */}
          <Form><Form.Check type="switch" id="custom-switch"
          checked = {isDarkMode}
          onChange = {toggleDarkMode}
          style={{width:'4em'}}/>
          </Form>
          <Button variant="danger" style={{color: isDarkMode? 'hotpink':'black'}}>Sign Out</Button>{' '}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
};

export default MyNavbar;