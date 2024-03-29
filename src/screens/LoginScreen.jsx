import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login ,loginAsGuest} from '../actions/userActions'

const LoginScreen = ({  history,location }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const redirect = location.search ? location.search.split('=')[1] : '/'
   useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const submitGuestLogin = ()=>{
    setEmail("guest@gmail.com")
    setPassword("123456789")
    dispatch(loginAsGuest())
  }
  return (
    <FormContainer>
      <h1 className='mt-5'>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form  onSubmit={submitHandler} className='mt-4'>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            className='px-4 py-2 form-control'
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            className='px-4 py-2'
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button  className='mt-3 px-4' type='submit' variant='outline-primary'>
          Sign In
        </Button>
        <Button onClick={submitGuestLogin } className='mt-3 ms-3 px-4' variant='outline-primary'>
          Login as Guest 
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?
          <Link className='ms-2 link-btn' to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
