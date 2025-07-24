import { configureStore } from "@reduxjs/toolkit";
import transactionsReducers from "./transactions/transactionSlice";
const store = configureStore({
  reducer: { transactions: transactionsReducers },
});

export default store;
