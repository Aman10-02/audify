import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const MyNavbar = () => {
    return (
    <Navbar style={{background: 'darkmagenta'}}>
      <Container>
        <Navbar.Brand style={{color: 'hotpink'}} href="#home"><h1>Audify</h1></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {/* <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text> */}
          <Form><Form.Check type="switch" id="custom-switch" style={{width:'4em'}}/></Form>
          <Button variant="danger" style={{color: 'hotpink'}}>Sign Out</Button>{' '}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
};

export default MyNavbar;