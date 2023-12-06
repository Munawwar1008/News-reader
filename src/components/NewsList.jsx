// src/components/NewsList.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const NewsList = ({ news, onToggleFavorite, onViewDetail }) => {
  return (
    <div className="d-flex flex-wrap justify-content-around">
      {news.map((article) => (
        <Card key={article.id} style={{ width: '18rem', margin: '10px' }}>
          <Card.Img variant="top" src={article.image} />
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>{article.description}</Card.Text>
            <Button variant="primary" onClick={() => onViewDetail(article.id)}>
              Read More
            </Button>
            <Button
              variant="danger"
              onClick={() => onToggleFavorite(article.id)}
            >
              ❤️
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default NewsList;
