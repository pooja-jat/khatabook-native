import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import transactionService from './transactionService';

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    allTransactions: [],
    editTransaction: {
      transaction: {},
      isEdit: false,
    },
  },
  reducers: {
    transactionEdit: (state, action) => {
      return {
        ...state,
        editTransaction: {
          transaction: action.payload,
          isEdit: true,
        },
      };
    },
  },
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
      .addCase(addTransaction.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allTransactions = [...state.allTransactions, action.payload];
        state.isError = false;
      })
      .addCase(addTransaction.rejected, (state, action) => {
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
        state.allTransactions = state.allTransactions.filter((transaction) => transaction._id !== action.payload._id);
        state.isError = false;
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTheTransaction.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateTheTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allTransactions = state.allTransactions.map((transaction) => (transaction._id === action.payload._id ? action.payload : transaction));
        state.editTransaction = {
          transaction: {},
          isEdit: false,
        };
        state.isError = false;
      })
      .addCase(updateTheTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default transactionSlice.reducer;

//Get All Transaction
export const getTransactions = createAsyncThunk('FETCH/TRANSACTIONS', async (_, thunkAPI) => {
  try {
    return await transactionService.fetchAllTransactions();
  } catch (error) {
    console.log('object', error);
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

//Remove Transaction
export const removeTransaction = createAsyncThunk('REMOVE/TRANSACTION', async (id, thunkAPI) => {
  try {
    await transactionService.deleteTransaction(id);
    return {
      _id: id,
    };
  } catch (error) {
    console.log('object', error);
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

//Add Transaction
export const addTransaction = createAsyncThunk('ADD/TRANSACTION', async ({ text, amount }, thunkAPI) => {
  try {
    return await transactionService.createTransaction({
      text,
      amount,
    });
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

//Update Transaction
export const updateTheTransaction = createAsyncThunk('UPDATE/TRANSACTION', async ({ updatedTransaction }, thunkAPI) => {
  try {
    await transactionService.updateTransaction(updatedTransaction);
  } catch (error) {
    console.log('object', error);
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});
