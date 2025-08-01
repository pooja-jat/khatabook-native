import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import authService from '../features/auth/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
  const { isLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const router = useRouter();
  const dispatch = useDispatch();

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
        type: 'error',
        text1: 'Password Not Match',
      });
    } else {
      await authService.register(formData);
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        dispatch(getUser());
        router.push('/(tabs)');
      }
    }
  };

  // if (isLoading) {
  //   return (
  //     <View className="min-h-screen p-16">
  //       <View className="flex-1 items-center justify-center">
  //         <Text className="font-bold  text-2xl text-center">Loading...</Text>
  //       </View>
  //     </View>
  //   );
  // }

  return (
    <View className="min-h-screen  flex items-center justify-center bg-white p-8">
      <Image style={styles.image} source={require('../../assets/images/login.jpg')} className="h-72" />
      <Text className="text-2xl font-bold uppercase">Register Here</Text>
      <View className="border border-gray-200 rounded-md p-4 my-2 mb-8">
        <View className="mb-20">
          <TextInput
            name="name"
            value={name}
            onChangeText={handleChange}
            keyboardType="text"
            className="border border-gray-300 rounded-md w-96 my-2 p-4"
            placeholder="Enter Your Name Here"
          />
          <TextInput
            name="email-address"
            value={email}
            keyboardType="text"
            onChange={handleChange}
            className="border border-gray-300 rounded-md w-96 my-2 p-4"
            placeholder="Enter Email Here"
          />
          <TextInput
            name="password"
            value={password}
            keyboardType="password"
            onChange={handleChange}
            className="border border-gray-300 rounded-md w-96 my-2 p-4"
            secureTextEntry={true}
            placeholder="Enter Password Here"
          />
          <TextInput
            name="confirmPassword"
            value={confirmPassword}
            keyboardType="password"
            onChange={handleChange}
            className="border border-gray-300 rounded-md w-96 my-2 p-4"
            secureTextEntry={true}
            placeholder="Confirm Password Here"
          />
          <TouchableOpacity onPress={handleRegister} className="bg-blue-600 py-4 px-4 rounded-md mt-2">
            <Text className="text-white text-center text-xl font-bold">Register</Text>
          </TouchableOpacity>
          <Link className="my-2 ml-1 text-blue-500" href="/(auth)/login">
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
    resizeMode: 'contain',
  },
});
