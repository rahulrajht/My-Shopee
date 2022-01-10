import React from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
        <Col className='text-center py-3 text-light'>Copyright &copy; My Shopee</Col>
        </Container>
      </Navbar>
    </footer>
  );
};

export default Footer;
