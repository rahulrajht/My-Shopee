import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ButtonGroup,
} from "react-bootstrap";
import Message from "../components/Message";
import {
  getCartItems,
  removeFromCart,
  quantityChange,
} from "../actions/cartActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CartScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin.userInfo ? userLogin.userInfo : "";
  const userid = userInfo ? userInfo._id : "";

  useEffect(() => {
    if (userid) {
      dispatch(getCartItems(userid));
    }
  }, []);

  const removeFromCartHandler = (userId, productId) => {
    dispatch(removeFromCart(userId, productId));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <Link to="/" className="btn btn-light mb-3">
          Go Back
        </Link>
        {cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>₹{item.price}</Col>
                  <Col md={2}>
                    <ButtonGroup>
                      <Button
                        className="mx-2"
                        onClick={() =>
                          dispatch(
                            quantityChange(userid, item._id, -1, item.qty)
                          )
                        }
                      >
                        {" "}
                        -
                      </Button>
                      {item.qty}
                      <Button
                        className="mx-2"
                        onClick={() =>
                          dispatch(
                            quantityChange(userid, item._id, 1, item.qty)
                          )
                        }
                      >
                        {" "}
                        +{" "}
                      </Button>
                      <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(userid, item._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </Col>
                    </ButtonGroup>
                  </Col>
                  
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              ₹
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                variant="outline-primary"
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
