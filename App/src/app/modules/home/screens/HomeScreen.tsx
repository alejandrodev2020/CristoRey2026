// HomeScreen.tsx
import React, {useEffect, useRef, useState} from 'react';
import {  View,  StyleSheet,TouchableOpacity,  Text,  Dimensions} from 'react-native';
import TestModal, {TestModalHandle} from '../../sale/components/TestModal';
import BottomBar from '../../../shared/components/BottomBar';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import ChartExample from '../../../shared/components/ChartExample';
import LinearGradient from 'react-native-linear-gradient';
import IconList from '../../../../assets/icons/tabler/svg/outline/align-justified.svg';
import IconUserCircle from '../../../../assets/icons/tabler/svg/outline/user-circle.svg';
import Svg, {Path, Rect} from 'react-native-svg';
import {ProgressChart} from 'react-native-chart-kit';
import authStorageService from '../../auth/services/AuthStorageService';
import {AuthUser} from '../../auth/models/IAuthUser';
import {saleService} from '../../sale/services/SaleService';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
export default function HomeScreen() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRole] = useState<any | null>(null);
  const [listSales, setListSales] = useState<any[]>([]);
  const testModalRef = useRef<TestModalHandle>(null);
  const capitalize = (text?: string) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const navigation = useNavigation();
  const chartConfig = {
    backgroundGradientFrom: '#f4f4f4',
    backgroundGradientTo: '#f4f4f4',
    color: (opacity = 1) => `rgba(10, 20, 40, ${opacity})`,
    strokeWidth: 8,
    barPercentage: 0.1,
    useShadowColorFromDataset: false,
  };

  const data = {
    // labels: ['40%'], // Etiquetas (opcional)
    data: [0.4], // Valores (de 0 a 1)
  };

  useEffect(() => {
    const loadUser = async () => {
      const userData = await authStorageService.getUser();
      const role = await authStorageService.getRole();
      setUser(userData);
      setRole(role);
    };

    loadUser();
  }, []);
  useEffect(() => {
    // const fetchLastDay = async () => {
    //   try {
    //     const data = await saleService.getLastDaySale();
    //     const firstTen = data.slice(0, 10);
    //     setListSales(firstTen);
    //   } catch (err) {
    //     console.error(' Error al cargar última venta', err);
    //   }
    // };

    // fetchLastDay();
  }, []);

  const WaveDivider = () => (
    <Svg
      viewBox="0 0 900 600"
      style={{position: 'absolute', top: screenHeight * 0.13}}
      width="100%"
      height={220}
      preserveAspectRatio="none">
      <Rect x="0" y="0" width="900" height="600" fill="#ffffffff" />
      <Path
        d="M0 93L15 101.2C30 109.3 60 125.7 90 129.8C120 134 150 126 180 139.7C210 153.3 240 188.7 270 194C300 199.3 330 174.7 360 171.5C390 168.3 420 186.7 450 178.3C480 170 510 135 540 129C570 123 600 146 630 153.5C660 161 690 153 720 134.3C750 115.7 780 86.3 810 92C840 97.7 870 138.3 885 158.7L900 179L900 0L885 0C870 0 840 0 810 0C780 0 750 0 720 0C690 0 660 0 630 0C600 0 570 0 540 0C510 0 480 0 450 0C420 0 390 0 360 0C330 0 300 0 270 0C240 0 210 0 180 0C150 0 120 0 90 0C60 0 30 0 15 0L0 0Z"
        fill="#00317aff"
      />
    </Svg>
  );

  return (
    <>
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#325284'}}
        edges={['top', 'left', 'right']}>
        {/* <StatusBar backgroundColor="#325284" barStyle="light-content" /> */}
        <LinearGradient
          colors={['#325284', '#00317aff']}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradientContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <IconList width={30} height={30} color={'#ffffff'} />
            </TouchableOpacity>
            <View style={styles.centerSection}>
              <Text style={styles.header}>
                Bienvenido{' '}
                {user?.firstName ? capitalize(user?.firstName) : 'Invitado'}
              </Text>

              <Text style={{fontSize: 12, color: '#fff'}}>
                {' '}
                {user?.firstName ? capitalize(role?.name) : 'Sin Rol'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => console.log('Perfil')}>
              <IconUserCircle width={30} height={30} color={'#ffffff'} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <WaveDivider />
        <View style={{height: 50}}></View>

        <View
          style={{
            paddingHorizontal: 15,
            height: '100%',
            backgroundColor: '#ffffff',
          }}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: 'Poppins-SemiBold',
              color: '#000',
            }}>
            Inicio
          </Text>
          {/* <ChartExample salesData={listSales} /> */}
          <Text
            style={{
              fontSize: 15,
              paddingVertical: 10,
              fontFamily: 'Poppins-SemiBold',
              color: '#000',
            }}>
            Mis Datos:
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    height: screenHeight * 0.085,
  },

  header: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    marginBottom: 0,
    color: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  centerSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
