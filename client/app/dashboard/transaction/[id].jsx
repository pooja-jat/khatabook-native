import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import transactionService from '../../features/transactions/transactionService';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const Transaction = () => {
  const router = useRouter();

  const [transaction, setTransaction] = useState(null);
  const { id } = useLocalSearchParams();

  const user = useSelector((state) => state.auth.user ?? null);

  const fetchData = async () => {
    const trans = await transactionService.fetchTransaction(id);
    setTransaction(trans);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!transaction) {
    return (
      <View className="min-h-screen p-16">
        <View className="flex-1 items-center justify-center">
          <Text className="font-bold  text-2xl text-center">Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="min-h-screen p-4 bg-black">
      <Text className="mt-20 text-3xl font-bold text-white text-2xl text-center">Transaction Details</Text>

      <View className="p-2 items-center justify-center">
        <Text className="text-white my-2 font-bold text-2xl">{user?.name}</Text>
      </View>
      <View className="my-4 flex-row rounded-2xl bg-white">
        <View className="p-4 flex w-full">
          <Text className="text-xl my-1 font-bold text-purple-600"> User : {transaction.user}</Text>
          <Text className="text-xl my-1 font-bold text-purple-600">Text : {transaction.text}</Text>
          <Text className="text-xl my-1  font-bold text-purple-600">Amount :{transaction.amount}</Text>
          <Text className="text-xl  my-1 font-bold text-purple-600">CreatedAt :{transaction.createdAt}</Text>
          <Text className="text-xl my-1  font-bold text-purple-600">UpdatedAt :{transaction.updatedAt}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          router.push('/(tabs)');
        }}
        className=" absolute bottom-20 left-4 my-2 bg-purple-600 border border-gray-400 py-4 px-8 rounded-md w-full flex itmes-center justify-center flex-row"
      >
        <Ionicons name="arrow-back-outline" className="mx-2" size={24} color={'white'} />
        <Text className="text-white text-center text-2xl font-bold text-center">Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Transaction;
