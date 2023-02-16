import AppProvider from '@hooks/index';
import Routes from '@routes/index';
import React from 'react';

export default function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}
