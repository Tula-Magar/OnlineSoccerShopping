import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function GetShoppingCart({ user }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7217/api/shoppingcart/${user.nameid}`
        );

        setCartItems(response.data.$values);
      } catch (err) {
        console.error(err);
      }
    };

    if (user && user.nameid) {
      fetchCartItems();
    }
  }, [user]);

  console.log(cartItems);

  return (
    <Container>
      <h2>Shopping Cart</h2>
      <Row>
        {cartItems.length >= 0 ? (
          cartItems.map((item, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={item.product.imageUrlName}
                  alt={item.product.name}
                />
                <Card.Body>
                  <Card.Title>{item.product.name}</Card.Title>
                  <Card.Text>
                    Size: {item.size} <br />
                    Quantity: {item.quantity} <br />
                    Price: ${item.product.price * item.quantity}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No items in cart</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}
