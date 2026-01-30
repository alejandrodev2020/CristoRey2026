import React from 'react';
import AppNavigator from './src/app/navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './src/app/modules/sale/hooks/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}