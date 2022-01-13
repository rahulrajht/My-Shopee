import React from "react";
import { Col, Container, Form, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { filterProducts } from "../actions/productActions";

function Filter() {
  const dispatch = useDispatch();
  return (
    <Container className="my-3 w-50 text-white">
      <Navbar expand="lg" variant="dark" bg="dark">
        <h5 className="mx-2">Sort By</h5>
        <Form className="mt-1 ms-2">
          <Form.Group>
            <Col>
            <Form.Label className="mx-2"> High to Low 
                
                 <Form.Check
                  className="mx-2 d-inline-block align-center"
                  type="radio"
                  name="sort"
                  color="green"
                  onChange={() => dispatch(filterProducts(1))}
                ></Form.Check>
              </Form.Label>
              <Form.Label className="mx-2"> High to Low </Form.Label>
                <Form.Check
                  className="mx-2 d-inline-block align-center"
                  type="radio"
                  name="sort"
                  onChange={() => dispatch(filterProducts(2))}
                ></Form.Check>
              
            </Col>
          </Form.Group>
        </Form>
      </Navbar>
    </Container>
  );
}

export default Filter;
