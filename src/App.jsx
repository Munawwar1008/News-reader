// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import axios from 'axios';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [news, setNews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [viewDetail, setViewDetail] = useState(null);
  const [gridView, setGridView] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines?country=in&apiKey=9ba3d5dfcbaf4765938e0e7b03337e4b'
        );
        const articles = response.data.articles.map((article, index) => ({
          id: index + 1,
          title: article.title,
          description: article.description,
          image: article.urlToImage,
          link: article.url,
        }));
        setNews(articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const toggleFavorite = (articleId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(articleId)) {
        return prevFavorites.filter((id) => id !== articleId);
      } else {
        return [...prevFavorites, articleId];
      }
    });
  };

  const viewArticleDetail = (articleId) => {

    const article = news.find((item) => item.id === articleId);
    setViewDetail(article);
  };

  const goBack = () => {
    setViewDetail(null);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Row>
        <Col className="text-center">
          <h1>{user ? `Welcome, ${user.displayName}!` : 'Viral Talkz!'}</h1>
        </Col>
      </Row>
      {viewDetail ? (
        <Row>
          <Col>
            <Button variant="secondary" onClick={goBack}>
              Go Back
            </Button>
            <Card style={{ width: '30rem', margin: '20px auto' }}>
              <Card.Img variant="top" src={viewDetail.image} />
              <Card.Body>
                <Card.Title>{viewDetail.title}</Card.Title>
                <Card.Text>{viewDetail.description}</Card.Text>
                <a href={viewDetail.link} target="_blank" rel="noopener noreferrer">
                  Read Full Article
                </a>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col className="text-center">
            <Button variant="info" onClick={() => setGridView(!gridView)}>
              Toggle Grid View
            </Button>
          </Col>
          <Col>
            <div className={gridView ? "d-flex flex-wrap justify-content-around" : ""}>
              {news.map((article) => (
                <Card key={article.id} style={{ width: '150rem', margin: '10px' }}>
                  <Card.Img variant="top" src={article.image} />
                  <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>{article.description}</Card.Text>
                    <Button variant="primary" onClick={() => viewArticleDetail(article.id)}>
                      Read More
                    </Button>
                    <Button
                      variant={favorites.includes(article.id) ? "success" : "danger"}
                      onClick={() => toggleFavorite(article.id)}
                    >
                      {favorites.includes(article.id) ? "Favorited ❤️" : "Favorite ❤️"}
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default App;