import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import transactionService from "./transactionService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    allTransactions: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allTransactions = action.payload;
        state.isError = false;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        meaasge: action.payload;
      });
  },
});

export default transactionSlice.reducer;

//Get Transaction

export const getTransactions = createAsyncThunk(
  "FETCH/TRANSACTIONS",
  async (_, thunkAPI) => {
    try {
      let obj = await AsyncStorage.getItem("userToken");
     
      return await transactionService.fetchAllTransactions(obj.token);
     
    } catch (error) {
      console.log("object", error);
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


