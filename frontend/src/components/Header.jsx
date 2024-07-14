import React from "react";
import { Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart,  faShoppingCart,  faUser,} from "@fortawesome/free-solid-svg-icons";
import { logout } from "../actions/userActions";
import { useEffect } from "react";
import { getCartItems } from "../actions/cartActions";
import { getWishListItems } from "../actions/wishListAction";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { cartItems } = useSelector((state) => state.cart);
  const {wishListItems} = useSelector((state) => state.wishList)
  const { userInfo } = userLogin;
  const userid = userInfo ? userInfo._id : "";

  const logoutHandler = () => {
    history.push("/");
    dispatch(logout());
    window.location.reload(false);
  };

  useEffect(()=>{
    dispatch(getCartItems(userid))
    dispatch(getWishListItems(userid))    
  },[])

  return (
    <header>
      <Navbar className="custom-bg fixed-top" variant="dark" expand="lg" collapseOnSelect>
        <Container className="p-2">
          <LinkContainer style={{color:"black",display:"flex", alignItems:"center"}} to="/">
            <Navbar.Brand >
            <img
              alt=""
              src="https://bit.ly/3yKD13g"
              width="70"
              height="50"
              className="d-inline-block align-top me-3"
            />{' '}
              My Bucket</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse
            className="justify-content-between"
            id="basic-navbar-nav"
          >
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav >
              <LinkContainer to="/cart" className="ml-5 " id="ex3">
                <Nav.Link>
                  <span className="fa-stack  fa-1x has-badge " data-count={cartItems.length}>
                  <FontAwesomeIcon color="white" icon={faShoppingCart} size="2x" />
                  </span>
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/wishlist" className="ml-5" id="ex3">
                <Nav.Link>
                <span className="fa-stack  fa-1x has-badge " data-count={wishListItems.length}>
                  <FontAwesomeIcon color="white" icon={faHeart} size="2x" />
                  </span>
                </Nav.Link>
                
              </LinkContainer>
              {userInfo ? (
                <NavDropdown   title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FontAwesomeIcon icon={faUser} /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
