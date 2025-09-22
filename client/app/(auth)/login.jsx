import { Link, useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { Image } from 'react-native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading } = useSelector((state) => state.auth);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      await dispatch(login({ email, password }));
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.log('SomeThing went wrong', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View className="min-h-screen  flex items-center justify-center bg-white p-8">
          <Image style={styles.image} source={require('../../assets/images/login.jpg')} className="h-72" />
          <Text className="text-2xl font-bold uppercase">Login Here</Text>
          <View className="border border-gray-200 rounded-md p-4 my-2 mb-8">
            <View className="mb-4">
              <TextInput
                value={email}
                onChangeText={(e) => setEmail(e)}
                keyboardType="default"
                autoCapitalize="none"
                autoComplete="off" // Change this from "email" to "off"
                autoCorrect={false} // Add this
                className="border border-gray-300 rounded-md w-96 my-4 p-4"
                placeholder="Enter Email Here"
              />
              <TextInput
                value={password}
                onChangeText={(e) => setPassword(e)}
                className="border border-gray-300 rounded-md w-96 my-4 p-4"
                secureTextEntry={true}
                placeholder="Enter Password Here"
              />
              <TouchableOpacity onPress={() => handleLogin()} className="bg-blue-600 py-4 px-4 rounded-md">
                <Text className="text-white text-center text-xl font-bold">{isLoading ? 'Loading...' : 'Login'}</Text>
              </TouchableOpacity>
              <Link className="my-2 ml-1 text-blue-500" href="">
                Forgot Password?
              </Link>
            </View>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')} className=" border border-blue-600 py-4 px-4 rounded-md">
              <Text className="text-blue-500 text-center text-xl font-semibold">Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: '100%',
  },
});
