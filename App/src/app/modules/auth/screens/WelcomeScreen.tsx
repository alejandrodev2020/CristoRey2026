import React, {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Easing, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../routes/AuthRoutes';
import Images from '../../../../assets/images/images';
import {useTheme} from '../../../core/themes/useTheme';
import stylesWelcome from './WelcomeScreenStyle';
import {environment} from '../../../../environments/enviroments';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export default function WelcomeScreen({navigation}: Props) {
  const theme = useTheme();
  const [selected, setSelected] = useState<'Iniciar Sessión' | 'Vincular'>(
    'Iniciar Sessión',
  );
  const [indicatorPosition] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));

  const styles = stylesWelcome(theme);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSelect = (option: 'Iniciar Sessión' | 'Vincular') => {
    setSelected(option);
    const toValue = option === 'Iniciar Sessión' ? 0 : 1;

    Animated.timing(indicatorPosition, {
      toValue,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease),
    }).start(() => {
      setTimeout(() => {
        if (option === 'Iniciar Sessión') {
          navigation.navigate('Login');
        } else {
          navigation.navigate('Vinculation'); // Asegúrate de que esta ruta exista
        }
      }, 50);
    });
  };

  const translateX = indicatorPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 176],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {backgroundColor: theme.colors.background, opacity: fadeAnim},
      ]}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LinearGradient colors={theme.colors.gradient} style={styles.topSection}>
        <Image
          source={Images.bacground.welcomeSplash}
          style={styles.illustration}
          resizeMode="contain"
        />
      </LinearGradient>

      <View style={styles.bottomSection}>
        <Text style={styles.title}>
          Bienvenido a{'\n'}
          <Text style={styles.brand}>{environment.nameStore}</Text>
        </Text>

        <Text style={styles.subtitle}>
          Estás en la sección para vincular la aplicación con tu entorno de trabajo, asegurando que toda la información esté correctamente conectada.
¡Gracias por confiar en nosotros y permitirnos ser parte del crecimiento de tu negocio!
        </Text>

        <View style={styles.container2}>
          <Animated.View
            style={[styles.animatedIndicator, {transform: [{translateX}]}]}
          />

          <TouchableOpacity
            style={styles.option}
            onPress={() => handleSelect('Iniciar Sessión')}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.optionText,
                selected === 'Iniciar Sessión' && styles.selectedText,
              ]}>
              Iniciar Sessión
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => handleSelect('Vincular')}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.optionText,
                selected === 'Vincular' && styles.selectedText,
              ]}>
              Vincular
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
