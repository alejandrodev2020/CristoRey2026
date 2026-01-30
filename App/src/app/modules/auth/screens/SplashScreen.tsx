import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';

import { showMessage } from 'react-native-flash-message';
import authStorageService from '../services/AuthStorageService';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
   

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
