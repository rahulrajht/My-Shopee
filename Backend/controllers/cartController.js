const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel.js')
const User = require('../models/userModel.js')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

const addToCart = asyncHandler(async (req, res) => {
  const{ id,auth,qty} = req.body;
  var product = await Product.findOne({_id:id});
  let item = {
    _id:product._id,
    name:product.name,
    image:product.image,
    brand:product.brand,
    category:product.category,
    description:product.description,
    reviews:product.reviews,
    rating:product.rating,
    numReviews:product.numReviews,
    price:product.price,
    countInStock:product.countInStock,
    qty:parseInt(qty)
  }
  try{
    const cart = await User.findOneAndUpdate({_id:auth},{
      $addToSet:{cart:item }
    }); 
    await cart.save((err,obj)=>{
      if(err) res.status(400).send("Error");
      res.status(201).json(item)
    }); 
  }
  catch(error){
    res.json({success: false, response: error.message});
  }
})


const getCartItems = asyncHandler(async (req,res)=>{
  const {userId} = req.body
  try{
    const product = await User.findById({_id:userId});
    res.status(200).json(product.cart)
  }catch(e){
    res.json({success: false, response: error.message});
  }

})

const changeQuantity = asyncHandler(async (req,res)=> {
  const { userId, productId, value, qty } = req.body;
  const parsedUserId = new ObjectId(userId);
  const parsedProductId = new ObjectId(productId);
  const parsedValue = parseInt(value);
  const parsedQty = parseInt(qty);
  
  if (isNaN(parsedValue) || isNaN(parsedQty)) {
    return res.status(400).json({ success: false, response: 'Invalid quantity or value' });
  }
  
  if (parsedQty === 1 && parsedValue === -1) {
    try {
      const result = await User.findOneAndUpdate(
        { _id: parsedUserId, 'cart._id': parsedProductId },
        { $pull: { cart: { _id: parsedProductId } } },
        { new: true }
      );

      if (!result) {
        return res.status(404).json({ success: false, response: 'User or product not found' });
      }

      res.status(204).send(); // No content to send back
    } catch (e) {
      res.status(500).json({ success: false, response: e.message });
    }
  } else {
    // Handle updating item quantity
    try {
      const result = await User.findOneAndUpdate(
        { _id: parsedUserId, 'cart._id': parsedProductId },
        { $inc: { 'cart.$.qty': parsedValue } },
        { new: true }
      );

      if (!result) {
        return res.status(404).json({ success: false, response: 'User or product not found' });
      }

      // Find the updated cart item
      const updatedCartItem = result.cart.find(item => item._id.equals(parsedProductId));

      if (!updatedCartItem) {
        return res.status(404).json({ success: false, response: 'Cart item not found' });
      }

      res.status(200).json(result.cart);
    } catch (e) {
      res.status(500).json({ success: false, response: e.message });
    }
  }
});

const deleteItem = asyncHandler(async (req, res) => {
  const userId = new ObjectId(req.body.userId);
  const productId = new ObjectId(req.body.productId);

  try {
    const items = await User.findOneAndUpdate(
      { _id: userId, 'cart._id': productId },
      { $pull: { cart: { _id: productId } } },
      { new: true }
    );

    if (!items) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    res.status(204).send();
  } catch (e) {
    console.error('Error deleting item from cart:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = {
  addToCart,
  getCartItems,
  changeQuantity,
  deleteItem
}
