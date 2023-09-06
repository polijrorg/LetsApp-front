// import { AuthProvider } from './useAuth';
import { AuthProvider } from './useAuth';
import { theme } from '@styles/default.theme';
import React from 'react';
import { ProfileContextProvider } from 'src/contexts/useProfile';
import { ThemeProvider } from 'styled-components/native';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <AuthProvider>{children}</AuthProvider>
  </ThemeProvider>
);

export default AppProvider;
