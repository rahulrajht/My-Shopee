import React from "react";
import { Container, Col, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bottom">
      <Navbar expand="lg" variant="dark"  className="custom-bg-footer">
        <Container>
        <Col className='text-center py-3 text-light'>Copyright &copy; My Bucket</Col>
        </Container>
      </Navbar>
    </footer>
  );
};

export default Footer;
