import { Stack } from "expo-router";
import { Provider } from "react-redux";
import SafeScreen from "./components/SafeScreen";
import store from "./features/store";
import "./global.css";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeScreen>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        ></Stack>
      </SafeScreen>
    </Provider>
  );
}
