import React from "react";
import { Col, Container, Form, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { filterProducts } from "../actions/productActions";

function Filter() {
  const dispatch = useDispatch();
  return (
    <Container className="my-3 w-50 d-flex">
      <h5 className="mx-2">Sort By</h5>
      <Form className="mt-1 ms-2">
        <Form.Group>
          <Col>
            <Form.Check
              className="mx-2 d-inline-block align-center"
              type="radio"
              name="sort"
              color="green"
              onChange={() => dispatch(filterProducts(1))}
            ></Form.Check>
            <Form.Label className="mx-2"> High to Low </Form.Label>

            <Form.Check
              className="mx-2 d-inline-block align-center"
              type="radio"
              name="sort"
              onChange={() => dispatch(filterProducts(2))}
            ></Form.Check>
            <Form.Label className="mx-2"> Low to High </Form.Label>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Filter;
