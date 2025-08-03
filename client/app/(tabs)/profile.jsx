import { Text, TouchableOpacity, View } from 'react-native';
import authService from '../features/auth/authService';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  const user = useSelector((state) => state.auth.auth);
  const router = useRouter();
  return (
    <View className="p-10 flex-1">
      <View className="p-4 border border-gray-300 rounded-md my-4">
        <Text className="text-2xl my-2  font-semibold uppercase">Name : {user.name}</Text>
        <Text className="text-xl mb-6 ">Email: {user.email}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          authService.logOut();
          router.push('/(auth)/login');
        }}
        className={'absolute bottom-10 left-10 bg-black my-2 border border-gray-300 py-4 px-8 rounded-md w-full flex flex-row items-center justify-center'}
      >
        <Text className="text-white text-center text-2xl font-semibold">Logout</Text>
        <Ionicons name="log-out-outline" className="mx-2" size={24} color={'white'} />
      </TouchableOpacity>
    </View>
  );
}
