import axios from 'axios';
import { getAxiosOption, baseUrl } from '../../utillity';

// Get All Transactions
const fetchAllTransactions = async () => {
  const options = await getAxiosOption();
  try {
    const response = await axios.get(`${baseUrl}/transactions`, options);
    return response.data;
  } catch (error) {
    console.log('err', error);
  }
};

//Get Transaction
const fetchTransaction = async (id) => {
  const options = await getAxiosOption();
  try {
    const response = await axios.get(`${baseUrl}/transaction/${id}`, options);
    return response.data;
  } catch (error) {
    console.log('err', error);
  }
};

//Remove Transaction

const deleteTransaction = async (id) => {
  const options = await getAxiosOption();
  try {
    const response = await axios.delete(`${baseUrl}/transaction/${id}`, options);
    return response.data;
  } catch (error) {
    console.log('err', error);
  }
};

// Add Transaction
const createTransaction = async ({ text, amount }) => {
  const options = await getAxiosOption();
  try {
    console.log('options', options);
    const response = await axios.post(`${baseUrl}/transaction/`, { text, amount }, options);
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.log('err', error);
  }
};
// Update Transaction
const updateTransaction = async (updatedTransaction , id) => {
  const options = await getAxiosOption();
  try {
    const response = await axios.put(`${baseUrl}/transaction/${id}`, updatedTransaction, options);
    return response.data;
  } catch (error) {
    console.log('err', error);
  }
};

const transactionService = {
  fetchAllTransactions,
  fetchTransaction,
  deleteTransaction,
  createTransaction,
  updateTransaction,
};
export default transactionService;
