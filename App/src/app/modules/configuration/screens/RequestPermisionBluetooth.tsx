import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../core/themes/useTheme'; // Ajusta la ruta si es necesario
import Images from '../../../../assets/images/images'; // Asegúrate que este path sea correcto
import Svg, { Path, Rect } from 'react-native-svg';
import EyeClose from '../../../../assets/icons/tabler/svg/filled/circle-chevron-left.svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ConfigurationStackParamList } from '../routes/ConfigurationStackRoutes';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
type Props = NativeStackScreenProps<
  ConfigurationStackParamList,
  'RequestPermisionBluetooth'
>;
export default function RequestPermissionBluetooth({navigation}: Props) {
  const theme = useTheme();
  const [permissionStatus, setPermissionStatus] = useState<string>('Sin solicitar');

  const requestBluetoothPermissions = async () => {
    if (Platform.OS !== 'android') {
      Alert.alert('Plataforma no compatible', 'Esta función solo aplica en Android.');
      return;
    }

    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      const allGranted = Object.values(granted).every(
        (status) => status === PermissionsAndroid.RESULTS.GRANTED
      );

      if (allGranted) {
        setPermissionStatus('Concedidos');
        Alert.alert('Permisos concedidos', 'Ya puedes usar funcionalidades Bluetooth.');
      } else {
        setPermissionStatus('Denegados');
        Alert.alert(
          'Permisos denegados',
          'No se concedieron todos los permisos necesarios para usar Bluetooth.'
        );
      }
    } catch (error) {
      console.error('Error al solicitar permisos:', error);
      Alert.alert('Error', 'Ocurrió un error al solicitar permisos.');
    }
  };

  const WaveDivider = () => (
  <Svg
    viewBox="0 0 900 600"
    style={{position: 'absolute', top: screenHeight * 0.70}}
    width="100%"
    height={200}
    preserveAspectRatio="none"
  >
    <Rect x="0" y="0" width="900" height="600" fill="#ffffffff" />
    <Path
      d="M0 93L15 101.2C30 109.3 60 125.7 90 129.8C120 134 150 126 180 139.7C210 153.3 240 188.7 270 194C300 199.3 330 174.7 360 171.5C390 168.3 420 186.7 450 178.3C480 170 510 135 540 129C570 123 600 146 630 153.5C660 161 690 153 720 134.3C750 115.7 780 86.3 810 92C840 97.7 870 138.3 885 158.7L900 179L900 0L885 0C870 0 840 0 810 0C780 0 750 0 720 0C690 0 660 0 630 0C600 0 570 0 540 0C510 0 480 0 450 0C420 0 390 0 360 0C330 0 300 0 270 0C240 0 210 0 180 0C150 0 120 0 90 0C60 0 30 0 15 0L0 0Z"
      fill="#A1A0A9"
    />
  </Svg>
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <StatusBar backgroundColor={'#23305F'} barStyle="light-content" />

      {/* Imagen de fondo */}
      <Image
        source={Images.bacground.bluetoothThree}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <WaveDivider />

      {/* Contenido encima */}
      <View style={styles.content}>
        <Text style={[styles.title, {color: 'rgba(31, 125, 112, 1)'}]}>
          Solicitar permisos Bluetooth
        </Text>

        <Text style={[styles.status, {color: '#666'}]}>
          Estado de permisos: {permissionStatus}
        </Text>

<View style={styles.row}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <EyeClose width={70} height={70} style={{margin:0}} color={'#325284'} />
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.button, styles.flexButton, { backgroundColor: theme.colors.primary }]}
    onPress={requestBluetoothPermissions}
  >
    <Text style={styles.buttonText}>Solicitar permisos</Text>
  </TouchableOpacity>
</View>


      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: screenHeight * 0.70, // 65% del alto
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end', // Mueve contenido hacia abajo
    paddingHorizontal: 24,
    paddingBottom: 0, // Ajustá este valor según necesites
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 0,
    fontFamily: 'Poppins-SemiBold',
  },
  status: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 14,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
   row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // o 'flex-start' si querés más pegado
    gap: 5
  }, 
  flexButton: {
    flex: 1, // Ocupa todo el espacio restante
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',

  },



});
