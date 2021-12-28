import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline className='d-flex form ms-lg-5 mw-75 mt-2'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5 flex'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2 ms-1'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
