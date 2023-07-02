import React, { useEffect, useState } from 'react'
import "./customers.css"
import { useSelector,useDispatch } from 'react-redux'
import { UserContext } from '../context/context';
import { useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CustomersInformation() {

  const nav=useNavigate("")
  const [customer,SetCustomers] =useState([])
  const{log,SetLog,modal,SetModal,nav_cart,SetNavCart,cart_state,SetCartState}=useContext(UserContext)


  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      const getCustomers = async () => {
        try {
          console.log(token,'')
          const response = await axios.post('http://localhost:5000/customers/get', null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          SetCustomers(response.data)
    
        } catch (error) {
          console.error(error); // handle any error that occurred
        }
      };
      getCustomers();
   
    
    }
    else
    {
 nav("/menu");
 SetLog(true);

    }
  }, []);


  return (
    <div className='customer'>
<p>Name:{customer.name}</p>
<p>Address:{customer.address}</p>
<p>Email: {customer.email}</p>
<p>Phone: +{customer.phone}</p>



    </div>
  )
}

export default CustomersInformation