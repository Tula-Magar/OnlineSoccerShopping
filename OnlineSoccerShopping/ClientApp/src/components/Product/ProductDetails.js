import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://localhost:7217/api/product/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [productId]);

  console.log(product);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Image src={product.imageUrlName} alt={product.name} fluid />
        </Col>
        <Col md={6}>
          <h1>{product.name}</h1>

          <p className="text-success">${product.price}</p>
          <p className="text-muted">{product.category.name}</p>
          <p>{product.description}</p>
        </Col>
      </Row>
    </Container>
  );
}
