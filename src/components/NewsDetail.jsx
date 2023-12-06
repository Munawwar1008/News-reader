
import React from 'react';
import { Card } from 'react-bootstrap';

const NewsDetail = ({ article }) => {
  return (
    <Card style={{ width: '30rem', margin: '20px auto' }}>
      <Card.Img variant="top" src={article.image} />
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>{article.description}</Card.Text>
        <a href={article.link} target="_blank" rel="noopener noreferrer">
          Read Full Article
        </a>
      </Card.Body>
    </Card>
  );
};

export default NewsDetail;
