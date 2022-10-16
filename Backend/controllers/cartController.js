const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel.js')
const User = require('../models/userModel.js')
var ObjectID = require('mongodb').ObjectID;

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

const changeQuantity = asyncHandler(async (req,res)=>{
  const userId = ObjectID(req.body.userId);
  const productId = ObjectID(req.body.productId)
  const value = parseInt(req.body.value)
  const qty = parseInt(req.body.qty)
  if(qty ===1 && value === -1){
     try{
      await User.findOneAndUpdate(
        {_id:userId,'cart._id':productId},
        { $pull:{cart:{_id:productId}}}
      )
      res.status(204)
    }catch(e){
        res.json({success: false, response: e.message});
    } 
  }else{
    try{
        const items = await User.findOneAndUpdate({_id:userId,'cart._id':productId},{
        $inc:{'cart.$.qty':value}},{new: true})
        res.status(201).json(items.cart)
      }
      catch(e){
        res.json({success: false, response: e.message});
      } 
  } 

})

const deleteItem = asyncHandler(async (req,res) =>{
  const userId = ObjectID(req.body.userId);
  const productId = ObjectID(req.body.productId)
  try{
      const items = await User.findOneAndUpdate(
        {_id:userId,'cart._id':productId},
        { $pull:{cart:{_id:productId}}}
      )
      res.status(204)
    }catch(e){
        res.json({success: false, response: e.message});
    } 
})

module.exports = {
  addToCart,
  getCartItems,
  changeQuantity,
  deleteItem
}
