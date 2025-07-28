import axios from "axios";
import { getAxiosOption, baseUrl } from "../../utillity";

// Get All Traansactions
const fetchAllTransactions = async () => {
  const options = await getAxiosOption();
  try {
    const response = await axios.get(`${baseUrl}/transactions`, options);
    return response.data;
  } catch (error) {
    console.log("err", error);
  }
};

//Get Transaction
const fetchTransaction = async (id) => {
  const options = await getAxiosOption();
  try {
    const response = await axios.get(`${baseUrl}/transaction/${id}`, options);
    return response.data;
  } catch (error) {
    console.log("err", error);
  }
};

//Remove Transaction

const deleteTransaction = async (id) => {
  const options = await getAxiosOption();
  try {
    const response = await axios.delete(
      `${baseUrl}/transaction/${id}`,
      options
    );
    return response.data;
  } catch (error) {
    console.log("err", error);
  }
};

const transactionService = {
  fetchAllTransactions,
  fetchTransaction,
  deleteTransaction,
};
export default transactionService;
