import React, { useState, useEffect, useMemo, useLayoutEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function GetProduct({ isAdmin }) {
  const [filter, setFilter] = useState("");
  const [product, setProduct] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    axios
      .get("https://localhost:7217/api/product")
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const filteredProducts = product.filter((product) =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDelete = (productId) => {
    axios
      .delete(`https://localhost:7217/api/product/${productId}`)
      .then(() => {
        setProduct(product.filter((p) => p.productId !== productId));
        setShowDeleteModal(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const memoizedProductList = useMemo(() => {
    return (
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {Array.isArray(filteredProducts) &&
          filteredProducts.map((product) => (
            <Col key={product.productId}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={product.imageUrl || "/placeholder-image.jpg"}
                  alt={product.imageUrlName}
                />

                <Card.Body className="d-flex flex-column">
                  <div className="mb-2">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                  </div>

                  <div className="mt-auto">
                    <Card.Text className="text-success">
                      ${product.price}
                    </Card.Text>
                    <Card.Text>
                      {product.category.categoryId && product.category.name ? (
                        product.category.name
                      ) : (
                        <em>No category</em>
                      )}
                    </Card.Text>

                    <div className="d-flex justify-content-between mt-2">
                      <Link
                        className="btn btn-primary"
                        to={`/products/${product.productId}`}
                        onClick={() =>
                          console.log(`/products/${product.productId}`)
                        }
                      >
                        Details
                      </Link>

                      {isAdmin && (
                        <>
                          <Link
                            className="btn btn-warning"
                            to={`/products/${product.productId}/edit`}
                            onClick={() =>
                              console.log(`/products/${product.productId}/edit`)
                            }
                          >
                            Edit
                          </Link>

                          <Button
                            variant="danger"
                            onClick={() => {
                              setSelectedProductId(product.productId);
                              setShowDeleteModal(true);
                            }}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    );
  }, [filteredProducts]);

  return (
    <>
      <Container className="text-dark">
        <h1 className="mb-4 text-primary">Product Details</h1>
        <input
          type="text"
          placeholder="Search products by name"
          className="form-control mb-3"
          value={filter}
          onChange={handleChange}
        />
        {memoizedProductList}
      </Container>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDelete(selectedProductId);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
