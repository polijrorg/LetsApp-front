import PublicRoutes from './PublicRoutes';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ProfileContextProvider } from 'src/contexts/ProfileContext';

const Routes = () => {
  return (
    <NavigationContainer independent={true}>
      <ProfileContextProvider>
        <PublicRoutes />
      </ProfileContextProvider>
    </NavigationContainer>
  );
};

export default Routes;
