import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, updateTheTransaction } from '../features/transactions/transactionSlice';
import { Ionicons } from '@expo/vector-icons';

const Transaction = () => {
  const { isError, message, isSuccess } = useSelector((state) => state.auth);
  const { edit, isLoading } = useSelector((state) => state.transactions);

  const router = useRouter();
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  const handleAdd = () => {
    if (!edit.isEdit) {
      dispatch(addTransaction({ text, amount: parseFloat(amount) }));
    } else {
      dispatch(updateTheTransaction({ _id: edit.transaction._id, text, amount: +amount }));
    }

    if (isSuccess) {
      router.push('/(tabs)');
    }

    setText('');
    setAmount('');
  };

  useEffect(() => {
    setText(edit?.transaction.text);
    setAmount(edit?.transaction?.amount?.toString());

    if (isError && message) {
      Alert.alert(message);
    }
  }, [isError, message, edit]);

  return (
    <View className="p-10 flex items-center justify-center flex-1">
      <Text className="font-semibold text-2xl mb-20">Add New Transaction</Text>
      <View className=" w-full border border-gray-300 p-6 rounded-md my-2">
        <Text className="font-semibold text-lg">Transaction Text</Text>
        <TextInput
          keyboardType="text"
          className="my-2 p-2 py-4 border border-gray-400 w-full rounded-md"
          value={text}
          onChangeText={setText}
          placeholder="Enter text"
        />
        <Text className="font-semibold text-lg">Transaction Amount</Text>
        <TextInput
          keyboardType="numeric"
          className=" mt-2 my-2 p-2 py-4 border border-gray-400 w-full rounded-md"
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter Amount"
        />
      </View>

      <TouchableOpacity className="my-2 bg-emerald-600 border border-gray-400 py-4 px-8 rounded-md w-full flex itmes-center justify-center flex-row">
        <Text className="text-white font-bold text-2xl" onPress={handleAdd}>
          {isLoading ? 'Loading...' : edit.isEdit ? 'Update Transaction' : 'Save Transaction'}
        </Text>
        {!isLoading && <Ionicons name="arrow-forward-outline" className="mx-2" size={24} color={'white'} />}
      </TouchableOpacity>
    </View>
  );
};

export default Transaction;
