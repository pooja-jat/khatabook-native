import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const register = async (formData) => {
  try {
    const response = await axios.post(
      "http://192.168.57.161:8080/api/auth/register",
      formData
    );
    await AsyncStorage.setItem("userToken", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("SomeThing Went Wrong", error);
  }
};

const login = async (formData) => {
  try {
    const response = await axios.post(
      "http://192.168.57.161:8080/api/auth/login",
      formData
    );
    await AsyncStorage.setItem("userToken", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("SomeThing Went Wrong", error);
  }
};

const logOut = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
  } catch (error) {
    console.log("someThing Went Wrong", error);
  }
};

const authService = { register, login, logOut };

export default authService;
