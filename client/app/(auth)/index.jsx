import { Link, useRouter } from "expo-router";
import { Image } from "react-native";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const index = () => {
  const router = useRouter();
  return (
    <View className="min-h-screen  flex items-center justify-center bg-white p-8">
      <Image
        style={styles.image}
        source={require("../../assets/images/login.jpg")}
        className="h-72"
      />
      <Text className="text-2xl font-bold uppercase">Login Here</Text>
      <View className="border border-gray-200 rounded-md p-4 my-2 mb-8">
        <View className="mb-20">
          <TextInput
            keyboardType="password"
            className="border border-gray-300 rounded-md w-96 my-4 p-4"
            placeholder="Enter Email Here"
          />
          <TextInput
            keyboardType="text"
            className="border border-gray-300 rounded-md w-96 my-4 p-4"
            secureTextEntry={true}
            placeholder="Enter Password Here"
          />
          <TouchableOpacity
            onPress={() => router.push("/dashboard")}
            className="bg-blue-600 py-4 px-4 rounded-md"
          >
            <Text className="text-white text-center text-xl font-bold">
              Login
            </Text>
          </TouchableOpacity>
          <Link className="my-2 ml-1 text-blue-500" href="/forgot-password">
            Forgot Password?
          </Link>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/(auth)/register")}
          className=" border border-blue-600 py-4 px-4 rounded-md"
        >
          <Text className="text-blue-500 text-center text-xl font-semibold">
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
  },
});
