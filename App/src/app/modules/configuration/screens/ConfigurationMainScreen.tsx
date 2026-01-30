import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Animated, Platform, KeyboardAvoidingView, Image, Dimensions, FlatList } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../../../core/themes/useTheme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ConfigurationStackParamList} from '../routes/ConfigurationStackRoutes';
import Images from '../../../../assets/images/images';
import Svg, {Path} from 'react-native-svg';
import EyeClose from '../../../../assets/icons/tabler/svg/filled/circle-chevron-left.svg';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const imageWidth = 520;

type Props = NativeStackScreenProps<
  ConfigurationStackParamList,
  'ConfigurationMain'
>;

const actions = [
  {
    id: '1',
    label: 'Permisos Bluetooth',
    bgColor: '#9a9ab3ff',
    onPress: 'RequestPermisionBluetooth',
  },
  {
    id: '2',
    label: 'Permisos Cámara',
    bgColor: '#F1F1F1',
    onPress: 'RequestPermisionCamera',
  },
  {
    id: '3',
    label: 'Permisos Micrófono',
    bgColor: '#FFE3E3',
    onPress: 'RequestPermissionMicrophone',
  },
  {
    id: '4',
    label: 'Vincular Zebra',
    bgColor: '#E3E9FF',
    onPress: 'VinculationPrinterZebra',
  },
];

const WaveDivider = () => (
  <Svg
    height={100}
    width="100%"
    viewBox="0 0 1440 320"
    style={{position: 'absolute', top: screenHeight * 0.35}}>
    <Path
      fill="#ffffffff"
      d="M0,192L80,165.3C160,139,320,85,480,106.7C640,128,800,224,960,240C1120,256,1280,192,1360,160L1440,128V320H0Z"
    />
  </Svg>
);

export default function ConfigurationMainScreen({navigation}: Props) {
  const theme = useTheme();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderCard = ({item}: any) => (
    <TouchableOpacity
      style={[styles.card, {backgroundColor: item.bgColor}]}
      onPress={() => navigation.navigate(item.onPress)}>
      <Text style={styles.cardLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <Animated.View
      style={[
        styles.container,
        {backgroundColor: theme.colors.background, opacity: fadeAnim},
      ]}>
      <StatusBar backgroundColor={'#325284'} barStyle="light-content" />

      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{flex: 1}}>
          <Image
            source={Images.bacground.configuration}
            style={styles.backgroundImage}
            resizeMode="cover"
          />


          <WaveDivider />

          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}>
              <EyeClose width={50} height={50} color={'#325284'} />
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <Text style={styles.headerText}>CONFIGURACIONES</Text>
   
            </View>
          </View>


          <View style={{height: screenHeight * 0.45}} />

          {/* 🔳 Cards Grid */}
          <View style={styles.cardContainer}>
            <FlatList
              data={actions}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              keyExtractor={item => item.id}
              renderItem={renderCard}
              contentContainerStyle={{paddingBottom: 40}}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: (screenWidth - imageWidth) / 1,
    width: imageWidth,
    height: screenHeight * 0.45,
    resizeMode: 'cover',
  },
  cardContainer: {
    paddingHorizontal: 24,
  },
  card: {
    width: (screenWidth - 72) / 2,
    aspectRatio: 1,
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#474545ff',
      fontFamily: 'Poppins-SemiBold',
  },

   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      top:screenHeight * 0.43,
      paddingHorizontal: 20,
      paddingTop: 10,
    },
   headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerText: {
      color: '#6d6a6aff',
      fontSize: 16,
      marginRight: 8,
      fontFamily: 'Poppins-SemiBold',
    },

});
