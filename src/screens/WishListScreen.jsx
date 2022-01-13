import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import { getWishListItems } from '../actions/wishListAction'
import Product from '../components/Product'

const WishListScreen = ({ match, location, history }) => {

  const dispatch = useDispatch()

  const {wishListItems} = useSelector((state) => state.wishList)
  console.log(wishListItems)
  const userLogin = useSelector((state) => state.userLogin)
  const userInfo  = userLogin.userInfo ? userLogin.userInfo : ""
  const userid = userInfo ? userInfo._id : ""

  useEffect(() => {
      dispatch(getWishListItems(userid))    
  }, [])



  return (
    <>
    <Link to='/' className='btn btn-light mb-3'>
          Go Back
    </Link>
        <>
        {
          wishListItems.length === 0 ? (
            <Message >
            Your wishlist is empty <Link to='/'>Go Back</Link>
          </Message>
          ):
        (
          <Row>
            {wishListItems.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}/>
              </Col>
            ))}
          </Row>
        )}
        </>

    </>
  )
}

export default WishListScreen
