import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import Images from '../../../../assets/images/images';
import EyeClose from '../../../../assets/icons/tabler/svg/filled/circle-chevron-left.svg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../routes/AuthRoutes';
import InputPassword from '../../../shared/components/InputPassword';
import InputText from '../../../shared/components/InputText';
import {useTheme} from '../../../core/themes/useTheme';
import stylesLogin2 from './Login2ScreenStyle';
import { showMessage } from 'react-native-flash-message';
import {StackActions} from '@react-navigation/native';
import { authService } from '../services/AuthService';
import authStorageService from '../services/AuthStorageService';

const {height, width} = Dimensions.get('window');
type Props = NativeStackScreenProps<AuthStackParamList, 'Login2'>;
const Login2 = ({navigation}: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const styles = stylesLogin2(theme);
  const inputPlaceholderColor = '#999999';
  const primaryColor = '#2778cfff';
  const handleLogin = async () => {
    if (!username || !password) {
      showMessage({
        message: 'Campos vacíos',
        description: 'Por favor ingresa tu correo y contraseña',
        type: 'warning',
        backgroundColor: theme.colors.secondary,
        color: '#000',
        position: 'top',
        style: {
          marginHorizontal: 16,
          marginTop: 50,
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 16,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        titleStyle: {
          fontWeight: 'bold',
          fontSize: 16,
        },
        textStyle: {
          fontSize: 14,
        },
      });
      return;
    }

    try {
      const response = await authService.signIn({
        userName: username,
        userKey: password,
      });

      await authStorageService.setSession(response);

      const parentNav = navigation.getParent();
      if (parentNav) {
        showMessage({
          message: 'Inicio Exitoso!',
          description: 'Bienvenido nuevamente', // opcional
          type: 'success',
          backgroundColor: primaryColor,
          color: '#fff',
          icon: 'auto',
          duration: 3000,
          position: 'bottom',
          style: {
            marginHorizontal: 16,
            marginTop: 50,
            borderRadius: 12,
            paddingVertical: 12,
            paddingHorizontal: 16,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 4,
          },
          titleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
          },
          textStyle: {
            fontSize: 14,
          },
        });

        parentNav.dispatch(StackActions.replace('MainApp'));
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ?? 'Ocurrió un error inesperado';

      showMessage({
        message: 'Error de inicio de sesión',
        description: message,
        type: 'danger',
        backgroundColor: '#D32F2F',
        color: '#fff',
        icon: 'auto',
        duration: 3000,
      });

      console.error('Error en login:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.topBackground}>
        <Image
          source={Images.bacground.welcome}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        {/* <View style={styles.gradientOverlay} /> */}
      </View>
      <StatusBar backgroundColor={'#23305F'} barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <EyeClose width={50} height={50} color={'#fff'} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <Text style={styles.headerText}>¿No tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.getStartedButton}>Regístrate</Text>
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
                width: width,
                borderTopRightRadius: 20,
                zIndex: 10,
              }}>
              {/* <Text style={styles.title}>Iniciar Sesión</Text> */}
              <View style={{height:6, backgroundColor:'rgba(160, 160, 160, 0.5)', margin:15, borderRadius:30, width:100, alignSelf:'center'}}></View>
              <Text style={styles.welcomeTitle}>¡Bienvenido de nuevo!</Text>
              <Text style={styles.subtitle}>
                Introduce tus datos a continuación
              </Text>

              <InputText
                placeholder="Usuario..."
                value={username}
                onChangeText={setUsername}
                multiline={false}
                keyboardType="email-address"
                style={styles.input}
                placeholderTextColor={inputPlaceholderColor}
              />

              <View style={{height: 12}} />

              <InputPassword
                placeholder="Contraseña.."
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                onlyNumeric={true}
                placeholderTextColor={inputPlaceholderColor}
              />

              <View style={{height: 12}} />

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}>
                <View style={styles.loginButtonGradient}>
                  <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                </View>
              </TouchableOpacity>

              <View style={{height: 20}} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login2;
