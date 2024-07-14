import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  ITEM_ADDED_REQUEST,
  INIT_CART_ITEM,
  ITEM_ADDED,
  ITEM_ADDED_SUCESS
} from '../constants/cartConstants'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case INIT_CART_ITEM:
      const data = action.payload
      return{
        ...state,
        cartItems:data
      }
    case CART_ADD_ITEM:
      const item = action.payload

      const existItem = state.cartItems.find((x) => x._id === item._id)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === existItem._id ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x._id !== action.payload),
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }

    default:
      return state
  }
}

export const cartStateReducer = (state ={}, action) => {
  switch (action.type) {
    case ITEM_ADDED_REQUEST:
      return { loading: true }
    case ITEM_ADDED:
      return { loading: false }
    case ITEM_ADDED_SUCESS:
      return {loading:true}  
    default:
      return state
  }
}