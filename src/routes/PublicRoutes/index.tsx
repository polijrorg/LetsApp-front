import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Autentication from '@screens/Autentication';
import React from 'react';

export type RootStackParamList = {
  Autentication: undefined;
};
const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const PublicRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Autentication" component={Autentication} />
    </Navigator>
  );
};
export default PublicRoutes;
