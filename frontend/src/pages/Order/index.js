import React, { useEffect, useState } from 'react'
import "./order.css"
import CustomersInformation from '../../component/CustomersInformation'
import { Scrollbars } from "react-custom-scrollbars-2";
import { UserContext } from '../../context/context';
import { useContext } from 'react';
import axios from "axios";
import ProductCart from '../../component/ProductCart';
function Orders() {
 

  const [orders,SetOrder]=useState([])

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            'http://localhost:5000/order/get/customers',
            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          SetOrder(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(error); // handle any error that occurred
        }
      };
      fetchData();
    }
  }, []);
  
  return (
    
    <div className='order'>

<h1 style={{textAlign:"center",color:"#7fa142",marginBottom:20}}>My Orders</h1>
<div className='order_right'>
<h3 style={{marginTop:100,color:"#7fa142",marginBottom:20,position:"relative",left:50}}>Customer's Information</h3>

 <CustomersInformation/>
</div>
<div className='cart_product'>
<Scrollbars>
          {orders.length !== 0 ? (
            orders.map((order) => (
              <React.Fragment key={order.order_id}>
                {order.product.map((product) => (
                  <ProductCart
                    key={product._id}
                    order={true}
                    title={product.name}
                    price={product.price}
                    img={product.img}
                    order_id={order.order_id}
                  />
                ))}
              </React.Fragment>
            ))
          ) : (
            <h1 style={{ textAlign: 'center', position: 'relative', top: 300 }}>No Order History</h1>
          )}
        </Scrollbars>
</div>

    </div>
  )
}

export default Orders