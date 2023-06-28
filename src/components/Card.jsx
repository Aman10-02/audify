import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ReactAudioPlayer from "react-audio-player";
<<<<<<< HEAD
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { auth, app } from '../firebase';
import moment from 'moment'
import { Link } from 'react-router-dom';
=======
import { doc, getDoc, collection, getFirestore } from "firebase/firestore"
import { auth, app } from '../firebase';

>>>>>>> 3e8c79870f3af177065ae680ecf69409d2cbd186



const BookCard = () => {
  const [auds, setAuds] = useState({});
  const user = auth.currentUser.uid;
  const db = getFirestore(app);
  useEffect( () => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
<<<<<<< HEAD
      const docref = doc(db, "Files", user);
=======
      const docref = await doc(db, "Files", user );
>>>>>>> 3e8c79870f3af177065ae680ecf69409d2cbd186
      const dataref = await getDoc(docref);
      if(dataref.exists()){
        setAuds(dataref.data())
      }
      // console.log(dataref.data())
  };
<<<<<<< HEAD
  const sortedKeys = Object.keys(auds).sort((a, b) => {
    return new Date(auds[b].createdOn) - new Date(auds[a].createdOn);
  });
=======
>>>>>>> 3e8c79870f3af177065ae680ecf69409d2cbd186
    return (
        <Row xs={1} md={2} className="g-4 mt-3 mb-3">
          { auds && Object.keys(auds).map((aud, idx) => {
            // const file = new Audio(auds[aud].url)
            // console.log(file)

           return (
            <Col key={idx}>
              <Card>
                <Card.Header style={{textTransform: "uppercase"}} >{aud}</Card.Header>
                {/* <Card.Img variant="bottom" src="https://images.mubicdn.net/images/film/164456/cache-663434-1617639647/image-w1280.jpg?size=800x" /> */}
                <Card.Body>
<<<<<<< HEAD
                  {/* <ReactAudioPlayer src={auds[aud].url} controls /> */}
                  <Card.Title>Created on: {moment(auds[aud].createdOn).fromNow()}</Card.Title>
                  <Card.Title>Last modified: {moment(auds[aud].updatedOn).fromNow()} </Card.Title>
                  <Card.Title>Duration: {auds[aud].duration ? auds[aud].duration : ""} </Card.Title>
                  <Card.Title>Comments: {auds[aud].srtUrl ? "Available" : "Unavailable"} </Card.Title>
                  <Link to="/view" state={ {
                    fileName: aud,
                    captions: auds[aud].captions ? auds[aud].captions : "",
                    url: auds[aud].url ? auds[aud].url : ""
                  }  } >
                    <Button variant="info">View</Button>
                  </Link>
=======
                  <ReactAudioPlayer src={auds[aud].url} controls />
                  <Card.Title>Created on: {auds[aud].createdOn}</Card.Title>
                  <Card.Title>Last modified: {auds[aud].updatedOn} </Card.Title>
                  <Card.Title>Duration:</Card.Title>
                  <Card.Title>Comments:</Card.Title>
                  {/* <Button variant="info">View</Button> */}
>>>>>>> 3e8c79870f3af177065ae680ecf69409d2cbd186
                </Card.Body>
              </Card>
            </Col>
          )}
          )}
        </Row>
      );
}

export default BookCard;