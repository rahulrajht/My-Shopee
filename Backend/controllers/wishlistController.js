const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel.js')
const User = require('../models/userModel.js')
var ObjectID = require('mongodb').ObjectID;



const addToWishList = asyncHandler(async (req, res) => {
  const{ id,auth} = req.body;
  var product = await Product.findOne({_id:id});
  try{
    const wishlist = await User.findOneAndUpdate({_id:auth},{
      $addToSet:{wishlists:product }
    }); 
    await wishlist.save((err,obj)=>{
      if(err) res.status(400).send("Error");
      res.status(201).json(product)
    }); 
  }
  catch(error){
    res.json({success: false, response: error.message});
  }
})


const getWishListItems = asyncHandler(async (req,res)=>{
  const {userId} = req.body 
  try{
    const product = await User.findById({_id:userId});
    res.status(200).json(product.wishlists)
  }catch(e){
    res.json({success: false, response: error.message});
  }

})



const deleteWishListItem = asyncHandler(async (req,res) =>{
  const userId = ObjectID(req.body.userId);
  const productId = ObjectID(req.body.productId)
  try{
      const items = await User.findOneAndUpdate(
        {_id:userId,'wishlists._id':productId},
        { $pull:{wishlists:{_id:productId}}}
      )
      res.status(204)
    }catch(e){
        res.json({success: false, response: e.message});
    } 
})

module.exports = {
  addToWishList,
  getWishListItems,
  deleteWishListItem,
}
