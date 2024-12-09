import Loading from "../Loading.gif"
import React from 'react'

function Spinner() {
  return (
    <div>
      <div className='text-center '>
        <img className='my-3' style={{ height: "60px" }} src={Loading} alt="Loading" />
      </div>
    </div>
  )
}

export default Spinner
