import PublicRoutes from './PublicRoutes';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

const Routes = () => {
  return (
    <NavigationContainer independent={true}>
      <PublicRoutes />
    </NavigationContainer>
  );
};

export default Routes;
