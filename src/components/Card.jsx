import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ReactAudioPlayer from "react-audio-player";
import { doc, getDoc, collection, getFirestore } from "firebase/firestore"
import { auth, app } from '../firebase';



import moment from 'moment'




const BookCard = () => {
  const [auds, setAuds] = useState({});
  const user = auth.currentUser.uid;
  const db = getFirestore(app);
  useEffect( () => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
      const docref = await doc(db, "Files", user );
      const dataref = await getDoc(docref);
      if(dataref.exists()){
        setAuds(dataref.data())
      }
      // console.log(dataref.data())
  };
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
                  <ReactAudioPlayer src={auds[aud].url} controls />
                  <Card.Title>Created on: {moment(auds[aud].createdOn).fromNow()}</Card.Title>
                  <Card.Title>Last modified: {moment(auds[aud].updatedOn).fromNow()} </Card.Title>
                  <Card.Title>Duration: {auds[aud].duration ? auds[aud].duration : ""} </Card.Title>
                  <Card.Title>Comments:</Card.Title>
                  <Button variant="info">View</Button>
                </Card.Body>
              </Card>
            </Col>
          )}
          )}
        </Row>
      );
}

export default BookCard;