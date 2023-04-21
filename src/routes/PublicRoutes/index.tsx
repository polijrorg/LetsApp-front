import { ModalCard } from '@components/Modal';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Autentication from '@screens/Autentication';
import InitialData from '@screens/InitialData';
import MainScreen from '@screens/MainScreen';
import Profile from '@screens/Profile';
import ScreenInvite from '@screens/ScreenInvite';
import VerificationCode from '@screens/VerificationCode';
// import Home from '@screens/Home';
import React from 'react';

export type RootStackParamList = {
  Autentication: undefined;
  VerificationCode: undefined;
  InitialData: undefined;
  ModalCard: undefined;
  MainScreen: undefined;
  Profile: undefined;
  ScreenInvite: undefined;
  // Home: undefined;
};
const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export type AppNavigatorRoutesProps =
  BottomTabNavigationProp<RootStackParamList>;

const PublicRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Autentication" component={Autentication} />
      <Screen name="VerificationCode" component={VerificationCode} />
      <Screen name="InitialData" component={InitialData} />
      <Screen name="ModalCard" component={ModalCard} />
      <Screen name="MainScreen" component={MainScreen} />
      <Screen name="Profile" component={Profile} />
      <Screen name="ScreenInvite" component={ScreenInvite} />
      {/* <Screen name="Home" component={Home} /> */}
    </Navigator>
  );
};
export default PublicRoutes;
