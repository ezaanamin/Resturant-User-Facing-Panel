import React, { useEffect, useState } from 'react'
import "./order.css"
import CustomersInformation from '../../component/CustomersInformation'
import { Scrollbars } from "react-custom-scrollbars-2";
import { UserContext } from '../../context/context';
import { useContext } from 'react';
import axios from "axios";
import ProductCart from '../../component/ProductCart';
function Orders() {
  const{customers}=useContext(UserContext)

  const [order,SetOrder]=useState([])

  useEffect(()=>{
 console.log(customers._id)
 const fetchData = async () => {
  const data = await  axios.post('http://localhost:5000/order/get/customers',{customer_id:customers._id})
  SetOrder(data.data)
console.log(order)
}
fetchData()
  },[])
  return (
    
    <div className='order'>

<h1 style={{textAlign:"center",color:"#7fa142",marginBottom:20}}>My Orders</h1>
<div className='order_right'>
<h3 style={{marginTop:100,color:"#7fa142",marginBottom:20,position:"relative",left:50}}>Customer's Information</h3>

 <CustomersInformation/>
</div>
<div className='cart_product'>
<Scrollbars>
{order.length!=0?
order.map((s) => (

  s.orders.map(option => 
<ProductCart order={true} title={option.name}  price={option.price} img={option.img} order_id={s.order_id}  />

  )

))
:
<h1 style={{textAlign:"center",position:"relative",top:300}}>No Order History</h1>
}


</Scrollbars>
</div>

    </div>
  )
}

export default Orders