import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { removeTransaction } from "../features/transactions/transactionSlice";

export default function TransactionListItem({ transaction }) {
  const router = useRouter();

  const dispatch = useDispatch();

  const removeThisTransaction = (id) => {
    dispatch(removeTransaction(id));
  };

  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: `/dashboard/transaction/${transaction._id}`,
        });
      }}
    >
      <View className="p-4 rounded-md  my-2 rounded-xl" style={styles.main}>
        <Text className="text-lg text-white font-semibold my-2">
          {transaction.text}
        </Text>
        <Text className="text-2xl text-white font-semibold my-2">
          {transaction.amount}
        </Text>
        <View className=" flex justifly-center items-center flex-row absolute bottom-3 right-3">
          <TouchableOpacity className="bg-yellow-500 p-2 font-semibold text-sm mx-1 rounded-full">
            <MaterialIcons name="edit" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => removeThisTransaction(transaction._id)}
            className="bg-red-500 p-2 font-semibold text-sm mx-1 rounded-full"
          >
            <MaterialIcons name="delete" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#1f1f1f",
  },
});
