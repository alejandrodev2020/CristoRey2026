import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthModuleNavigator } from '../modules/auth/AuthModule';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainAppNavigator } from '../modules/MainAppNavigator';
import FlashMessage from 'react-native-flash-message';
import { BluetoothPrinterProvider } from '../shared/hooks/BluetoothPrinterContext';
const Drawer = createDrawerNavigator();
const RootStack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <>
      <BluetoothPrinterProvider>
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Auth" component={AuthModuleNavigator} />
            <RootStack.Screen name="MainApp" component={MainAppNavigator} />
          </RootStack.Navigator>
        </NavigationContainer>
        <FlashMessage position="bottom" />
      </BluetoothPrinterProvider>
    </>
  );
}