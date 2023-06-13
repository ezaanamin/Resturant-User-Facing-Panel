import React, { useEffect } from 'react'
import "./customers.css"
import { useSelector,useDispatch } from 'react-redux'
import { UserContext } from '../context/context';
import { useContext } from 'react'

function CustomersInformation() {


    const{customers,SetCustomers,log,SetLog,modal,SetModal,nav_cart,SetNavCart,cart_state,SetCartState}=useContext(UserContext)
  return (
    <div className='customer'>
<p>Name:{customers.name}</p>
<p>Address:{customers.address}</p>
<p>Email: {customers.email}</p>
<p>Phone: +{customers.phone}</p>



    </div>
  )
}

export default CustomersInformation