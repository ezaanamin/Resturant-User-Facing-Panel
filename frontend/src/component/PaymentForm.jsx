import React from 'react'
import { useState } from 'react'
import { CardElement,useElements,useStripe } from '@stripe/react-stripe-js'
import { useSelector,useDispatch } from 'react-redux'
import { useContext } from "react";
import { UserContext } from '../context/context';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import RemoveAllCart from "../redux/slice/cart"
import { makePaymentAndCreateOrder } from '../redux/Post';

import "./subtotal.css"
import Cookies from 'universal-cookie';
import jwt from "jwt-decode"

function PaymentForm() {
 
    const stripe=useStripe()
    const elements=useElements()
    const state = useSelector((state) => state);
  const{SetModalCart,customers,paymentMethod,SetOrderNumber}=useContext(UserContext);
  const nav=useNavigate();
  const dispatch = useDispatch();


  const cookies = new Cookies();
  const storedCustomerId = cookies.get('token');
  const decoded = jwt(storedCustomerId);
  const user_id = decoded.user_id;
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
      try {
        if (state.cart.cartItems.length === 0) {
          SetModalCart(true);
          return;
        } else {
          SetModalCart(false);
        }
    
        e.preventDefault();
    
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement)
        });
    
        if (!error) {
          const response = await dispatch(makePaymentAndCreateOrder({
            cartItems: state.cart.cartItems,
            totalAmount: state.cart.totalAmount,
            customersId: user_id,
            stripe,
            elements 
          }));
    
          if (response.payload) {
            SetOrderNumber(response.Order_Number); // Assuming response structure has Order_Number
            dispatch(RemoveAllCart()); // Corrected dispatch call
            nav("/success");
          }
        } else {
          console.log(error.message);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    


    








        
      
        


  
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