import { useEffect } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { getUser } from './features/auth/authSlice';
import { useDispatch } from 'react-redux';

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const checkAndRedirect = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        dispatch(getUser());
        router.push('/(tabs)');
      } else {
        router.push('/(auth)/login');
      }
    } catch (error) {
      console.log('app error', error);
    }
  };

  useEffect(() => {
    checkAndRedirect();
  }, []);

  return (
    <View className="min-h-screen p-16">
      <View className="flex-1 items-center justify-center">
        <Text className="font-bold  text-2xl text-center">Loading...</Text>
      </View>
    </View>
  );
};

export default Index;
