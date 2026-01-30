import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';

import { showMessage } from 'react-native-flash-message';
import authStorageService from '../services/AuthStorageService';

export default function LogoutScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const logout = async () => {
      await authStorageService.clear();

      showMessage({
        message: 'Sesión cerrada',
        description: 'Has cerrado sesión correctamente',
        type: 'info',
        backgroundColor: '#1976D2',
        color: '#fff',
        icon: 'auto',
        duration: 3000,
      });

      navigation.dispatch(StackActions.replace('Auth'));
    };

    logout();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1976D2" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
