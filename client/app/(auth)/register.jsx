import { Link } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const register = () => {
  return (
    <View className="min-h-screen  flex items-center justify-center bg-white p-8">
      {/* <Image
        style={styles.image}
        source={require("../../assets/images/login.jpg")}
        className="h-72"
      /> */}
      <Text className="text-2xl font-bold uppercase">Register Here</Text>
      <View className="border border-gray-200 rounded-md p-4 my-2 mb-8">
        <View className="mb-20">
          <TextInput
            keyboardType="password"
            className="border border-gray-300 rounded-md w-96 my-2 p-4"
            placeholder="Enter Your Name Here"
          />
          <TextInput
            keyboardType="password"
            className="border border-gray-300 rounded-md w-96 my-2 p-4"
            placeholder="Enter Email Here"
          />
          <TextInput
            keyboardType="text"
            className="border border-gray-300 rounded-md w-96 my-2 p-4"
            secureTextEntry={true}
            placeholder="Enter Password Here"
          />
          <TextInput
            keyboardType="text"
            className="border border-gray-300 rounded-md w-96 my-2 p-4"
            secureTextEntry={true}
            placeholder="Confirm Password Here"
          />
          <TouchableOpacity className="bg-blue-600 py-4 px-4 rounded-md mt-2">
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

export default register;

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
  },
});
