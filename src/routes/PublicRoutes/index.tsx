import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Autentication from '@screens/Autentication';
import Home from '@screens/Home';
import React from 'react';

export type RootStackParamList = {
  // Autentication: undefined;
  Home: undefined;
};
const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const PublicRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {/* <Screen name="Autentication" component={Autentication} /> */}
      <Screen name="Home" component={Home} />
    </Navigator>
  );
};
export default PublicRoutes;
