import React, { useEffect, useState } from 'react'
import "./customers.css"
import { useSelector,useDispatch } from 'react-redux'
import { UserContext } from '../context/context';
import { useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { fetchCustomers } from '../redux/Post';
function CustomersInformation() {

  const nav=useNavigate("")
  const [customer,SetCustomers] =useState([])
  const{SetLog}=useContext(UserContext)

  const cookies = new Cookies();
  const dispatch=useDispatch();
  useEffect(() => {
    const token = cookies.get('token');
    if (!token) {
      nav("/menu");
      SetLog(true);
      return; // Exit early if token is not available
    }
  
    const getCustomers = async () => {
      try {
        console.log(token, '');
        const response = await  dispatch(fetchCustomers(token));
  
        console.log(response.payload,'tony')
        SetCustomers(response.payload);
      } catch (error) {
        console.error(error); // handle any error that occurred
      }
    };
  
    getCustomers();
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