import React from "react";
import { Container, Col, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="fixed-bottom">
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
        <Col className='text-center py-3 text-light'>Copyright &copy; My Shopee</Col>
        </Container>
      </Navbar>
    </footer>
  );
};

export default Footer;
