import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Autentication from '@screens/Autentication';
import InitialData from '@screens/InitialData';
import VerificationCode from '@screens/VerificationCode';
import React from 'react';

export type RootStackParamList = {
  Autentication: undefined;
  VerificationCode: undefined;
  InitialData: undefined;
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
    </Navigator>
  );
};
export default PublicRoutes;
