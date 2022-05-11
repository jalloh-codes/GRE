import React from 'react'
import { Spinner } from 'react-bootstrap';

const Loading = () => {


  return (
      <div className='loading'>
        <Spinner animation="border" role="status" size='lg'>
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
  )
}

export default Loading