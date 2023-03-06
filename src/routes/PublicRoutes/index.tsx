import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Autentication from '@screens/Autentication';
import VerificationCode from '@screens/VerificationCode';
// import Home from '@screens/Home';
import React from 'react';

export type RootStackParamList = {
  Autentication: undefined;
  VerificationCode: undefined;
  // Home: undefined;
};
const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const PublicRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Autentication" component={Autentication} />
      <Screen name="VerificationCode" component={VerificationCode} />
      {/* <Screen name="Home" component={Home} /> */}
    </Navigator>
  );
};
export default PublicRoutes;
