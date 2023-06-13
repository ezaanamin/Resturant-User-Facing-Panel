import React from 'react'
import { useState } from 'react'
import { CardElement,useElements,useStripe } from '@stripe/react-stripe-js'
import { useSelector,useDispatch } from 'react-redux'
import { useContext } from "react";
import { UserContext } from '../context/context';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import RemoveAllCart from "../redux/slice/cart"


import "./subtotal.css"

function PaymentForm() {
 
    const stripe=useStripe()
    const elements=useElements()
    const state = useSelector((state) => state);
  const{SetModalCart,customers,paymentMethod,SetOrderNumber}=useContext(UserContext);
  const nav=useNavigate();
  const dispatch = useDispatch();



    const CARD_OPTIONS = {
      iconStyle: "solid",
      style: {
        base: {
          iconColor: "#7fa142",
          color: "#fff",
          fontWeight: 500,
          fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
          fontSize: "16px",
          
          fontSmoothing: "antialiased",
          ":-webkit-autofill": { color: "#7fa142" },
          "::placeholder": { color: "#7fa142" }
        },
        invalid: {
          iconColor: "#ffc7ee",
          color: "#ffc7ee"
        }
      }
    }


    const handleSubmit = async (e) => {
      if(state.cart.cartItems.length==0)
      {
        SetModalCart(true)
      
      }
      else
      {
        SetModalCart(false)
      

      e.preventDefault()
      const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement)
      })
   
  if(!error) {
      try {

          const {id} = paymentMethod
          const response = await axios.post("http://localhost:5000/payment", {
              a:state.cart.totalAmount,
              id
          })
      
          if(response.data.message=="Payment successful") {

      const response1= await axios.post('http://localhost:5000/order/new/order',{menu:state.cart.cartItems,customer_id:customers._id,totalAmount:state.cart.totalAmount,paymentMethod:"QuickPay"})
       console.log(response1.data)

       if(response1.data)
       {
    
        SetOrderNumber(response.data.Order_Number)
        dispatch(RemoveAllCart)

        nav("/sucess")
       }
          
          }

      } catch (error) {
          console.log("Error", error)
      }
  } else {
      console.log(error.message)
  }
}
}


    








        
      
        


  
  return (
     <>
       
     
        <div style={{position:"relative",top:30}}>
            <fieldset className="FormGroup">
        
                <div className="FormRow">
               
                    <CardElement options={CARD_OPTIONS}/>
                    
                </div>
            </fieldset>
            <button   onClick={handleSubmit} className='button_pay'>Pay Now</button>
            </div>
          
     
        
   
        
            
        </>
  )
}

export default PaymentForm