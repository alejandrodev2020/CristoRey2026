import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, Platform, Alert } from 'react-native';
import { Camera, useCameraDevices, useCodeScanner } from 'react-native-vision-camera';

type Props = {
  enabled: boolean;
  onQrScanned: (code: string) => void;
};

export default function QRScannerInline({ enabled, onQrScanned }: Props) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back'); // ✅ CORRECTO

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );

      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        setHasPermission(true);
      } else {
        setHasPermission(false);
        Alert.alert('Permiso denegado', 'No se puede usar la cámara sin permiso.');
      }
    } else {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'ean-8', 'code-128'],
    onCodeScanned: codes => {
      'worklet';
      if (codes.length > 0 && codes[0].value) {
        onQrScanned(codes[0].value);
      }
    },
  });

  if (!device) {
    return (
      <View style={{ padding: 20 }}>
        <Text>No se encontró cámara trasera</Text>
      </View>
    );
  }

  if (hasPermission === null) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Solicitando permisos...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={{ padding: 20 }}>
        <Text>No se otorgó permiso para la cámara.</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        width: 220,
        height: 220,
        borderRadius: 16,
        overflow: 'hidden',
        alignSelf: 'center',
        backgroundColor: '#000',
      }}
    >
     <Camera
        style={{ flex: 1 }}
        device={device}
        isActive={enabled}       // ⛔ SOLO ACTIVA SI enabled === true
        codeScanner={enabled ? codeScanner : undefined} // evita lecturas
        />
    </View>
  );
}
