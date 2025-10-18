// import { AuthProvider } from './useAuth';
import { AuthProvider } from './useAuth';
import { InviteProvider } from './useInvite';
import { theme } from '@styles/default.theme';
// Remove NativeBaseProvider completely to fix BackHandler issues
// import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => (
  // Completely remove NativeBaseProvider to eliminate BackHandler issues
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <InviteProvider>{children}</InviteProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default AppProvider;
