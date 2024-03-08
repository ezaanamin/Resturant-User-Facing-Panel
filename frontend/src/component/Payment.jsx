import React from 'react'
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import PaymentForm from './PaymentForm'
function Payment() {
    const PUBLC_KEY="pk_test_51KXLYYJoPtSQuC0km3i7lHyNhOK2QuUMZALyGe4jQWjSHfhZhCGvFyAj4Lw3R77fOZBSQJUjdrPDrl6Uh4TdHiSn00RwE2t5Ss"
    const stripeTestPromise=loadStripe(PUBLC_KEY)
  return (
  <Elements stripe={stripeTestPromise}>
 <PaymentForm/>
  </Elements>
  )
}

export default Payment