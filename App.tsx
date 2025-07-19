if (__DEV__) {
  const devtools = require('react-devtools-core');
  devtools.connectToDevTools({ host: 'localhost', port: 8097 });
}
import AppProvider from '@hooks/index';
import Routes from '@routes/index';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export default function App() {
  LogBox.ignoreLogs([
    'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
  ]);
  useEffect(() => {
    registerForPushNotifications();
  }, []);
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
async function registerForPushNotifications() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Permissão para notificações negada!');
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    console.log('Expo Push Token:', token.data);

    // Aqui você pode enviar o token para o backend:
    // await api.post('/usuarios/token-push', { token: token.data });

  } else {
    alert('Você precisa usar um dispositivo físico para receber notificações');
  }
}