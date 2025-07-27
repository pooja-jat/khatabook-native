import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import authService from "../features/auth/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "aman1",
    email: "aman@1234",
    password: "12345678",
    confirmPassword: "12345678",
  });

  const router = useRouter();

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Password Not Match",
      });
    } else {
      await authService.register(formData);
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        router.push("/dashboard");
      }
    }
  };
  return (
    <View className="min-h-screen  flex items-center justify-center bg-white p-8">
      <Image
        style={styles.image}
        source={require("../../assets/images/login.jpg")}
        className="h-72"
      />
      <Text className="text-2xl font-bold uppercase">Register Here</Text>
      <View className="border border-gray-200 rounded-md p-4 my-2 mb-8">
        <View className="mb-20">
          <TextInput
            type="text"
            name="name"
            value={name}
            onChangeText={handleChange}
            keyboardType="password"
            className="border border-gray-300 rounded-md w-96 my-2 p-4"
            placeholder="Enter Your Name Here"
          />
          <TextInput
            keyboardType="text"
            name="email-address"
            value={email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md w-96 my-2 p-4"
            placeholder="Enter Email Here"
          />
          <TextInput
            keyboardType="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="border border-gray-300 rounded-md w-96 my-2 p-4"
            secureTextEntry={true}
            placeholder="Enter Password Here"
          />
          <TextInput
            keyboardType="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className="border border-gray-300 rounded-md w-96 my-2 p-4"
            secureTextEntry={true}
            placeholder="Confirm Password Here"
          />
          <TouchableOpacity
            onPress={handleRegister}
            className="bg-blue-600 py-4 px-4 rounded-md mt-2"
          >
            <Text className="text-white text-center text-xl font-bold">
              Register
            </Text>
          </TouchableOpacity>
          <Link className="my-2 ml-1 text-blue-500" href="/(auth)">
            Already Registered ?
          </Link>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
  },
});
