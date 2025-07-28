import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import transactionService from "./transactionService";

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
        state.message = action.payload;
      })
      .addCase(removeTransaction.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allTransactions = state.allTransactions.filter(
          (transaction) => transaction._id !== action.payload._id
        );
        state.isError = false;
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default transactionSlice.reducer;

//Get Transaction
export const getTransactions = createAsyncThunk(
  "FETCH/TRANSACTIONS",
  async (_, thunkAPI) => {
    try {
      return await transactionService.fetchAllTransactions();
    } catch (error) {
      console.log("object", error);
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Remove Transaction
export const removeTransaction = createAsyncThunk(
  "REMOVE/TRANSACTION",
  async (id, thunkAPI) => {
    try {
      await transactionService.deleteTransaction(id);
      return {
        _id: id,
      };
    } catch (error) {
      console.log("object", error);
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
