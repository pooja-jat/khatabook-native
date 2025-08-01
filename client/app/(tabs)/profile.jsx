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
        <Text className="text-xl my-2">Name : {user.name}</Text>
        <Text>Email: {user.email}</Text>
        <TouchableOpacity
          onPress={() => {
            authService.logOut();
            router.push('/(auth)/login');
          }}
          className=" absolute bottom-10 left-10 bg-black border border border-gray-300 py-4 px-4 rounded-md  w-full flex  flex-row items-center justify-center "
        >
          <Text className="text-white text-center text-2xl font-semibold">Logout</Text>
          <Ionicons name="log-out-outline" className="mx-2" size={25} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
