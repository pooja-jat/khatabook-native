import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import TransactionsList from "../components/TransactionsList";

const index = () => {
  const transactions = useSelector(
    (state) => state.transactions.allTransactions
  );

  const balance = transactions.reduce((p, c) => p + c.amount, 0);

  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((p, c) => p + c.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((p, c) => p + c.amount, 0);

  return (
    <View className="min-h-screen p-4 py-8">
      <View className="p-4 rounded-lg bg-blue-700">
        <Text className="text-2xl text-white my-4">{balance}</Text>
        <Text className="text-lg text-white">Your Current Balance : </Text>
      </View>
      <View className="my-4 flex-row items-center justify-between">
        <View className="p-4 rounded-lg bg-green-700 w-[48%] ">
          <Text className="text-2xl text-white my-4">{income}</Text>
          <Text className="text-lg text-white">Income</Text>
        </View>
        <View className="p-4 rounded-lg bg-red-600 w-[48%] ">
          <Text className="text-2xl text-white my-4">{expense}</Text>
          <Text className="text-lg text-white">Expense</Text>
        </View>
      </View>
      <TransactionsList />
    </View>
  );
};

export default index;
