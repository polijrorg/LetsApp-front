import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import useAuth from '@hooks/useAuth';
import { NavigationContainer } from '@react-navigation/native';
import { createURL } from 'expo-linking';
import React, { useEffect, useState } from 'react';

const prefix = createURL('/lest-app');

const Routes = () => {
  const { user, loading } = useAuth();

  const [route, setRoute] = useState<'public' | 'private'>();

  const routes = {
    private: <PrivateRoutes />,
    public: <PublicRoutes />,
  };

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Autentication: {
          path: 'authentication/:pseudoUserId',
          parse: {
            pseudoUserId: (pseudoUserId: string) => pseudoUserId,
          },
        },
        InitialData: {
          path: 'initialdata',
        },
      },
    },
  };

  useEffect(() => {
    if (!loading) {
      if (user) setRoute('private');
      else setRoute('public');
    }
  }, [loading, user]);

  return (
    <NavigationContainer independent={true} linking={linking}>
      {routes[route]}
    </NavigationContainer>
  );
};

export default Routes;
