import React from "react";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faShoppingCart,
  faUser,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
const Rating = ({ value, text, color }) => {
  return (
    <>
      <ReactStars
        count={value}
        edit={false}
        size={26}
        isHalf={true}
        color={color}
        activeColor={color}
      />

      <div className="rating">
        <span>{text && text}</span>
      </div>
    </>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Rating;
