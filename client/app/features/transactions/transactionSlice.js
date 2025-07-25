import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
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
      // let token = thunkAPI.get.auth.user.token;
      let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODM4YjIwYTJhNGJiZTczZWE0ODU5MyIsImlhdCI6MTc1MzQ2MTExOCwiZXhwIjoxNzU2MDUzMTE4fQ.-nZRo_Ar5ueEY1ZBqDpo4AqzJ3yDfKNVWzomNTQ1v_k";

      return await transactionService.fetchAllTransactions(token);
    } catch (error) {
      console.log("object", error);
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const getTransactions = createAsyncThunk(
//   "FETCH/TRANSACTION",
//   async (_, thunkAPI) => {
//     try {
//       const options = {
//         headers: {
//           authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODM4YjIwYTJhNGJiZTczZWE0ODU5MyIsImlhdCI6MTc1MzQ1MTI5NywiZXhwIjoxNzU2MDQzMjk3fQ.oAsEIUaqnELu61YlltRseB697snECr-25JWFbcQ6vOA`,
//         },
//       };
//       const response = await axios.get("/api/transaction", options);
//       return response.data;
//     } catch (error) {
//       console.log("error");
//     }
//   }
// );
