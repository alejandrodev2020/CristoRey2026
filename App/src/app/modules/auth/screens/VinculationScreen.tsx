import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Animated,
  TouchableOpacity,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {showMessage} from 'react-native-flash-message';
import {AuthStackParamList} from '../routes/AuthRoutes';
import {useTheme} from '../../../core/themes/useTheme';
import InputText from '../../../shared/components/InputText';
import InputPassword from '../../../shared/components/InputPassword';
import EyeClose from '../../../../assets/icons/tabler/svg/filled/circle-chevron-left.svg';
import Images from '../../../../assets/images/images';
import stylesVinculation from './VinculationScreenStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRScannerInline from '../components/QRScannerInline';
import {decryptQr} from '../functions/AESDecrypt';
import DeviceInfo from 'react-native-device-info';

const {width} = Dimensions.get('window');

type Props = NativeStackScreenProps<AuthStackParamList, 'Vinculation'>;

export default function VinculationScreen({navigation}: Props) {
  const theme = useTheme();
  const styles = stylesVinculation(theme);

  // Form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [imeiCode, setImeiCode] = useState('');
  const [cameraEnabled, setCameraEnabled] = useState(true);

  const brand = DeviceInfo.getBrand(); // Samsung, Xiaomi, Apple...
  const model = DeviceInfo.getModel(); // Galaxy S22, iPhone 12...
  const os = DeviceInfo.getSystemName();

  // Tabs + sliding animations
  const [selectedTab, setSelectedTab] = useState<'Vincular' | 'Escanear QR'>(
    'Vincular',
  );
  const [indicatorPosition] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(0)); // 0 = Vincular, 1 = QR

  // Tamaño 90% del modal → indicador correcto
  const indicatorWidth = (width * 0.9 - 8) / 2;

  const translateX = indicatorPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, indicatorWidth],
  });

  const slideTranslate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -40],
  });

  const fadeForm = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const fadeQR = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // -------------------------
  // Lógica Vincular
  // -------------------------
  const handleLogin = async () => {
    if (!username || !password) {
      showMessage({message: 'Campos vacíos', type: 'warning'});
      return;
    }

    if (password.length < 8) {
      showMessage({message: 'Contraseña inválida', type: 'danger'});
      return;
    }

    if (imeiCode.length < 10) {
      showMessage({message: 'IMEI inválido', type: 'danger'});
      return;
    }

    if (password !== '67394939' && password !== '69482294') {
      showMessage({message: 'Código Taky incorrecto', type: 'danger'});
      return;
    }

    try {
      const baseUrl = `https://${username.toLowerCase()}.takysoft.com/`;
      await AsyncStorage.setItem('baseUrl', baseUrl);
      await AsyncStorage.setItem('vinculado', 'true');

      showMessage({message: 'Vinculado correctamente', type: 'success'});
      setTimeout(() => navigation.replace('Login'), 1000);
    } catch {
      showMessage({message: 'Error al vincular', type: 'danger'});
    }
  };

  // -------------------------
  // Cambiar pestañas con animación
  // -------------------------
  const handleSelectTab = (option: 'Vincular' | 'Escanear QR') => {
    setSelectedTab(option);

    const toValue = option === 'Vincular' ? 0 : 1;

    Animated.timing(indicatorPosition, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(slideAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  const handleScannedQr = async (code: string) => {
    const payload = decryptQr(code);
    if (!payload) {
      showMessage({
        message: 'QR inválido',
        description: 'No se pudo leer el contenido del código.',
        type: 'danger',
      });
      return;
    }

    const now = Math.floor(Date.now() / 1000);
    const delta = now - payload.Timestamp;

    if (delta > 120) {
      showMessage({
        message: 'QR Expirado',
        description: 'Por favor genera un nuevo código QR.',
        type: 'warning',
      });
      return;
    }

    if (!payload.SubDomain || typeof payload.SubDomain !== 'string') {
      showMessage({
        message: 'QR inválido',
        description: 'El QR no contiene un subdominio válido.',
        type: 'danger',
      });
      return;
    }

    const baseUrl = `https://${payload.SubDomain.toLowerCase()}.takysoft.com/`;
    await AsyncStorage.setItem('baseUrl', baseUrl);
    await AsyncStorage.setItem('vinculado', 'true');
    const deviceId = await DeviceInfo.getUniqueId(); // ← AHORA ES STRING REAL
    const brand = await DeviceInfo.getBrand();
    const model = await DeviceInfo.getModel();
    const os = DeviceInfo.getSystemName();
    try {
      const response = await fetch(`${baseUrl}api/company/device`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${payload.token}`,
        },
        body: JSON.stringify({
          deviceId,
          brand,
          model,
          os,
          expired: payload.Timestamp,
        }),
      });

      const text = await response.text();
      let jsonResponse = null;
      try {
        jsonResponse = JSON.parse(text);

      } catch {

      }

      if (!response.ok) {
        console.log('❌ Error detectado desde backend');
        throw new Error(
          'Registro fallido. Backend respondió status ' + response.status,
        );
      }
    } catch (err: any) {
      showMessage({
        message: 'Advertencia',
        description: 'Vinculado, pero no se pudo registrar el dispositivo.',
        type: 'warning',
      });
    }

    showMessage({
      message: 'Vinculado correctamente',
      description: 'QR válido. Conexión establecida.',
      type: 'success',
    });

    // 6️⃣ Navegar a Login
    setTimeout(() => {
      navigation.replace('Login');
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.topBackground}>
        <Image
          source={Images.bacground.vinculation}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>

      <StatusBar backgroundColor={'#23305F'} barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <EyeClose width={50} height={50} color={'#fff'} />
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <Text style={styles.headerText}>¿No tienes empresa?</Text>
          <TouchableOpacity>
            <Text style={styles.getStartedButton}>Contactate</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.bottomModal}>
            <View
              style={{
                backgroundColor: 'white',
                paddingHorizontal: 15,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              {/* ---------------- SLIDER ---------------- */}
              <View style={styles.sliderContainer}>
                <Animated.View
                  style={[styles.sliderIndicator, {transform: [{translateX}]}]}
                />

                <TouchableOpacity
                  style={[styles.sliderOption, {marginHorizontal: 10}]}
                  onPress={() => handleSelectTab('Vincular')}>
                  <Text
                    style={[
                      styles.sliderOptionText,
                      selectedTab === 'Vincular' &&
                        styles.sliderOptionSelectedText,
                    ]}>
                    Vincular
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.sliderOption, {marginHorizontal: 10}]}
                  onPress={() => handleSelectTab('Escanear QR')}>
                  <Text
                    style={[
                      styles.sliderOptionText,
                      selectedTab === 'Escanear QR' &&
                        styles.sliderOptionSelectedText,
                    ]}>
                    Escanear QR
                  </Text>
                </TouchableOpacity>
              </View>

              {/* ------------------ FORMULARIO ------------------ */}
              <Animated.View
                style={{
                  opacity: fadeForm,
                  transform: [{translateY: slideTranslate}],
                  display: selectedTab === 'Vincular' ? 'flex' : 'none',
                }}>
                <Text style={styles.welcomeTitle}>
                  ¡Vinculación con TakySoft!
                </Text>

                <InputText
                  placeholder="Empresa..."
                  value={username}
                  onChangeText={setUsername}
                />

                <View style={{height: 12}} />

                <InputPassword
                  placeholder="Código TakySoft..."
                  value={password}
                  onChangeText={setPassword}
                />

                <View style={{height: 12}} />

                <InputPassword
                  placeholder="Cod IMEI..."
                  value={imeiCode}
                  onChangeText={setImeiCode}
                />

                <View style={{height: 12}} />

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}>
                  <View style={styles.loginButtonGradient}>
                    <Text style={styles.loginButtonText}>Vincular</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>

              {/* ------------------ SECCIÓN QR ------------------ */}
              <Animated.View
                style={{
                  opacity: fadeQR,
                  transform: [{translateY: slideTranslate}],
                  marginTop: 20,
                  display: selectedTab === 'Escanear QR' ? 'flex' : 'none',
                }}>
                <View style={{height: 40}}></View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 16,
                    color: 'black',
                  }}>
                  Escanear Código QR
                </Text>
                <QRScannerInline
                  enabled={cameraEnabled}
                  onQrScanned={code => {
                    setCameraEnabled(false); // ⛔ Detener cámara INMEDIATO
                    handleScannedQr(code);
                  }}
                />
              </Animated.View>

              <View style={{height: 20}} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
