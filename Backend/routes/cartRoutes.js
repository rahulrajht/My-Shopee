const express = require('express')

const router = express.Router()
const { addToCart , getCartItems ,changeQuantity ,deleteItem} = require('../controllers/cartController.js')
const { protect, admin } = require('../middleware/authMiddleware.js')

router.route('/').post(addToCart)
router.route('/getCart').post(getCartItems)
router.route('/qtyChange').put(changeQuantity)
router.route('/delete').post(deleteItem)
module.exports = router
