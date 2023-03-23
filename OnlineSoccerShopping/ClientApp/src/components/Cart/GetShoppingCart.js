import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";

export default function GetShoppingCart({ user, setCartItemCount }) {
  const [cartItems, setCartItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

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

  const handleDeleteConfirmation = (id) => {
    setShowDeleteModal(true);
    setDeleteItemId(id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://localhost:7217/api/shoppingcart/${deleteItemId}`
      );
      setCartItems(cartItems.filter((item) => item.id !== deleteItemId));
      if (setCartItemCount) {
        setCartItemCount((prevCount) => prevCount - 1);
      }
      setShowDeleteModal(false);
      setDeleteItemId(null);
    } catch (err) {
      console.error(err);
    }
  };

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
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteConfirmation(item.id)}
                  >
                    Delete
                  </Button>
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
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this item from your cart?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
