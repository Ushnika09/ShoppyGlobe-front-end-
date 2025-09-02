import React from 'react'
import Cartitem from './Cartitem'
import back from"../assets/back.png"
import { Link } from 'react-router-dom'

function ActiveCart({cartItems}) {
  return (
    <div className=' pt-[4rem]'>
        <Link to="/" className=' flex gap-[1rem] text-xl justify-start items-center hover:cursor-pointer px-[10rem]'>
            <img src={back} alt="" className='h-6'/>
            <span className='text-[#00BFFF]'>
            Continue Shopping

            </span>
        </Link>


        <Cartitem cartItems={cartItems}/>
    </div>
  )
}

export default ActiveCart