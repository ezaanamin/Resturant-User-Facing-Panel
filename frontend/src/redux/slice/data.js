import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
// Action
// mongodb+srv://ezaan_amin:itsmeagain2002@resturant.epics8q.mongodb.net/?retryWrites=true&w=majority
export const fetchStarters = createAsyncThunk("fetchStarters", async () => {
  const response = await fetch("http://localhost:5000/order/get/starters");
  return response.json();
});
export const fetchBreakfast = createAsyncThunk("fetchBreakfast", async () => {
    const response = await fetch("http://localhost:5000/order/get/breakfast");
    return response.json();
  });

  export const fetchLunch = createAsyncThunk("fetchLunch", async () => {
    const response = await fetch("http://localhost:5000/order/get/lunch");
    return response.json();
  });


  export const fetchDinner = createAsyncThunk("fetchDinner", async () => {
    const response = await fetch("http://localhost:5000/order/get/dinner");
    return response.json();
  });

  export const fetchDersert = createAsyncThunk("fetchDersert", async () => {
    const response = await fetch("http://localhost:5000/order/get/dessert");
    return response.json();
  });

  export const fetchBeverage = createAsyncThunk("fetchBeverage", async () => {
    const response = await fetch("http://localhost:5000/order/get/beverage");
    return response.json();
  });

  export  const fetchAbout=createAsyncThunk("fetchAbout", async () => {
    const response = await fetch("http://localhost:5000/about");
    return response.json();
  });
  export  const fetchReviews=createAsyncThunk("fetchReviews", async () => {
    const response = await fetch("http://localhost:5000/review/");
    return response.json();
  });

const DataSlice = createSlice({
  name: "data",
  initialState: {
    isLoading: false,
    starters: null,
    breakfast:null,
    lunch:null,
    dinner:null,
    dersert:null,
    beverage:null,
    about:null,
    reviews:null,
    isError: false,
    cart:[],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStarters.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStarters.fulfilled, (state, action) => {
      state.isLoading = false;
      state.starters = action.payload;
    });
    builder.addCase(fetchStarters.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });

    builder.addCase(fetchBreakfast.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(fetchBreakfast.fulfilled, (state, action) => {
        state.isLoading = false;
        state.breakfast = action.payload;
      });
      builder.addCase(fetchBreakfast.rejected, (state, action) => {
        console.log("Error", action.payload);
        state.isError = true;
      });


      builder.addCase(fetchLunch.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(fetchLunch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lunch = action.payload;
      });
      builder.addCase(fetchLunch.rejected, (state, action) => {
        console.log("Error", action.payload);
        state.isError = true;
      }); 


      builder.addCase(fetchDinner.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(fetchDinner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dinner = action.payload;
      });
      builder.addCase(fetchDinner.rejected, (state, action) => {
        console.log("Error", action.payload);
        state.isError = true;
      }); 


      builder.addCase(fetchDersert.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(fetchDersert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dersert = action.payload;
      });
      builder.addCase(fetchDersert.rejected, (state, action) => {
        console.log("Error", action.payload);
        state.isError = true;
      }); 


      builder.addCase(fetchBeverage.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(fetchBeverage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.beverage = action.payload;
      });
      builder.addCase(fetchBeverage.rejected, (state, action) => {
        console.log("Error", action.payload);
        state.isError = true;
      }); 


      builder.addCase(fetchAbout.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(fetchAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.about = action.payload;
      });
      builder.addCase(fetchAbout.rejected, (state, action) => {
        console.log("Error", action.payload);
        state.isError = true;
      }); 



      builder.addCase(fetchReviews.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(fetchReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
      });
      builder.addCase(fetchReviews.rejected, (state, action) => {
        console.log("Error", action.payload);
        state.isError = true;
      }); 






      
  },
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },

});




export default DataSlice.reducer;