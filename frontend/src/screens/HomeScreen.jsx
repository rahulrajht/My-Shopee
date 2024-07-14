import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import {  getWishListItems } from '../actions/wishListAction'
import Filter from '../components/Filter'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  const {userInfo} = useSelector((state) => state.userLogin)
  
  

  useEffect(() => {
    
    dispatch(listProducts(keyword))   
    if(userInfo){
      dispatch(getWishListItems(userInfo._id))
    }
  }, [dispatch, keyword])

 
  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
     
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
        {
          !products.length ? (
          <h5 className='mt-3'><Message variant='info'>{"No product found"}</Message></h5>
          ) : (<>     
        <Filter/>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}/>
              </Col>
            ))}
          </Row>
          </>
          )
          }
        </>
      )}
    </>
  )
}

export default HomeScreen
