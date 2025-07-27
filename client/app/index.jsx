import { useEffect } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();

  const checkAndRedirect = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        router.push("/dashboard");
      } else {
        router.push("/auth/login");
      }
    } catch (error) {
      console.log("app error", error);
    }
  };

  useEffect(() => {
    checkAndRedirect();
  }, []);

  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default index;
