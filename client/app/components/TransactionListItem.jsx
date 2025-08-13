import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { editTransaction, removeTransaction } from '../features/transactions/transactionSlice';

export default function TransactionListItem({ item }) {
  const router = useRouter();

  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeTransaction(id));
  };

  const handleEdit = (transaction) => {
    dispatch(editTransaction(transaction));
    router.push('/(tabs)/transaction');
  };

  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: `/dashboard/transaction/${item._id}`,
        });
      }}
    >
      <View className="p-4  my-2 border border-gray-100 rounded-xl" style={styles.container}>
        <Text className="text-lg text-white font-semibold my-2">{item.text}</Text>
        <Text className="text-2xl text-white font-semibold my-2">{item.amount}</Text>
        <View className=" flex justifly-center items-center flex-row absolute bottom-3 right-3">
          <TouchableOpacity onPress={() => handleEdit(item)} className="bg-yellow-500 p-2 font-semibold text-sm mx-1 rounded-full">
            <Ionicons name="create-outline" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRemove(item._id)} className="bg-red-600 text-red-500 p-2 font-semibold text-sm mx-1 rounded-full">
            <Ionicons name="trash-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f1f1f',
  },
});
