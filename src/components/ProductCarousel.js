import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel interval={2000} pause='hover' className='bg-primary crs'>
      {products.map((product) => (
        <Carousel.Item  key={product._id} >
          <Link to={`/product/${product._id}`}>
            <Image className='crs-img' src={product.image} fluid alt={product.name} roundedCircle />
          </Link>          
          <h4 className='text-center'> {product.name} (${product.price})</h4>           
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
