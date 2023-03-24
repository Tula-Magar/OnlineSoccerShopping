import { Container, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-light text-center mt-5 py-5 pt-3">
      <Container>
        <Row className="py-5">
          <Col md={4} lg={3}>
            <h5>Footer Heading</h5>
            <p>
              Some text here to give a brief introduction about the website.
            </p>
          </Col>
          <Col md={4} lg={3}>
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="text-decoration-none" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none" to="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4} lg={3}>
            <h5>Connect With Me</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="text-decoration-none" to="/">
                  Twitter
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none" to="/">
                  Github
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none" to="/">
                  Linkedin
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4} lg={3}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>email@example.com</li>
              <li>+1 234 567 890</li>
            </ul>
          </Col>
        </Row>
        <Row className="pb-3">
          <Col>
            <p className="text-center">
              © 2023 MyWebsite. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
