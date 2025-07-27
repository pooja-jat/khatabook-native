import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import TransactionsList from "../components/TransactionsList";
import { useEffect } from "react";
import { getTransactions } from "../features/transactions/transactionSlice";
import authService from "../features/auth/authService";
import {useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();
  const transactions = useSelector(
    (state) => state.transactions.allTransactions ?? []
  );

  const dispatch = useDispatch();

  const balance = transactions.reduce((p, c) => p + c.amount, 0);

  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((p, c) => p + c.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((p, c) => p + c.amount, 0);

  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  return (
    <View className="min-h-screen p-4 py-8 bg-black">
      <View className="p-2">
        <Text className="text-white font-bold  text-xl">Pooja Jat</Text>
        <Text className="text-white">Developer</Text>
      </View>
      <View className=" p-4 rounded-xl " style={styles.main}>
        <Text className="text-lg text-white">Your Current Balance : </Text>
        <Text className="text-4xl text-white my-4">${balance}.00</Text>
      </View>
      <View className="my-4 flex-row items-center justify-between">
        <View className="px-4 py-2 flex items-center justify-between rounded-2xl  bg-white w-[45%]">
          <Text className="text-xl  font-bold text-purple-600  my-1">
            ${income}
          </Text>
          <Text className="text-sm  font-bold text-purple-600">Income</Text>
        </View>
        <View
          className="px-4 py-2  flex-col  items-center justify-between rounded-2xl bg- w-[45%] "
          style={styles.txt}
        >
          <Text className="text-xl font-bold text-white my-1">${expense}</Text>
          <Text className="text-sm  font-bold text-white">Expense</Text>
        </View>
      </View>
      <TransactionsList />
      <View>
        <TouchableOpacity
          onPress={() => {
            authService.logOut();
            router.push("/auth/login");
          }}
          className="bg-red-600 my-16 py-4 px-4 rounded-md mt-2"
        >
          <Text className="text-white text-center fonyt-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#1f1f1f",
  },

  txt: {
    backgroundColor: "#7B5EF6",
  },
});
