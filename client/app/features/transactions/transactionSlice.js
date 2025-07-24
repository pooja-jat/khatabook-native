import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    allTransactions: [
      { id: 1, text: "Redux Salary", amount: 500000 },
      { id: 2, text: "Rent", amount: -10000 },
    ],
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default transactionSlice.reducer;
