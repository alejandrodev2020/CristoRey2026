// import React, { useEffect, useState } from 'react';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import SaleListScreen from './sale/screens/SaleListScreen';
// import {DrawerParamList} from './MainRoutes';
// import {HomeScreen} from './home/HomeModule';
// import LogoutScreen from './auth/screens/LogoutScreen';
// import SaleStackNavigator from './sale/routes/SaleStackNavigator';
// import ConfigurationStackNavigator from './configuration/routes/ConfigurationStackNavigator';
// import IconLogout from '../../assets/icons/tabler/svg/outline/logout.svg';
// import IconConfig from '../../assets/icons/tabler/svg/outline/adjustments-alt.svg';
// import IconList from '../../assets/icons/tabler/svg/outline/list-tree.svg';
// import IconHome from '../../assets/icons/tabler/svg/outline/home.svg';
// import { IconTag , IconSale, IconUsers} from '../../assets/icons/tabler/svg/index';

// import {TouchableOpacity} from 'react-native';
// import {useNavigation, DrawerActions} from '@react-navigation/native';

// import SaleStoreIAScreen from './sale/screens/SaleIAStoreScreen';
// import ClientStackNavigator from './clients/routes/ClientStackNavigator';
// import { AppModuleKey } from './auth/models/modules';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AUTH_ROLE_MODULES } from './auth/models/auth-role-modules';
// import { IRole } from './auth/models/IRole';

// const Drawer = createDrawerNavigator<DrawerParamList>();
// export function MainAppNavigator() {
//   const [allowedModules, setAllowedModules] = useState<AppModuleKey[] | null>(null);


//   useEffect(() => {
//     const loadRole = async () => {
//       const roleRaw = await AsyncStorage.getItem('role');
//       if (!roleRaw) return;
//       const role : IRole = JSON.parse(roleRaw); 
//       const modules = AUTH_ROLE_MODULES[role.id];
//       setAllowedModules(modules ?? []);
//     };
//     loadRole();
//   }, []);

//   const navigation = useNavigation();
//   return (
//     <Drawer.Navigator
//       initialRouteName="Home"
//       screenOptions={{headerShown: false}}>
//       <Drawer.Screen
//         name="Home"
//         component={HomeScreen}
//         options={({navigation}) => ({
//           headerShown: false,
//           title: 'Inicio',
//           drawerIcon: ({color, size}) => (
//             <IconConfig width={size} height={size} color={color} />
//           ),
//           headerTransparent: true,
//           headerShadowVisible: false,
//           headerLeft: () => (
//             <TouchableOpacity
//               onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//               style={{marginLeft: 15}}>
//               <IconList color="#cd13139f" />
//             </TouchableOpacity>
//           ),
//         })}
//       />

//       <Drawer.Screen
//         name="SaleList"
//         component={SaleListScreen}
//         options={({navigation}) => ({
//           headerShown: false,
//           title: 'Listado de Ventas',
//           drawerIcon: ({color, size}) => (
//             <IconList width={size} height={size} color={color} />
//           ),
//           headerTransparent: true,
//           headerShadowVisible: false,
//           // headerLeft: () => (
//           //   <TouchableOpacity
//           //     onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//           //     style={{marginLeft: 15}}>
//           //     <IconList color="#8f0000ff" />
//           //   </TouchableOpacity>
//           // ),
//         })}
//       />
//       <Drawer.Screen
//         name="SaleStore"
//         component={SaleStackNavigator}
//         options={({navigation}) => ({
//           headerShown: false,
//           title: 'Levantar Pedido',
//           drawerIcon: ({color, size}) => (
//             <IconSale width={size} height={size} color={color} />
//           ),
//         })}
//       />
//       {/* <Drawer.Screen
//         name="SaleStoreIA"
//         component={SaleStoreIAScreen}
//         options={({navigation}) => ({
//           headerShown: true,
//           title: 'IA',
//           drawerIcon: ({color, size}) => (
//             <IconList width={size} height={size} color={color} />
//           ),
//           headerTransparent: true,
//           headerShadowVisible: false,
//           headerLeft: () => (
//             <TouchableOpacity
//               onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//               style={{marginLeft: 15}}>
//               <IconList color="#8f0000ff" />
//             </TouchableOpacity>
//           ),
//         })}
//       /> */}

