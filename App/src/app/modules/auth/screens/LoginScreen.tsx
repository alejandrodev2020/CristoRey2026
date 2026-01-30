import React, {useState, useEffect, useRef} from 'react';
import { 
  View, Text, StatusBar, Platform, TouchableOpacity, Animated,
  Dimensions, Image, TouchableWithoutFeedback, Keyboard, ActivityIndicator 
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackActions} from '@react-navigation/native';
import {AuthStackParamList} from '../routes/AuthRoutes';
import {authService} from '../services/AuthService';
import authStorageService from '../services/AuthStorageService';
import {showMessage} from 'react-native-flash-message';
import {useTheme} from '../../../core/themes/useTheme';
import InputText from '../../../shared/components/InputText';
import InputPassword from '../../../shared/components/InputPassword';
import Images from '../../../../assets/images/images';
import stylesLogin from './LoginScreenStyle';
import {getStatusVinculation} from '../../../shared/hooks/vinculationStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');
type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({navigation}: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const styles = stylesLogin(theme);
  const inputPlaceholderColor = '#999999';
  const primaryColor = '#2778cfff';

  // --- ANIMACIÓN DEL TECLADO ---
  const shiftAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSubscription = Keyboard.addListener(showEvent, (e) => {
      Animated.timing(shiftAnim, {
        // En Android el teclado tapa el botón, así que subimos el modal 
        // la altura del teclado menos un pequeño margen.
        toValue: -e.endCoordinates.height + (Platform.OS === 'android' ? 40 : 20),
        duration: 250,
        useNativeDriver: true,
      }).start();
    });

    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      Animated.timing(shiftAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // --- LÓGICA DE NEGOCIO ---
  const longPressRef = useRef<NodeJS.Timeout | null>(null);

  const deleteSubdomain = async () => {
    await AsyncStorage.removeItem('baseUrl');
    await AsyncStorage.setItem('vinculado', 'false');
    showMessage({
      message: 'Subdominio eliminado',
      description: 'El dispositivo fue desvinculado.',
      type: 'danger',
    });
  };

  const startLongPressTimer = () => {
    longPressRef.current = setTimeout(() => { deleteSubdomain(); }, 40000);
  };

  const cancelLongPressTimer = () => {
    if (longPressRef.current) {
      clearTimeout(longPressRef.current);
      longPressRef.current = null;
    }
  };

  useEffect(() => {
    const verificarVinculacion = async () => {
      const {estado} = await getStatusVinculation();
      if (estado !== 'vinculado') {
        setTimeout(() => { navigation.replace('Vinculation'); }, 2000);
      }
    };
    verificarVinculacion();
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      showMessage({ message: 'Campos vacíos', type: 'warning' });
      return;
    }
    try {
      setLoading(true);
      const response = await authService.signIn({ userName: username, userKey: password });
      await authStorageService.setSession(response);
      const parentNav = navigation.getParent();
      if (parentNav) {
        parentNav.dispatch(StackActions.replace('MainApp'));
      }
    } catch (error: any) {
      showMessage({ message: 'Error', description: error?.response?.data?.message, type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#23305F'} barStyle="light-content" />
      
      {/* Fondo Fijo */}
      <View style={styles.topBackground}>
        <Image
          source={Images.bacground.welcome}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.header}>
        <View style={styles.headerRight}>
          <Text style={styles.headerText}>¿No tienes una cuenta?</Text>
          <TouchableOpacity><Text style={styles.getStartedButton}>Regístrate</Text></TouchableOpacity>
        </View>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* Usamos Animated.View para que el desplazamiento sea suave */}
        <Animated.View 
          style={[
            styles.inner, 
            { transform: [{ translateY: shiftAnim }] }
          ]}
        >
          <View style={styles.bottomModal}>
            <View style={{
                backgroundColor: 'white',
                paddingHorizontal: 15,
                borderTopLeftRadius: 20,
                width: width,
                borderTopRightRadius: 20,
                paddingBottom: 30 // Espacio extra abajo
              }}>
              
              <View style={{
                  height: 6,
                  backgroundColor: 'rgba(160,160,160,0.5)',
                  margin: 15,
                  borderRadius: 30,
                  width: 100,
                  alignSelf: 'center',
                }}
              />

              <Text style={styles.welcomeTitle}>¡Bienvenido de nuevo!</Text>
              <Text style={styles.subtitle}>Introduce tus datos a continuación</Text>
              
              <InputText
                placeholder="Usuario..."
                value={username}
                onChangeText={(text) => setUsername(text.toUpperCase())}
              />

              <View style={{height: 12}} />

              <InputPassword
                placeholder="Contraseña.."
                value={password}
                onChangeText={setPassword}
                onlyNumeric={true}
                placeholderTextColor={inputPlaceholderColor}
              />

              <View style={{height: 12}} />

              <TouchableOpacity
                style={[styles.loginButton, { opacity: loading ? 0.6 : 1 }]}
                disabled={loading}
                onPress={handleLogin}
                onPressIn={startLongPressTimer}
                onPressOut={cancelLongPressTimer}
              >
                <View style={styles.loginButtonGradient}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                  )}
                </View>
              </TouchableOpacity>
            <Text style={{textAlign:'center', marginVertical:10}}>V. 2.1</Text>   
            </View>
            
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}