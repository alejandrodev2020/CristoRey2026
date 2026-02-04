import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
  Image,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {showMessage} from 'react-native-flash-message';
import {AuthStackParamList} from '../routes/AuthRoutes';
import {authService} from '../services/AuthService';
import authStorageService from '../services/AuthStorageService';
import {useTheme} from '../../../core/themes/useTheme';
import {AppTheme} from '../../../core/themes/colors';
import AppInput from '../../../shared/components/AppInput';
import EyeClose from '../../../../assets/icons/tabler/svg/filled/circle-chevron-left.svg';
import IconUser from '../../../../assets/icons/tabler/svg/outline/user-circle.svg';
import IconPassword from '../../../../assets/icons/tabler/svg/outline/password-user.svg';
import IconClock from '../../../../assets/icons/tabler/svg/outline/lock.svg';
import IconTiktok from '../../../../assets/icons/tabler/svg/outline/brand-tiktok.svg';
import IconWeb from '../../../../assets/icons/tabler/svg/outline/world-www.svg';
import IconFacebook from '../../../../assets/icons/tabler/svg/outline/brand-facebook.svg';
import {PureSvgBackground} from '../../../shared/components/PureSvgBackground';
import AppInputPassword from '../../../shared/components/AppInputPassword';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../../../assets/images/images';

const {width, height} = Dimensions.get('window');

type Props = NativeStackScreenProps<AuthStackParamList, 'Login3'>;

export default function Login3Screen({navigation}: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const isDark = theme.mode === 'dark';
  const iconColor = theme.mode === 'dark' ? '#E5E7EB' : '#374151';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {};
  const handleRecover = () => {};
  const goToTiktok = async () => {
    await Linking.openURL('https://www.tiktok.com/@cl.dental.cristo.rey');
  };

  const goToWeb = async () => {
    await Linking.openURL('https://cdcristorey.com/');
  };

  const goToFacebook = async () => {
    await Linking.openURL('https://www.facebook.com/share/15PLkZgiN3/');
  };

  const handleLogin = async () => {
    if (!username || !password) {
      showMessage({
        message: 'Campos vacíos',
        description: 'Por favor ingresa tus datos',
        type: 'warning',
        backgroundColor: theme.colors.secondary,
        color: '#000',
        position: 'top',
      });
      return;
    }

    try {
      const response = await authService.signIn({
        userName: username,
        userKey: password,
      });
      await authStorageService.setSession(response);

      showMessage({
        message: 'Inicio exitoso',
        description: 'Bienvenido nuevamente',
        type: 'success',
        backgroundColor: theme.colors.primary,
        color: '#fff',
        position: 'bottom',
        duration: 3000,
      });

      const parentNav = navigation.getParent();
      if (parentNav) {
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
        duration: 3000,
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      <PureSvgBackground
        baseColors={isDark ? ['#0B1525', '#040810'] : ['#E6F0FF', '#FFFFFF']}
        waveColors={
          isDark ? ['#3B82F6', 'transparent'] : ['#BFDFFF', 'transparent']
        }
      />

      {/* 2. CONTENIDO DE LA UI (Encima del fondo) */}
      <View style={styles.contentContainer}>
        <View  style={{
    alignItems: 'center',
    justifyContent: 'center',
  }}>

          <Image
                    source={Images.ui.lock_dent}
                    style={{width: 120, height: 120, marginTop: 4}}
                    resizeMode="contain"
                    />
        </View>
        <Text style={styles.title}>Accede a tu cuenta</Text>
        <Text style={styles.subtitle}>Inicia sesión de forma segura</Text>

        <View style={{marginTop: 40}}>
          <AppInput
            icon={IconUser}
            placeholder="Usuario / Documento de identidad"
            value={username}
            onChangeText={setUsername}
          />
          <View style={{height: 1}} />
          <AppInputPassword
            icon={IconPassword}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
          />
          <View style={{height: 16}} />
          <View style={styles.securityRow}>
            <IconClock
              width={16}
              height={16}
              color={
                theme.mode === 'dark'
                  ? 'rgba(115,151,215,0.8)'
                  : 'rgba(96,130,200,0.9)'
              }
            />
            <Text style={styles.securityText}>Tus datos están protegidos</Text>
          </View>
        </View>

        {/* <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar de forma segura</Text>
          </TouchableOpacity> */}
        <TouchableOpacity activeOpacity={0.85} onPress={handleLogin}>
          <LinearGradient
            colors={
              theme.mode === 'dark'
                ? ['#1E3A8A', '#2563EB']
                : ['#3B82F6', '#60A5FA']
            }
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.button}>
            <Text style={styles.buttonText}>Entrar de forma segura</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* PROBLEMAS PARA INGRESAR */}
        <View style={{marginTop: 14, alignItems: 'center'}}>
          <Text style={styles.helpText}>¿Problemas para ingresar?</Text>

          <TouchableOpacity onPress={handleRecover}>
            <Text style={styles.recoverText}>Recuperar acceso</Text>
          </TouchableOpacity>
        </View>

        {/* DIVISOR */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>O continúa con</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* SOCIAL ICONS */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton} onPress={goToTiktok}>
            <IconTiktok width={22} height={22} color={iconColor} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={goToWeb}>
            <IconWeb width={22} height={22} color={iconColor} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={goToFacebook}>
            <IconFacebook width={22} height={22} color={iconColor} />
          </TouchableOpacity>
        </View>

        {/* CREAR CUENTA */}
        <View style={styles.registerRow}>
          <Text style={styles.registerText}>¿No tienes cuenta?</Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerLink}> Crear una</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    contentContainer: {
      flex: 1,
      paddingHorizontal: 30,
      justifyContent: 'center',
    },
    svgContainer: {
      position: 'absolute',
      top: 0,
    },
    title: {
      fontSize: 26,
      fontWeight: '700',
      color: theme.colors.text,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.text + '99',
      textAlign: 'center',
      marginTop: 8,
    },
    button: {
      height: 54,
      borderRadius: 16,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
      shadowColor: theme.colors.primary,
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    securityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 8,
      gap: 6, // si tu RN no soporta gap, abajo te dejo alternativa
    },
    securityText: {
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
      color:
        theme.mode === 'dark'
          ? 'rgba(115,151,215,0.8)'
          : 'rgba(96,130,200,0.9)',
    },

    helpText: {
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
      color: '#9CA3AF',
      marginBottom: 2,
    },

    recoverText: {
      fontFamily: 'Poppins-Medium',
      fontSize: 13,
      color: '#3B82F6',
    },

    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 18,
    },

    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#E5E7EB',
    },

    dividerText: {
      marginHorizontal: 8,
      fontFamily: 'Poppins-Regular',
      fontSize: 11,
      color: '#9CA3AF',
    },

    socialRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 14,
    },

    socialButton: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: theme.mode === 'dark' ? '#1b1831' : '#e0e9f9',
      alignItems: 'center',
      justifyContent: 'center',
    },

    registerRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 18,
    },

    registerText: {
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
      color: '#6B7280',
    },

    registerLink: {
      fontFamily: 'Poppins-Bold',
      fontSize: 14,
      color: '#2563EB',
    },
  });