//       <Drawer.Screen
//         name="Client"
//         component={ClientStackNavigator}
//         options={({navigation}) => ({
//           headerShown: false,
//           title: 'Clientes',
//           drawerIcon: ({color, size}) => (
//             <IconUsers width={size} height={size} color={color} />
//           ),
//         })}
//       />

//       <Drawer.Screen
//         name="ConfigurationMain"
//         component={ConfigurationStackNavigator}
//         options={({navigation}) => ({
//           headerShown: false,
//           title: 'Configuración',
//           drawerIcon: ({color, size}) => (
//             <IconConfig width={size} height={size} color={color} />
//           ),
//         })}
//       />

//       <Drawer.Screen
//         name="Logout"
//         component={LogoutScreen}
//         options={({navigation}) => ({
//           headerShown: true,
//           title: 'Salir',
//           drawerIcon: ({color, size}) => (
//             <IconLogout width={size} height={size} color={color} />
//           ),
//           headerTransparent: true,
//           headerShadowVisible: false,
//           headerLeft: () => (
//             <TouchableOpacity
//               onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//               style={{marginLeft: 15}}>
//               <IconList color="#8f0000ff" />
//             </TouchableOpacity>
//           ),
//         })}
//       />
//     </Drawer.Navigator>
//   );
// }


// !============================================================================
// import React, { useEffect, useState } from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { TouchableOpacity } from 'react-native';
// import { useNavigation, DrawerActions } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { DrawerParamList } from './MainRoutes';
// import { HomeScreen } from './home/HomeModule';
// import SaleListScreen from './sale/screens/SaleListScreen';
// import SaleStackNavigator from './sale/routes/SaleStackNavigator';
// import ClientStackNavigator from './clients/routes/ClientStackNavigator';
// import ConfigurationStackNavigator from './configuration/routes/ConfigurationStackNavigator';
// import LogoutScreen from './auth/screens/LogoutScreen';

// import IconLogout from '../../assets/icons/tabler/svg/outline/logout.svg';
// import IconConfig from '../../assets/icons/tabler/svg/outline/adjustments-alt.svg';
// import IconList from '../../assets/icons/tabler/svg/outline/list-tree.svg';
// import { IconSale, IconUsers } from '../../assets/icons/tabler/svg/index';

// import { AppModuleKey } from './auth/models/modules';
// import { AUTH_ROLE_MODULES } from './auth/models/auth-role-modules';
// import { IRole } from './auth/models/IRole';
// import OrdersStackNavigator from './orders/routes/OrdersStackNavigator';
// import OrdersListScreen from './orders/screens/OrdersListScreen';

// const Drawer = createDrawerNavigator<DrawerParamList>();

// export function MainAppNavigator() {
  //   const navigation = useNavigation();
  
  //   const [allowedModules, setAllowedModules] = useState<AppModuleKey[] | null>(null);
  
//   useEffect(() => {
  //     const loadRole = async () => {
    //       const roleRaw = await AsyncStorage.getItem('role');
    //       if (!roleRaw) {
      //         setAllowedModules([]);
      //         return;
      //       }
      
      //       const role: IRole = JSON.parse(roleRaw);
      //       const modules = AUTH_ROLE_MODULES[role.id];
      
      //       setAllowedModules(modules ?? []);
      //     };
      
      //     loadRole();
      //   }, []);
      
      //   // ⛔ Evita renderizar el Drawer sin permisos cargados
      //   if (!allowedModules) {
        //     return null; // aquí puedes poner un loader si quieres
        //   }
        
        //   const canView = (module: AppModuleKey) =>
        //     allowedModules.includes(module);
        
        //   return (
          //     <Drawer.Navigator
          //       initialRouteName="Home"
          //       screenOptions={{ headerShown: false }}
          //     >
          //       {canView('HOME') && (
            //         <Drawer.Screen
            //           name="Home"
            //           component={HomeScreen}
            //           options={{
              //             title: 'Inicio',
              //             drawerIcon: ({ color, size }) => (
                //               <IconConfig width={size} height={size} color={color} />
                //             ),
                //             headerLeft: () => (
                  //               <TouchableOpacity
                  //                 onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                  //                 style={{ marginLeft: 15 }}
