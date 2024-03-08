import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CardElement } from '@stripe/react-stripe-js';

export const updateCustomer = createAsyncThunk(
  'updateCustomer',
  async ({ address, phone, userId }) => {
    try {
      const response = await axios.post('http://localhost:5000/customers/update', {
        address: address,
        phone: phone,
        customers_id: userId
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCustomers = createAsyncThunk(
  'fetchCustomers',
  async (token) => {
    try {
      const response = await axios.post('http://localhost:5000/customers/get', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const makePaymentAndCreateOrder = createAsyncThunk(
  'payment/makePaymentAndCreateOrder',
  async ({ cartItems, totalAmount, customersId, stripe, elements }) => {
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
      });

      if (!error) {
        const { id } = paymentMethod;
        const paymentResponse = await axios.post('http://localhost:5000/payment', {
          amount: totalAmount,
          id
        });

        if (paymentResponse.data.message === 'Payment successful') {
          const orderResponse = await axios.post('http://localhost:5000/order/new/order', {
            menu: cartItems,
            customer_id: customersId,
            totalAmount,
            paymentMethod: 'QuickPay'
          });

          return orderResponse.data;
        }
      } else {
        throw new Error(error.message);
      }
    } catch (error) {
      throw error;
    }
  }
);

export const APISlice = createSlice({
  name: 'POST',
  initialState: { data: [], error: null, status: 'idle', verifiedStatus: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateCustomer.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(makePaymentAndCreateOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(makePaymentAndCreateOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(makePaymentAndCreateOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});
