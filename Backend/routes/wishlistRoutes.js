const express = require('express')

const router = express.Router()
const { addToWishList , getWishListItems ,deleteWishListItem} = require('../controllers/wishlistController.js')
const { protect, admin } = require('../middleware/authMiddleware.js')

router.route('/').post(addToWishList)
router.route('/getWishlist').post(getWishListItems)
router.route('/delete').post(deleteWishListItem)
module.exports = router
