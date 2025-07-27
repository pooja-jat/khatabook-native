import { configureStore } from "@reduxjs/toolkit";
import transactionsReducers from "./transactions/transactionSlice";
import authReducer from "./auth/authSlice";

const store = configureStore({
  reducer: { auth: authReducer, transactions: transactionsReducers },
});

export default store;
