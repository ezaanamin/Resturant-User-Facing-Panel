import React, { useEffect } from "react";
import "./subtotal.css";
import CurrencyFormat from "react-currency-format";
import { RadioButton } from "./RadioButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { UserContext } from "../context/context";
import Payment from "./Payment";
import axios from "axios";
import Modal2 from "../component/ModalCart"
import { useNavigate } from 'react-router-dom';
import RemoveAllCart from "../redux/slice/cart"

function Subtotal() {
  const state = useSelector((state) => state);
  const dispatch=useDispatch()
  const{customers,paymentMethod,setPaymentMethod,SetModalCart,SetOrderNumber}=useContext(UserContext)
  const nav=useNavigate();

  const radioChangeHandler = (e) => {
    setPaymentMethod(e.target.value);
  };
  useEffect(()=>{


  },[state.cart.cartItems.length])
  const handleClick = async (menu,customer_id,totalAmount,paymentMethod) => {

    if(state.cart.cartItems.length==0)
    {
     SetModalCart(true)
   
    }
    else
    {
     SetModalCart(false)
   
    
 
    const response= await axios.post('http://localhost:5000/order/new/order',{menu:menu,customer_id:customer_id,totalAmount:totalAmount,paymentMethod:paymentMethod})
    .catch((error) => console.log('Error: ', error));

   
    if (response && response.data) {

      SetOrderNumber(response.data.Order_Number)
      dispatch(RemoveAllCart)
      nav("/sucess")

   
   
   
    }
  }
   };
  return (
    <div className="subtotal">
      <Modal2/>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({state.cart.cartItems.length} items): <strong>{value}</strong>
            </p>
            <small >
              <div style={{marginBottom:10,marginTop:10}}>
            <RadioButton 
          changed={radioChangeHandler}
          id="1"
          isSelected={paymentMethod === "QuickPay"}
          label="QuickPay"
          value="QuickPay"
        />
</div>
        <RadioButton
          changed={radioChangeHandler}
          id="2"
          isSelected={paymentMethod === "COD"}
          label="Cash On Delivery"
          value="COD"
        />
            </small>
          </>
        )}
        decimalScale={2}
        value={state.cart.totalAmount} 
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
{paymentMethod !== "QuickPay"?
      <button onClick={()=>handleClick(state.cart.cartItems,customers._id,state.cart.totalAmount,paymentMethod)}>Order Now</button>
      :null
        
    }
      {paymentMethod === "QuickPay"?
      
      <Payment/>:null}
    </div>
  );
}

export default Subtotal;