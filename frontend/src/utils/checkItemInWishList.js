export const checkItemInWishList = (array, id) => {
   return array.find((item) => item._id === id);
};