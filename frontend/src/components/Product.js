import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card} from "react-bootstrap";
import Rating from "./Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart , faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, removeFromWishList } from "../actions/wishListAction";
import { toast } from "react-toastify";
import { checkItemInWishList } from "../utils/checkItemInWishList";
import { checkItemInCart } from "../utils/checkItemInCart";
import { addToCart } from "../actions/cartActions";
const Product = ({ product }) => {
  toast.configure();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin.userInfo ? userLogin.userInfo : "";
  const userid = userInfo ? userInfo._id : "";
  const {wishListItems} = useSelector((state) => state.wishList)
  const [color, setColor] = useState("")
  const [isSpin , setSpin] = useState(false)
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  function action(id,userid){
    if (userid === null || userid === "" || userid === undefined){
      toast.warning("You're not logged in please Login!")
      return
    }
    if(color==="red"){
      dispatch(removeFromWishList(userid,id))
      setColor("limegreen")
      toast.success("Item removed sucessfully!")
    }else{
      dispatch(addToWishList(product._id, userid))
      setColor("red")
      toast.success("Item added sucessfully!")
    }
  }
  const addToCartHandler = () => {
    if(userInfo === null || userInfo === ""){
      toast.warning("You're not logged in please Login!")
      return
    }
    if(!checkItemInCart(cartItems,product._id)){
      dispatch(addToCart(product._id, 1 , userid))
      toast.success("Item added to cart successfully!")
    }else{
      toast.warning("Item already present in your cart!")
    }
    setSpin(true)
    setTimeout(()=>{
      setSpin(false)
    },2000)
  }

  useEffect(()=>{
    const isInWishList = checkItemInWishList(wishListItems,product._id) ? "red" :"limegreen"
    setColor(isInWishList)
  },[wishListItems])

  
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
        <div style={{display:"flex",justifyContent:"space-between" , alignItems:"center"}}>
        <Card.Text as="h5">₹{product.price}</Card.Text>
        <Button onClick={addToCartHandler}  className="primary" disabled={isSpin}>
        <FontAwesomeIcon   cursor={"pointer"} size="lg" color="white" icon={faShoppingCart} spin={isSpin} />
        </Button>
        </div>
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
