import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAxiosOption = async () => {
  const userData = await AsyncStorage.getItem("userToken");
  const token = JSON.parse(userData ?? {})?.token;
  const options = {
    headers: {
      authorization: `Bearer${token}`,
    },
  };
  return options;
};

export const baseUrl = "http://10.0.2.2:3000/api";
