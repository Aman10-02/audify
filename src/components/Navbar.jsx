import {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"
import { signOut } from "firebase/auth";


const MyNavbar = () => {
 

  const navigate = useNavigate();
  const user = auth.currentUser;

 

  const handleSignout = () => {
    signOut(auth).then(() => {
      navigate('/');
    });
  };

  return (
    <Navbar
      className='navbar-container'
      style={{ background: 'darkmagenta' }}
    
    >
      <Container>
        <Navbar.Brand style={{ color: 'hotpink' }} onClick={() => navigate('/')}>
          <h1>Audify</h1>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Form>
            <Form.Check type="switch" id="custom-switch" style={{ width: '4em' }} />
          </Form>
          {!user ? (
            <>
              <Button variant="primary" style={{ color: 'hotpink' }} onClick={() => navigate('/signup')}>
                Sign In
              </Button>{' '}
            </>
          ) : (
            <>
              <Button variant="danger" style={{ color: 'hotpink'  }} onClick={handleSignout}>
                Sign Out
              </Button>{' '}
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
