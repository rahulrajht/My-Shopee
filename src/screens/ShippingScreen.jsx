import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { getCartItems, saveShippingAddress } from '../actions/cartActions'
import { useEffect } from 'react'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin.userInfo ? userLogin.userInfo : "";
  const userid = userInfo ? userInfo._id : "";
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)
  const [isDummyAdress , setDummyAdress] = useState(false)
  const dispatch = useDispatch()

  
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }
  const addressHandler = ()=>{
    setAddress("H.N 257, Pattandur Agrahara, Whitefield, Karnataka")
    setCity("Bangalore")
    setPostalCode("560066")
    setCountry("India")
    setDummyAdress(true)
  }
  useEffect(()=>{
    if(isDummyAdress){
      dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
    }
  },[isDummyAdress])
  useEffect(()=>{
    if (userid) {
      dispatch(getCartItems(userid));
    }
  },[])
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className='mt-2' type='submit' variant='outline-primary'>
          Continue
        </Button>
        <Button className='mt-2 ms-2' onClick={addressHandler} variant='outline-primary'>
          Proceed with dummy address
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
