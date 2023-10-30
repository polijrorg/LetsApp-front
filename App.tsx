import AppProvider from '@hooks/index';
import Routes from '@routes/index';
import { useFonts } from 'expo-font';
import React from 'react';
import { LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreLogs([
    'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
  ]);

  const [fontsLoaded] = useFonts({
    Roboto: require('./public/fonts/Roboto-Regular.ttf'),
    RobotoBold: require('./public/fonts/Roboto-Bold.ttf'),
    RobotoMedium: require('./public/fonts/Roboto-Medium.ttf'),
    RobotoLight: require('./public/fonts/Roboto-Light.ttf'),
  });

  if (!fontsLoaded) return null;
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}
