import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"
import { signOut } from "firebase/auth";

import logo from "./audify-low-resolution-logo-color-on-transparent-background.png";

const MyNavbar = () => {

  const navigate = useNavigate() 

  const user = auth.currentUser
 
  const handleSignout = () => {
     signOut(auth)
     .then(() => {
        navigate('/')
     })
  }
    return (
    <Navbar style={{
      backgroundImage: 'url(ogImage.jpg)',
      position: 'sticky',
      top: '0',
      left: '0',
      display: 'flex',
      width:'100%',
      zIndex: '100000',
      }}>
      <Container>
        <Navbar.Brand style={{color: 'hotpink'}} onClick={() => navigate("/")}>
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
          {
          !user ?
          <>
            <Button variant="primary" style={{color: 'white', backgroundColor:'black'}} onClick={() => {navigate('/signup')}} >Sign In</Button>{' '}
          </>
          :
          <>
            <Button variant="danger" style={{color: 'white', backgroundColor:'black'}} onClick={handleSignout} >Sign Out</Button>{' '}
          </>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
};

export default MyNavbar;