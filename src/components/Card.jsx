import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';



const BookCard = () => {
  
    return (
        <Row xs={1} md={2} className="g-4 mt-3 mb-3">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Col key={idx}>
              <Card>
              <Card.Img variant="bottom" src="https://images.mubicdn.net/images/film/164456/cache-663434-1617639647/image-w1280.jpg?size=800x" />
                <Card.Body>
                  <Card.Title>Created on:</Card.Title>
                  <Card.Title>Last modified:</Card.Title>
                  <Card.Title>Duration:</Card.Title>
                  <Card.Title>Comments:</Card.Title>
                  <Button variant="info">View</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      );
}

export default BookCard;