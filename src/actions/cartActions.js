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
const BACKEND_URL = 'https://My-Shopee-Backend.rahulgupta99.repl.co';
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
  const res = await axios.post(`${BACKEND_URL}/api/cart` ,req ,config)
  if(res.status === 201){
    dispatch({
      type:ITEM_ADDED,
    })
  }
  dispatch({
    type:CART_ADD_ITEM,
    payload:res.data
  })
  dispatch({
    type:ITEM_ADDED_SUCESS,
  })
  
}

export const removeFromCart = (userId,productId) => async(dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  })
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  await axios.post(`${BACKEND_URL}/api/cart/delete` ,{userId,productId} ,config)
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
  const {data} = await axios.post(`${BACKEND_URL}/api/cart/getCart` ,{userId} ,config)
  dispatch({
    type: INIT_CART_ITEM,
    payload: data
  })
}

export const quantityChange = (userId , productId,value,qty) => async(dispatch) =>{
  if(qty ===1 && value === -1){
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: productId,
    })
  }
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const res = await axios.put(`${BACKEND_URL}/api/cart/qtyChange`,{userId,productId,value,qty},config)
  if(res.status === 201){
    const data = res.data;
    dispatch({
      type:INIT_CART_ITEM,
      payload:data
    })
  }
}