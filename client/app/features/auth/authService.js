import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../../utillity";

const register = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/register`, formData);
    await AsyncStorage.setItem("userToken", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("SomeThing Went Wrong", error);
  }
};

const login = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, formData);
    await AsyncStorage.setItem("userToken", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("SomeThing went wrong", error);
  }
};

const logOut = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
  } catch (error) {
    console.log("SomeThing went wrong", error);
  }
};

const authService = { register, login, logOut };

export default authService;
