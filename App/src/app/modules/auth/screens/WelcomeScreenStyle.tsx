import {Dimensions, StyleSheet} from 'react-native';
import {AppTheme} from '../../../core/themes/colors';

const {width} = Dimensions.get('window');

const stylesWelcome = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    topSection: {
      flex: 1.2,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      elevation:10
    },
    illustration: {
      width: width * 1.4,
      height: width * 1.4,
    },
    bottomSection: {
      flex: 1,
      padding: 24,
      justifyContent: 'space-around',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#2e2f30ff',
      textAlign: 'left',
      fontFamily: 'Poppins-Regular',
    },
    brand: {
      color: '#0D1B2A', // como "Loobus" rojo
      fontFamily: 'Poppins-SemiBold',
      fontSize:25
    },
    subtitle: {
      fontSize: 14,
      color: '#6e6e6e',
      textAlign: 'left',
      marginTop: 0,
      fontFamily: 'Poppins-Regular',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 24,
      // height:60
    },

    container2: {
      flexDirection: 'row',
      backgroundColor: '#F0F0F0',
      borderRadius: 30,
      padding: 4,
      alignSelf: 'center',
      width: 'auto', // más ancho como en la imagen
      height: 56, // alto generoso
      elevation: 5, // sombra en Android
    },

    option: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 30,
      alignItems: 'center',
      fontFamily: 'Poppins-SemiBold',
    },
    selectedOption: {
      backgroundColor: theme.colors.primary, // azul oscuro
    },
    optionText: {
      fontSize: 16,
      color: '#0B0F4C',
      fontFamily: 'Poppins-SemiBold',
    },
    selectedText: {
      color: '#fff',
    },
    animatedIndicator: {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  width: '50%',
  backgroundColor: theme.colors.primary,
  borderRadius: 30,
},
  });

export default stylesWelcome;