//               >
//                 <IconList />
//               </TouchableOpacity>
//             ),
//           }}
//         />
//       )}

//       {canView('SALE_LIST') && (
  //         <Drawer.Screen
  //           name="SaleList"
  //           component={SaleListScreen}
  //           options={{
    //             title: 'Listado de Ventas',
    //             drawerIcon: ({ color, size }) => (
      //               <IconList width={size} height={size} color={color} />
      //             ),
      //           }}
      //         />
      //       )}
      
      //       {canView('SALE_STORE') && (
        //         <Drawer.Screen
        //           name="SaleStore"
        //           component={SaleStackNavigator}
        //           options={{
          //             title: 'Vender',
//             drawerIcon: ({ color, size }) => (
//               <IconSale width={size} height={size} color={color} />
//             ),
//           }}
//         />
//       )}

//       {canView('ORDERS_STORE') && (
  //         <Drawer.Screen
  //           name="OrdersStore"
  //           component={OrdersStackNavigator}
  //           options={{
    //             title: 'Levantar Pedido',
    //             drawerIcon: ({ color, size }) => (
      //               <IconSale width={size} height={size} color={color} />
      //             ),
      //           }}
      //         />
      //       )}
      // {/* 
      //       {canView('ORDERS_LIST') && (
        //         <Drawer.Screen
        //           name="OrdersList"
        //           component={OrdersListScreen}
        //           options={{
          //             title: 'Listado de Pedidos',
          //             drawerIcon: ({ color, size }) => (
            //               <IconList width={size} height={size} color={color} />
            //             ),
            //           }}
            //         />
            //       )} */}
            
            
            //       {canView('CLIENT') && (
              //         <Drawer.Screen
              //           name="Client"
              //           component={ClientStackNavigator}
              //           options={{
                //             title: 'Clientes',
                //             drawerIcon: ({ color, size }) => (
                  //               <IconUsers width={size} height={size} color={color} />
                  //             ),
                  //           }}
                  //         />
                  //       )}
                  
                  //       {canView('CONFIGURATION') && (
//         <Drawer.Screen
//           name="ConfigurationMain"
//           component={ConfigurationStackNavigator}
//           options={{
  //             title: 'Configuración',
  //             drawerIcon: ({ color, size }) => (
    //               <IconConfig width={size} height={size} color={color} />
    //             ),
    //           }}
    //         />
    //       )}
    
    //       {canView('LOGOUT') && (
      //         <Drawer.Screen
      //           name="Logout"
      //           component={LogoutScreen}
      //           options={{
        //             title: 'Salir',
        //             drawerIcon: ({ color, size }) => (
          //               <IconLogout width={size} height={size} color={color} />
          //             ),
          //           }}
          //         />
          //       )}
          //     </Drawer.Navigator>
          //   );
          // }
// !============================================================================
import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DrawerParamList } from './MainRoutes';
import { HomeScreen } from './home/HomeModule';

import SaleStackNavigator from './sale/routes/SaleStackNavigator';
import OrdersStackNavigator from './orders/routes/OrdersStackNavigator';
import ClientStackNavigator from './clients/routes/ClientStackNavigator';
import ConfigurationStackNavigator from './configuration/routes/ConfigurationStackNavigator';
import LogoutScreen from './auth/screens/LogoutScreen';

import IconLogout from '../../assets/icons/tabler/svg/outline/logout.svg';
import IconConfig from '../../assets/icons/tabler/svg/outline/adjustments-alt.svg';
import IconList from '../../assets/icons/tabler/svg/outline/list-tree.svg';
import { IconSale, IconUsers } from '../../assets/icons/tabler/svg/index';

