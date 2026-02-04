import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { AuthStackParamList } from './routes/AuthRoutes';
import { AuthService } from './services/AuthService';
import WelcomeScreen from './screens/WelcomeScreen';
import VinculationScreen from './screens/VinculationScreen';
import Login2 from './screens/Login2Screen';
import LoginScreen from './screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './screens/SplashScreen';
import Login3Screen from './screens/Login3Screen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthModuleNavigator() {
  const [initialRoute, setInitialRoute] = useState<keyof AuthStackParamList | null>(null);

  useEffect(() => {
    const checkVinculacion = async () => {
      try {
        const vinculado = await AsyncStorage.getItem('vinculado');
        setInitialRoute(vinculado === 'true' ? 'Login' : 'Welcome');
      } catch (error) {
        console.error('Error al verificar vinculación:', error);
        setInitialRoute('Welcome');
      }
    };

    checkVinculacion();
  }, []);

  if (!initialRoute) return null; // O puedes mostrar un Splash/Loader mientras carga

  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={SplashScreen} />
      <Stack.Screen name="Login3" component={Login3Screen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Vinculation" component={VinculationScreen} />
    </Stack.Navigator>
  );
}


export {
 AuthService,
  LoginScreen,
};
