import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card} from "react-bootstrap";
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
  const {wishListItems} = useSelector((state) => state.wishList)
  const isInWishList = checkItemInWishList(wishListItems,product._id) ? "red" :"limegreen"
  const [color, setcolor] = useState(isInWishList)

  function action(id,userid){
    if (userid === null || userid === "" || userid === undefined){
      toast.warning("You're not logged in please Login!")
      return
    }
    if(color==="red"){
      dispatch(removeFromWishList(userid,id))
      setcolor("limegreen")
      toast.success("Item removed sucessfully!")
    }else{
      dispatch(addToWishList(product._id, userid))
      setcolor("red")
      toast.success("Item added sucessfully!")
    }
  }
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img className="img" src={product.image} variant="top" />
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
