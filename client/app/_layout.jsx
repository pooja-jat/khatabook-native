import { Stack } from "expo-router";
import { Provider } from "react-redux";
import SafeScreen from "./components/SafeScreen";
import store from "./features/store";
import "./global.css";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeScreen>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        ></Stack>
        <Toast />
      </SafeScreen>
    </Provider>
  );
}
