import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import "./footer.css"
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer className="bg-body-tertiary text-light">
      <Container>
        <div className="mb-3 text-center">
          <Button variant="link" className="text-light">
            <FaFacebook size={24} />
          </Button>
          <Button variant="link" className="text-light">
            <FaTwitter size={24} />
          </Button>
          <Button variant="link" className="text-light">
            <FaInstagram size={24} />
          </Button>
        </div>
        <hr className="bg-light" />
        <Row>
          <Col>
            <p className="text-center">
              &copy; {new Date().getFullYear()} E commerce. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
