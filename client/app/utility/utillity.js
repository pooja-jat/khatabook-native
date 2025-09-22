import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAxiosOption = async () => {
  const userData = await AsyncStorage.getItem('userToken');
  const token = JSON.parse(userData ?? {})?.token;
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return options;
};

export const baseUrl = 'https://khatabook-backend-ke5c.onrender.com/api';
// export const baseUrl = 'http://192.168.9.11:5000/api';

// ;'https://khatabook-backend-ke5c.onrender.com/api'
