// import { AuthProvider } from './useAuth';
import { AuthProvider } from './useAuth';
import { InviteProvider } from './useInvite';
import { theme } from '@styles/default.theme';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { ProfileContextProvider } from 'src/contexts/useProfile';
import { ThemeProvider } from 'styled-components/native';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => (
  <NativeBaseProvider>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <InviteProvider>
          <ProfileContextProvider>{children}</ProfileContextProvider>
        </InviteProvider>
      </AuthProvider>
    </ThemeProvider>
  </NativeBaseProvider>
);

export default AppProvider;
