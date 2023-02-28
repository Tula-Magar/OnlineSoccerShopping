import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function GetProduct() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7217/api/product")
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Container className="text-dark">
        <h1 className="mb-4 text-primary">Product Details</h1>
        <Row>
          {Array.isArray(product) &&
            product.map((product) => (
              <Col md={6} lg={4} xl={3} key={product.productId}>
                <Card className="mb-4">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={product.imageUrl || "/placeholder-image.jpg"}
                      alt={product.imageUrlName}
                    />

                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                      <Card.Text className="text-success">
                        ${product.price}
                      </Card.Text>
                      <Card.Text>
                        {product.category.categoryId &&
                        product.category.name ? (
                          product.category.name
                        ) : (
                          <em>No category</em>
                        )}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}
