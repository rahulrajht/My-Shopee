import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import Rating from "./Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, removeFromWishList } from "../actions/wishListAction";
import { toast } from "react-toastify";
import { checkItemInWishList } from "../utils/checkItemInWishList";
const Product = ({ product }) => {
  toast.configure();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin.userInfo ? userLogin.userInfo : "";
  const userid = userInfo ? userInfo._id : "";
  const wishlist = JSON.parse(localStorage.getItem("wishlist"))



  function action(id,userid){
    if(color==="red"){
      dispatch(removeFromWishList(userid,id))
    }else{
      dispatch(addToWishList(product._id, userid))
    }
  }
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
        <div
          onClick={() => action(product._id, userid)}
          className="d-flex justify-content-end m-2 wishicon"
        >
          <FontAwesomeIcon
            cursor={"pointer"}
            size="lg"
            icon={faHeart}
            color={color}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