import { AppModuleKey } from './auth/models/modules';
import { AUTH_ROLE_MODULES } from './auth/models/auth-role-modules';
import { IRole } from './auth/models/IRole';

const Drawer = createDrawerNavigator<DrawerParamList>();

export function MainAppNavigator() {
  const navigation = useNavigation();

  const [allowedModules, setAllowedModules] = useState<AppModuleKey[] | null>(null);

  useEffect(() => {
    const loadRole = async () => {
      const roleRaw = await AsyncStorage.getItem('role');
      if (!roleRaw) {
        setAllowedModules([]);
        return;
      }

      const role: IRole = JSON.parse(roleRaw);
      const modules = AUTH_ROLE_MODULES[role.id];
      setAllowedModules(modules ?? []);
    };

    loadRole();
  }, []);

  if (!allowedModules) {
    return null;
  }

  const canView = (module: AppModuleKey) =>
    allowedModules.includes(module);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      {/* HOME */}
      {canView('HOME') && (
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Inicio',
            drawerIcon: ({ color, size }) => (
              <IconConfig width={size} height={size} color={color} />
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                style={{ marginLeft: 15 }}
              >
                <IconList />
              </TouchableOpacity>
            ),
          }}
        />
      )}

      {/* VENTAS → VENDER (entrada directa) */}
      {canView('SALE_STORE') && (
        <Drawer.Screen
          name="SaleStore"
          component={SaleStackNavigator}
          initialParams={{ entry: 'STORE' }}
          options={{
            title: 'Vender',
            drawerIcon: ({ color, size }) => (
              <IconSale width={size} height={size} color={color} />
            ),
          }}
        />
      )}

      {/* VENTAS → LISTADO (entrada directa) */}
      {canView('SALE_LIST') && (
        <Drawer.Screen
          name="SaleList"
          component={SaleStackNavigator}
          initialParams={{ entry: 'LIST' }}
          options={{
            title: 'Listado de Ventas',
            drawerIcon: ({ color, size }) => (
              <IconList width={size} height={size} color={color} />
            ),
          }}
        />
      )}

      {/* VENTAS → VENDER CON IA (entrada directa) */}
      {canView('SALE_STORE_IA') && (
        <Drawer.Screen
          name="SaleStoreIA"
          component={SaleStackNavigator}
          initialParams={{ entry: 'IA' }}
          options={{
            title: 'Vender con IA',
            drawerIcon: ({ color, size }) => (
              <IconSale width={size} height={size} color={color} /> 
            ),
          }}
        />
      )}

      {/* PEDIDOS */}
      {canView('ORDERS_STORE') && (
        <Drawer.Screen
          name="OrdersStore"
          component={OrdersStackNavigator}
          initialParams={{ entry: 'STORE' }}
          options={{
            title: 'Levantar Pedido',
            drawerIcon: ({ color, size }) => (
              <IconSale width={size} height={size} color={color} />
            ),
          }}
        />
      )}

      {/* CLIENTES */}
      {canView('CLIENT') && (
        <Drawer.Screen
          name="Client"
          component={ClientStackNavigator}
          options={{
            title: 'Clientes',
            drawerIcon: ({ color, size }) => (
              <IconUsers width={size} height={size} color={color} />
            ),
          }}
        />
      )}

      {/* CONFIGURACIÓN */}
      {canView('CONFIGURATION') && (
        <Drawer.Screen
          name="ConfigurationMain"
          component={ConfigurationStackNavigator}
          options={{
            title: 'Configuración',
            drawerIcon: ({ color, size }) => (
              <IconConfig width={size} height={size} color={color} />
            ),
          }}
        />
      )}

      {/* LOGOUT */}
      {canView('LOGOUT') && (
        <Drawer.Screen
          name="Logout"
          component={LogoutScreen}
          options={{
            title: 'Salir',
            drawerIcon: ({ color, size }) => (
              <IconLogout width={size} height={size} color={color} />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
}
