import { useEffect } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { getUser } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const checkAndRedirect = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        dispatch(getUser());
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

export default Index;
