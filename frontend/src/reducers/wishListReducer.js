import {
    WISHLIST_ADD_ITEM,
    WISHLIST_REMOVE_ITEM,
    ITEM_ADDED_REQUEST,
    INIT_WISHLIST_ITEM,
    ITEM_ADDED,
    ITEM_ADDED_SUCESS
  } from '../constants/wishListConstants'
  
  export const wishListReducer = ( state = { wishListItems: []},  action  ) => {
    switch (action.type) {
      case INIT_WISHLIST_ITEM:
        const data = action.payload
        return{
          ...state,
          wishListItems:data
        }
      case WISHLIST_ADD_ITEM:
        const item = action.payload
  
        const existItem = state.wishListItems.find((x) => x._id === item._id)
  
        if (existItem) {
          return {
            ...state,
            wishListItems: state.wishListItems.map((x) =>
              x._id === existItem._id ? item : x
            ),
          }
        } else {
          return {
            ...state,
            wishListItems: [...state.wishListItems, item],
          }
        }
      case WISHLIST_REMOVE_ITEM:
        return {
          ...state,
          wishListItems: state.wishListItems.filter((x) => x._id !== action.payload),
        }
  
      default:
        return state
    }
  }
  
  export const wishListStateReducer = (state ={}, action) => {
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