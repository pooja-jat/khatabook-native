import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import transactionService from "../../features/transactions/transactionService";
import { useSelector } from "react-redux";

const Transaction = () => {

    const router = useRouter();

  const [transaction, setTransaction] = useState(null);
  const { id } = useLocalSearchParams();

  const auth = useSelector((state) => state.auth.auth ?? null);

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
      <View className="p-2  mb-14 items-center justify-center">
        <Text className="text-white my-2 font-bold text-3xl">
          {auth.name}
        </Text>
        <Text className="text-white font-semibold text-xl">Developer</Text>
      </View>
      <View className="my-4 flex-row rounded-2xl bg-white">
        <View className="p-4 flex w-full">
          <Text className="text-xl my-1 font-bold text-purple-600">
            {" "}
            User : {transaction.user}
          </Text>
          <Text className="text-xl my-1 font-bold text-purple-600">
            Text : {transaction.text}
          </Text>
          <Text className="text-xl my-1  font-bold text-purple-600">
            Amount :{transaction.amount}
          </Text>
          <Text className="text-xl  my-1 font-bold text-purple-600">
            CreatedAt :{transaction.createdAt}
          </Text>
          <Text className="text-xl my-1  font-bold text-purple-600">
            UpdatedAt :{transaction.updatedAt}
          </Text>
        </View>
      </View>
     <TouchableOpacity
          onPress={() => {
            router.push("/dashboard");
          }}
          className="bg-purple-600 absolute bottom-20 left-4 py-4 px-4 rounded-md mt-2 w-full"
        >
          <Text className="text-white text-center text-2xl font-bold">Back</Text>
        </TouchableOpacity>
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#1f1f1f",
  },
});
