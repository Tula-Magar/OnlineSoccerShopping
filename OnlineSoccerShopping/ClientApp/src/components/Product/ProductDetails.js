import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Image, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetails({ userEmail, isLoggedIn }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("sm");
  const navigate = useNavigate();

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

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleOrderClick = () => {
    if (!isLoggedIn || !userEmail) {
      navigate(`/login?productId=${productId}`);
      return;
    }

    if (isLoggedIn && !userEmail) {
      axios
        .post("https://localhost:7217/api/order", {
          userId: userEmail, // replace with actual user ID
          orderItems: [
            {
              productId: product.productId,
              quantity: quantity,
              price: product.price,
              size: size,
            },
          ],
        })
        .then((res) => {
          //console.log(res.data);
          navigate(`/order/${res.data.orderId}`); // navigate to order details page after order is placed successfully but not implemented yet
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Image src={product.imageUrlName} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <h1>{product.name}</h1>

          <p className="text-success">Price: ${product.price}</p>
          <p className="text-muted">{product.category.name}</p>
          <p>{product.description}</p>
        </Col>
        <Col md={4}>
          <Form.Label>Quantity:</Form.Label>
          <Col md={2}>
            <Form.Select
              onChange={handleQuantityChange}
              defaultValue={quantity}
            >
              <option defaultValue="1">1</option>
              <option defaultValue="2">2</option>
              <option defaultValue="3">3</option>
              <option defaultValue="4">4</option>
              <option defaultValue="5">5</option>
            </Form.Select>

            <Form.Label>Size:</Form.Label>
            <Form.Select onChange={handleSizeChange} defaultValue={size}>
              <option defaultValue="sm">sm</option>
              <option defaultValue="md">md</option>
              <option defaultValue="lg">lg</option>
              <option defaultValue="xl">xl</option>
              <option defaultValue="xxl">xxl</option>
            </Form.Select>
          </Col>

          <Button variant="primary" className="mt-3 mb-3">
            {/* add to cart button but not implemented yet */}
            Add to Cart
          </Button>
          <br />

          <Button variant="primary" onClick={handleOrderClick}>
            Place Order
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
