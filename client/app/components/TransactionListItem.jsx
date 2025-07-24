import { Text, TouchableOpacity, View } from "react-native";

export default function TransactionListItem({ transaction }) {
  return (
    <View className="p-4 rounded-md border border-gray-200 my-2 rounded-md">
      <Text className="text-lg font-semibold my-2">{transaction.text}</Text>
      <Text className="text-2xl font-semibold my-2">{transaction.amount}</Text>
      <View className="flex flex-row absolute bottom-3 right-3">
        <TouchableOpacity className="bg-yellow-500 py-1 px-2  font-semibold text-sm mx-1 rounded-lg">
          <Text className="text-white">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-red-500 py-1 px-2 font-semibold text-sm mx-1 rounded-lg">
          <Text className="text-white">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
