import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../features/transactions/transactionSlice';
import Toast from 'react-native-toast-message';

const Transaction = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  const handleAdd = () => {
    if (!text || !amount) {
      Toast.show({ type: 'error', text1: 'Text and amount are required' });
      return;
    }

    dispatch(addTransaction({ text, amount: parseFloat(amount) }));

    router.push('/(tabs)');
  };

  return (
    <View className="min-h-screen">
      <Text className="p-10 px-4 font-bold text-2xl text-gray-500">Add New Transaction</Text>
      <View className="flex items-center px-4">
        <TextInput keyboardType="text" className=" p-6 border border-gray-300 w-full rounded-md" value={text} onChangeText={setText} placeholder="Enter text" />
        <TextInput
          keyboardType="numeric"
          className="my-4 p-6 border border-gray-300 w-full rounded-md"
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter Amount"
        />
      </View>
      <View className=" flex items-center justify-center flex-row">
        <TouchableOpacity className="bg-white border border-gray-300 py-4 px-4 rounded-md w-[40%] m-4 ">
          <Text className="text-black font-bold text-2xl text-center" onPress={handleAdd}>
            Save Transaction
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-black  border-gray-400 py-4 px-4 rounded-md w-[40%] m-4" onPress={() => router.push('/dashboard')}>
          <Text className="text-white font-bold text-2xl text-center">Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Transaction;
