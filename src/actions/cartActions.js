import axios from 'axios'
import "regenerator-runtime/runtime";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  INIT_CART_ITEM,
  ITEM_ADDED,
  ITEM_ADDED_REQUEST,
  ITEM_ADDED_SUCESS
} from '../constants/cartConstants'

export const addToCart = (id, qty , auth) => async (dispatch, getState) => {
  dispatch({
    type: ITEM_ADDED_REQUEST,
  })
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const req = {id,qty,auth}
  const res = await axios.post(`https://My-Shopee-Backend.rahulgupta99.repl.co/api/cart` ,req ,config)
  if(res.status === 201){
    dispatch({
      type:ITEM_ADDED,
    })
  }

  dispatch({
    type:ITEM_ADDED_SUCESS,
  })
 
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export const getCartItems = (userId) => async (dispatch) =>{
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const {data} = await axios.post(`https://My-Shopee-Backend.rahulgupta99.repl.co/api/cart/getCart` ,{userId} ,config)
  dispatch({
    type: INIT_CART_ITEM,
    payload: data
  })
}