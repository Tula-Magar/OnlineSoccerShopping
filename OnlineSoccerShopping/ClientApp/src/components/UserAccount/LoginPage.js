import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useParams, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

function LoginPage({ handleUserUpdate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);

  const location = useLocation();
  const productId = new URLSearchParams(location.search).get("productId");
  const { productIds } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7217/api/userAccount/Login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        setCookie("token", token, {
          expires: new Date(Date.now() + 86400 * 1000),
        });

        handleUserUpdate();

        if (productId) {
          navigate(`/products/${productId}`);
        } else {
          navigate("/");
        }
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while logging in.");
    }
  };

  return (
    <Container className=" ">
      <h1 className="text-center pt-3 mt-5">Login</h1>
      <Row className="loginPage ">
        <Col sm={12} md={6} lg={5} className="p-5 shadowed">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Password:</Form.Label>

              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button className="mt-3" type="submit">
              Login
            </Button>
          </Form>
          {errorMessage && <p>{errorMessage}</p>}

          <p className="mt-3">
            <strong>Don't have an account?</strong>
            <Link to="/register" className="text-decoration-none">
              {" "}
              Register
            </Link>
          </p>

          <p className="mt-3">
            <strong>Forgot your password?</strong>
            <Link to="/forgot-password" className="text-decoration-none">
              {" "}
              Reset Password
            </Link>
          </p>
          <div>
            ForgotPassword isn't implemented yet because I am thinking to use
            either phone or email verification code
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
