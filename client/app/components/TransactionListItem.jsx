import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TransactionListItem({ transaction }) {
  return (
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
        <TouchableOpacity className="bg-red-500 p-2 font-semibold text-sm mx-1 rounded-full">
          <MaterialIcons name="delete" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#1f1f1f",
  },
});
