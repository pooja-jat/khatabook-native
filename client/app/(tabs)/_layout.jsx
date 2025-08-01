import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        headerTitleStyle: { color: '#2563EB', fontWeight: '600' },
        headerShadowVisible: false,
        tabBarStyle: { backgroundColor: '#ffffff', borderTopWidth: 1, paddingTop: 5, height: 60 + insets.bottom },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'transactions',
          tabBarIcon: ({ color, size }) => <Ionicons name="cash-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          title: 'Record Transaction',
          tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
