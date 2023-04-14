import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Countdown from "./screens/Countdown";
import { useFonts } from "expo-font";
import fonts from "./assets/fonts";

const App = () => {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Countdown />
    </SafeAreaProvider>
  );
};

export default App;
