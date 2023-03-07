import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, FormCheck, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    dataProtection: false, // new field for data protection agreement
  });

  const navigate = useNavigate();

  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form inputs
    const errors = {};
    if (!user.name) {
      errors.name = "Name is required";
    }
    if (!user.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "Email is invalid";
    }
    if (!user.password) {
      errors.password = "Password is required";
    } else if (user.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!user.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (user.confirmPassword !== user.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!user.address) {
      errors.address = "Address is required";
    }
    if (!user.city) {
      errors.city = "City is required";
    }
    if (!user.state) {
      errors.state = "State is required";
    }
    if (!user.zipCode) {
      errors.zipCode = "Zip code is required";
    }
    if (!user.country) {
      errors.country = "Country is required";
    }
    if (!user.phone) {
      errors.phone = "Phone number is required";
    }
    if (!user.dataProtection) {
      // check if data protection agreement is checked
      errors.dataProtection =
        "You must agree to data protection laws and regulations";
    }
    setValidationErrors(errors);
    console.log(errors);
    console.log(user);

    // If there are no validation errors, submit the form
    if (Object.keys(errors).length === 0) {
      try {
        // Send the user object to the server
        const response = await axios.post(
          "https://localhost:7217/api/userAccount",
          user
        );

        // Redirect to the login page on success
        if (response.status === 200) {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <h1 className="text-center py-3">Register</h1>
      <Row className="justify-content-center">
        <Col sm={12} md={6} lg={5} className="shadowed">
          <p className="text-center">
            <strong>Already have an account?</strong>
            <Link to="/login" className="text-decoration-none">
              {" "}
              Login
            </Link>
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                isInvalid={validationErrors.name}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                isInvalid={validationErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                isInvalid={validationErrors.password}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleInputChange}
                isInvalid={validationErrors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={user.address}
                onChange={handleInputChange}
                isInvalid={validationErrors.address}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={user.city}
                onChange={handleInputChange}
                isInvalid={validationErrors.city}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.city}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={user.state}
                onChange={handleInputChange}
                isInvalid={validationErrors.state}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.state}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formZipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                name="zipCode"
                value={user.zipCode}
                onChange={handleInputChange}
                isInvalid={validationErrors.zipCode}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.zipCode}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={user.country}
                onChange={handleInputChange}
                isInvalid={validationErrors.country}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.country}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                isInvalid={validationErrors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <FormCheck
              type="checkbox"
              name="dataProtection"
              label="Data Protection"
              checked={user.dataProtection}
              onChange={handleInputChange}
            />

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
