import React, {useEffect, useState, useRef} from 'react';
import { View,  Text, Button, Platform, PermissionsAndroid, StyleSheet, Alert, Modal, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Camera,useCameraDevices, Code, useCodeScanner} from 'react-native-vision-camera';
import {runOnJS} from 'react-native-reanimated';
import IconScan from '../../../../assets/icons/tabler/svg/outline/scan.svg';
import IconClose from '../../../../assets/icons/tabler/svg/outline/x.svg';
import { useTheme } from '../../../core/themes/useTheme';

type BarcodeScannerProps = {
  onCodeScanned: (code: string) => void;
};
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export default function BarcodeScanner({onCodeScanned}: BarcodeScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const translateY = useRef(new Animated.Value(300)).current;

  const theme = useTheme();



const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 999,
    backgroundColor: 'orange',
  },
  floatingButton: {
    position: 'absolute',
    bottom: screenHeight * -0.61,
    left: 40,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#0f397aff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 5,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(46, 46, 46, 0.8)',
  },
  modalContainer: {
    backgroundColor: 'white', // Puede ser blanco o transparente si el fondo de la cámara es negro
    height: '60%', // Aumenta la altura para que la cámara no se vea "apretada"
    width: '100%', // Asegúrate de que el contenedor ocupe todo el ancho
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  camera: {
    flex: 1,
    width: '100%',
    borderRadius: 50,
    // marginTop: 10, // Un poco de margen para que no se pegue al borde superior
    backgroundColor: 'black',
  },
});
















  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');

  //   const codeScanner = useCodeScanner({
  //     codeTypes: ['qr', 'ean-13', 'ean-8', 'upc-a', 'upc-e'],
  //     onCodeScanned: (codes) => {
  //       'worklet';

  //       if (codes.length > 0) {
  //         const firstCodeValue = codes[0].value;
  //         if (firstCodeValue) {
  //           runOnJS(console.log)('Código QR capturado:', firstCodeValue);
  //           runOnJS(setLastScannedCode)(firstCodeValue); // ✅ Guardar el código escaneado
  //           runOnJS(setIsCameraActive)(false); // ✅ Desactivar la cámara
  //         }
  //       }
  //     },
  //   });

  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13', 'ean-8', 'upc-a', 'upc-e', 'code-128', 'code-39'],
    onCodeScanned: codes => {
      'worklet';

      if (codes.length > 0) {
        const firstCodeValue = codes[0].value;
        if (firstCodeValue) {
          runOnJS(console.log)('Código de barras capturado:', firstCodeValue);
          runOnJS(onCodeScanned)(firstCodeValue); // ✅ Envía el código al padre
          runOnJS(setModalVisible)(false); // ✅ Cierra el modal
        }
      }
    },
  });

  const requestCameraPermission = async () => {
    // ... (la misma lógica de permisos que ya tienes)
    let permission;
    if (Platform.OS === 'android') {
      permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Permiso de cámara',
          message:
            'La aplicación necesita acceso a la cámara para escanear códigos',
          buttonPositive: 'OK',
        },
      );
      setHasPermission(permission === PermissionsAndroid.RESULTS.GRANTED);
      if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          'Permiso denegado',
          'No se puede usar la cámara sin permiso.',
        );
      }
    } else {
      permission = await Camera.requestCameraPermission();
      //   setHasPermission(permission === 'authorized');
      //   if (permission !== 'authorized') {
      //     Alert.alert('Permiso denegado', 'No se puede usar la cámara sin permiso.');
      //   }
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const showModal = () => {
    if (hasPermission) {
      setModalVisible(true);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Alert.alert(
        'Permiso de cámara necesario',
        'Por favor, activa los permisos de la cámara en la configuración de tu dispositivo.',
      );
    }
  };

  const hideModal = () => {
    Animated.timing(translateY, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>No se encontró cámara trasera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.floatingButton} onPress={showModal}>
        <IconScan color={'#fff'} />
      </TouchableOpacity>

      <Modal
        style={{backgroundColor: 'red'}}
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={hideModal}
          activeOpacity={1}>
          <Animated.View
            style={[styles.modalContainer, {transform: [{translateY}]}]}>
            <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
               <IconClose color={'#fff'}/>
            </TouchableOpacity>
            <Camera
              style={styles.camera}
              device={device}
              isActive={modalVisible}
              codeScanner={codeScanner}
            />
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
