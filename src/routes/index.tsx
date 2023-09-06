import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import useAuth from '@hooks/useAuth';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

const Routes = () => {
  const { user, loading } = useAuth();

  const [route, setRoute] = useState<'public' | 'private'>();

  const routes = {
    private: <PrivateRoutes />,
    public: <PublicRoutes />,
  };

  useEffect(() => {
    if (!loading) {
      if (user) setRoute('private');
      else setRoute('public');
    }
  }, [loading, user]);

  if (user) {
    console.log('aaaaaaaaaaaaa');
  }

  return (
    <NavigationContainer independent={true}>
      {routes[route]}
    </NavigationContainer>
  );
};

export default Routes;
