import {Dimensions, Platform, StyleSheet} from 'react-native';
import {AppTheme} from '../../../core/themes/colors';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const stylesVinculation = (theme: AppTheme) =>
  StyleSheet.create({
   container: {
      flex: 1,
    },
    inner: {
      flexGrow: 1,
      justifyContent: 'flex-end',
    },
    bottomModal: {
      backgroundColor: 'rgba(160, 160, 160, 0.5)',
      width: '90%',
      paddingTop: 10,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignSelf: 'center',
      alignItems: 'center',
      // justifyContent: 'center',
      overflow: 'visible',
    },
    title: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {},
    loginButton: {
      borderRadius: 40,
      overflow: 'hidden',
      marginTop: 0,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    loginButtonGradient: {
      paddingVertical: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 40,
      backgroundColor: theme.colors.primary,
    },
    loginButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontFamily: 'Poppins-SemiBold',
    },
    topBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: height * 0.45, // 50% de la pantalla
      zIndex: -1,
    },
    backgroundImage: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 50,
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    headerText: {
      color: '#D1C4E9',
      fontSize: 14,
      marginRight: 8,
    },
    getStartedButton: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: 'bold',
    },
    welcomeTitle: {
      fontFamily: 'Poppins-Bold',
      fontSize: 20,
      color: '#333333',
      textAlign: 'left',
      marginBottom: 8,
      marginTop: 15,
    },
    subtitle: {
      fontSize: 16,
      color: '#666666',
      marginBottom: 32,
      textAlign: 'left',
    },
    smallCard: {
      position: 'absolute',
      top: height * 0.38,
      left: 20,
      right: 20,
      height: height * 0.25,
      borderRadius: 30,
      opacity: 0.8,
      transform: [{translateY: 10}],
      zIndex: 0,
    },
    sliderContainer: {
      flexDirection: 'row',
      backgroundColor: '#F0F0F0',
      borderRadius: 30,
      padding: 4,
      width: '100%',
      height: 52,
      marginTop: 10,
      alignSelf: 'center',
      overflow: 'hidden',
    },

    sliderOption: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
    },

    sliderOptionText: {
      fontSize: 16,
      color: '#0B0F4C',
      fontFamily: 'Poppins-SemiBold',
    },

    sliderOptionSelectedText: {
      color: '#FFFFFF',
    },

    sliderIndicator: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: '50%',
      backgroundColor: theme.colors.primary,
      borderRadius: 30,
    },



  });

export default stylesVinculation;
