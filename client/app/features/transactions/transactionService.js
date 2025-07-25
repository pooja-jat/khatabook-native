import axios from "axios";

const fetchAllTransactions = async (token) => {
  const options = {
    headers: {
      authorization: `Bearer${token}`,
    },
  };
  try {
  const response = await axios.get("http://172.20.10.10:8080/api/transactions", options);
  return response.data;
  } catch (err) {
    console.log("err", err)
  }

};

const transactionService = { fetchAllTransactions };
export default transactionService;
