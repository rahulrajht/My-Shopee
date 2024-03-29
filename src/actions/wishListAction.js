import axios from 'axios'
import "regenerator-runtime/runtime";
import {
  WISHLIST_ADD_ITEM,
  WISHLIST_REMOVE_ITEM,
  INIT_WISHLIST_ITEM,
  ITEM_ADDED,
  ITEM_ADDED_REQUEST,
  ITEM_ADDED_SUCESS
} from '../constants/wishListConstants'
const BACKEND_URL = 'https://My-Shopee-Backend.rahulgupta99.repl.co';
export const addToWishList = (id, auth) => async (dispatch, getState) => {
  dispatch({
    type: ITEM_ADDED_REQUEST,
  })
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const req = {id,auth}
  const res = await axios.post(`${BACKEND_URL}/api/wishlist` ,req ,config)
 
  if(res.status === 201){
    dispatch({
      type:ITEM_ADDED,
    })
    dispatch({
      type:INIT_WISHLIST_ITEM,
      payload:res.data
    })
  }

  dispatch({
    type:ITEM_ADDED_SUCESS,
  })
 
}

export const removeFromWishList = (userId,productId) => async(dispatch, getState) => {
  dispatch({
    type: WISHLIST_REMOVE_ITEM,
    payload: productId,
  })
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const res = await axios.post(`${BACKEND_URL}/api/wishlist/delete` ,{userId,productId} ,config)
}


export const getWishListItems = (userId) => async (dispatch) =>{
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const {data} = await axios.post(`${BACKEND_URL}/api/wishlist/getWishlist` ,{userId} ,config)
  dispatch({
    type: INIT_WISHLIST_ITEM,
    payload: data
  })
}
