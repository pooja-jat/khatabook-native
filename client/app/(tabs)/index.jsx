import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TransactionsList from '../components/TransactionsList';
import { useEffect } from 'react';
import { getTransactions } from '../features/transactions/transactionSlice';

import { useRouter } from 'expo-router';

export default function Dashboard() {
  const router = useRouter();
  const transactions = useSelector((state) => state.transactions.allTransactions ?? []);
  const user = useSelector((state) => state.auth.auth ?? null);

  const dispatch = useDispatch();

  const balance = transactions.reduce((p, c) => p + c.amount, 0);

  const income = transactions.filter((transaction) => transaction.amount > 0).reduce((p, c) => p + c.amount, 0);

  const expense = transactions.filter((transaction) => transaction.amount < 0).reduce((p, c) => p + c.amount, 0);

  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  return (
    <View className="min-h-screen p-4 bg-black">
      <View className="p-2 my-2">
        <Text className="text-white font-bold my-2 text-3xl">{user.name}</Text>
      </View>
      <View className=" p-4 rounded-xl " style={styles.main}>
        <Text className="text-lg text-white">Your Current Balance : </Text>
        <Text className="text-4xl text-white my-4">${balance}</Text>
      </View>
      <View className="my-6 flex-row items-center justify-between">
        <View className="px-4 py-2 flex items-center justify-between rounded-2xl  bg-white w-[45%]">
          <Text className="text-2xl  font-bold text-purple-600  my-1">${income}</Text>
          <Text className="text-xl  font-bold text-purple-600">Income</Text>
        </View>
        <View className="px-4 py-2 flex-col items-center justify-between rounded-2xl  w-[45%] " style={styles.txt}>
          <Text className="text-2xl font-bold text-white my-1">${expense}</Text>
          <Text className="text-xl  font-bold text-white">Expense</Text>
        </View>
      </View>
      <TransactionsList />
      <View className="items-center justify-center flex-row my-16">
        <TouchableOpacity
          onPress={() => {
            router.push('/dashboard/transaction/createTransaction');
          }}
          className="bg-white border border-gray-300 py-4 px-4 rounded-md  w-[45%] m-6"
        >
          <Text className=" text-black text-center text-2xl font-bold">Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#1f1f1f',
  },

  txt: {
    backgroundColor: '#7B5EF6',
  },
});
