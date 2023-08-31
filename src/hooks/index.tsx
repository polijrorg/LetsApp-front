// import { AuthProvider } from './useAuth';
import { theme } from '@styles/default.theme';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => (
  <ThemeProvider theme={theme}>
    {/* <AuthProvider>{children}</AuthProvider> */}
    {children}
  </ThemeProvider>
);

export default AppProvider;
