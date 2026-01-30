import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions, FlatList, StatusBar, KeyboardAvoidingView, Platform, Image } from 'react-native';
import BluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../core/themes/useTheme';
import Svg, { Path } from 'react-native-svg';
import Images from '../../../../assets/images/images';
import EyeClose from '../../../../assets/icons/tabler/svg/filled/circle-chevron-left.svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ConfigurationStackParamList } from '../routes/ConfigurationStackRoutes';
import { imageTest } from '../../../../assets/images/pcx/image';
import { useBluetoothPrinter } from '../../../shared/hooks/BluetoothPrinterContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const imageWidth = 520;

type Props = NativeStackScreenProps<
  ConfigurationStackParamList,
  'VinculationPrinterZebra'
>;

const WaveDivider = () => (
  <Svg
    height={100}
    width="100%"
    viewBox="0 0 1440 320"
    style={{ position: 'absolute', top: screenHeight * 0.35 }}>
    <Path
      fill="#ffffffff"
      d="M0,192L80,165.3C160,139,320,85,480,106.7C640,128,800,224,960,240C1120,256,1280,192,1360,160L1440,128V320H0Z"
    />
  </Svg>
);

export default function VinculationPrinterZebra({ navigation }: Props) {
  const theme = useTheme();
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  // const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const { connectedDevice, setConnectedDevice } = useBluetoothPrinter();

  useEffect(() => {
    return () => {
      if (connectedDevice) {
        connectedDevice.disconnect();
      }
    };
  }, [connectedDevice]);

  const scanDevices = async () => {
    try {
      const paired = await BluetoothClassic.getBondedDevices();
      setDevices(paired);
    } catch (error) {
      console.error('Error al obtener dispositivos emparejados:', error);
      Alert.alert(
        'Error',
        'No se pudieron obtener los dispositivos emparejados. Asegúrate de que el Bluetooth esté encendido y tengas los permisos.'
      );
    }
  };

  const connectToDevice = async (device: BluetoothDevice) => {
    setIsConnecting(true);
    try {
      await device.connect();
      setConnectedDevice(device);
      Alert.alert('Conectado', `Conectado a ${device.name}`);
    } catch (error) {
      console.error('Error al conectar:', error);
      Alert.alert('Error de conexión', 'No se pudo conectar al dispositivo. Inténtalo de nuevo.');
    } finally {
      setIsConnecting(false);
    }
  };

  const sendData = async () => {
    if (!connectedDevice) {
      Alert.alert('No hay dispositivo', 'Por favor, conecta una impresora primero.');
      return;
    }

    try {
      const lineCount = 2;
      const lineHeight = 40;
      const margin = 120;
      const labelHeight = (lineCount * lineHeight) + margin;

      let cpclCommand = `! 0 200 200 ${labelHeight} 1\n`;

      for (let i = 1; i <= lineCount; i++) {
        const yPos = i * lineHeight;
        cpclCommand += `TEXT 4 0 10 ${yPos} "Aquí va tu nuevo texto Camargo"\n`;
      }

      cpclCommand += 'SET-TOF\nFORM\nPRINT\n';

      console.log('Enviando:', cpclCommand);
      await connectedDevice.write(cpclCommand, 'latin1');

      Alert.alert('Éxito', 'Texto de prueba enviado a la impresora.');
    } catch (error) {
      console.error('Error al enviar datos:', error);
      Alert.alert('Error', 'No se pudieron enviar los datos de impresión.');
    }
  };



const sendDataImagenNew = async () => {
  if (!connectedDevice) {
    Alert.alert('No hay dispositivo', 'Por favor, conecta una impresora primero.');
    return;
  }

  try {
const cpclCommand = `! 0 200 200 400 1\n` +
  // Cuadrado 1 (arriba izquierda)
  `LINE 30 40 110 40 2\n` +
  `LINE 30 40 30 120 2\n` +
  `LINE 110 40 110 120 2\n` +
  `LINE 30 120 110 120 2\n` +

  // Cuadrado 2 (arriba derecha)
  `LINE 130 40 210 40 2\n` +
  `LINE 130 40 130 120 2\n` +
  `LINE 210 40 210 120 2\n` +
  `LINE 130 120 210 120 2\n` +

  // Cuadrado 3 (abajo izquierda)
  `LINE 30 140 110 140 2\n` +
  `LINE 30 140 30 220 2\n` +
  `LINE 110 140 110 220 2\n` +
  `LINE 30 220 110 220 2\n` +

  // Cuadrado 4 (abajo derecha)
  `LINE 130 140 210 140 2\n` +
  `LINE 130 140 130 220 2\n` +
  `LINE 210 140 210 220 2\n` +
  `LINE 130 220 210 220 2\n` +

  `SET-TOF\nFORM\nPRINT\n`;
const simpleCpclCommand = 
  "! 0 200 200 200 1\n" +  // encabezado: dpi 200x200, altura 200 dots (1 pulgada aprox)
  "PW 576\n" +            // ancho 7.2 cm (576 dots)
  "TEXT 0 3 100 100 Hola Mundo!\n" +  // Fuente 3, posición (100,100)
  "SET-TOF\n" +
  "FORM\n" +
  "PRINT\n";

    await connectedDevice.write(imageTest, 'latin1');
    Alert.alert('Éxito', 'Imagen enviada a la impresora.');
  } catch (error) {
    console.error('Error al enviar datos:', error);
    Alert.alert('Error', 'No se pudieron enviar los datos de impresión.');
  }
};

  const sendImage = async () => {
  if (!connectedDevice) {
    Alert.alert('No hay dispositivo', 'Por favor, conecta una impresora primero.');
    return;
  }

  try {
    // Dimensiones de la imagen
    const widthPx = 203;   // ancho en píxeles
    const heightPx = 276;  // alto en píxeles
    const widthBytes = 26; // ancho en bytes (203/8 redondeado)

    // HEX generado de la imagen termica-bg.png
    const hexData =
      "ffffffffffffffffffffffffffffffffffffffffffffffffffe0ffffffffffffffffffffffffffffffffffffffffffffffffffe0ffffffffffffffffffffffffffffffffffffffffffffffffffe0ffffffffffffffffffffffffffffffffffffffffffffffffffe0ffffffffffffffffffffffffffffffffffffffffffffffffffe0ffffffffffffffffffffffffffffffffffffffffffffffffffe0ffffffffffffffffffffffffffffffffffffffffffffffffffe0ffffffffffffffb6db6db6eedbbb6db6eeeeddffffffffffffe0fffffffffffffeffffffffffffffffff..."
      // ⚠️ Aquí sigue hasta completar los 14 352 caracteres

    // Comando CPCL
    let cpclCommand = `! 0 200 200 ${heightPx + 50} 1\n`;
    cpclCommand += `EG ${widthBytes} ${heightPx} 0 0 ${hexData}\n`;
    cpclCommand += "FORM\nPRINT\n";

    console.log("Enviando imagen a la impresora...");

    await connectedDevice.write(cpclCommand, "latin1");

    Alert.alert("Éxito", "Imagen enviada a la impresora.");
  } catch (error) {
    console.error("Error al enviar imagen:", error);
    Alert.alert("Error", "No se pudo enviar la imagen de impresión.");
  }
};

  const sendData2 = async () => {
    if (!connectedDevice) {
      Alert.alert(
        'No hay dispositivo',
        'Por favor, conecta una impresora primero.',
      );
      return;
    }

    try {
      // Comando ZPL básico para imprimir texto en la posición (50, 50)
const zplCommand = `^XA
^LT0
^LS0
^LL406
^FO50,50
^A0N,60,60
^FDPRUEBA ZPL^FS
^XZ`;


      console.log('Enviando ZPL:', zplCommand);

      // Enviamos el comando como texto
      await connectedDevice.write(zplCommand, 'latin1');

      Alert.alert(
        'Enviado',
        'Se envió comando ZPL a la impresora. Revisa si imprimió correctamente.',
      );
    } catch (error) {
      console.error('Error al enviar ZPL:', error);
      Alert.alert('Error', 'No se pudo enviar el comando ZPL.');
    }
  };

  const renderItem = ({ item }: { item: BluetoothDevice }) => (
    <TouchableOpacity
      onPress={() => connectToDevice(item)}
      style={styles.deviceItem}
    >
      <Text style={styles.deviceName}>{item.name || 'Dispositivo sin nombre'}</Text>
      <Text style={styles.deviceAddress}>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar backgroundColor={'#325284'} barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}>

        {/* Imagen de fondo */}
        <Image
          source={Images.bacground.configuration}
          style={styles.backgroundImage}
          resizeMode="cover"
        />

        {/* Ola */}
        <WaveDivider />

        {/* Encabezado */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EyeClose width={50} height={50} color={'#325284'} />
          </TouchableOpacity>
          <Text style={styles.headerText}>VINCULAR IMPRESORA</Text>
        </View>

        {/* Contenido */}
        <View style={styles.content}>
          <TouchableOpacity style={styles.scanButton} onPress={scanDevices}>
            <Text style={styles.scanButtonText}>Escanear dispositivos emparejados</Text>
          </TouchableOpacity>

          {isConnecting && <Text style={styles.statusText}>Conectando...</Text>}

          {connectedDevice && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.connectedText}>Conectado a: {connectedDevice.name}</Text>
              <TouchableOpacity style={styles.printButton} onPress={sendDataImagenNew}>
                <Text style={styles.printButtonText}>Imprimir texto de prueba</Text>
              </TouchableOpacity>
            </View>
          )}

          <FlatList
            data={devices}
            renderItem={renderItem}
            keyExtractor={(item) => item.address}
            style={{ marginTop: 20 }}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  header: {
    position: 'absolute',
    top: screenHeight * 0.44,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#6d6a6aff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    marginTop: screenHeight * 0.52,
    paddingHorizontal: 24,
  },
  scanButton: {
    backgroundColor: '#325284',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  scanButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
  statusText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginBottom: 10,
  },
  connectedText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginBottom: 10,
  },
  printButton: {
    backgroundColor: '#325284',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  printButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
  deviceItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  deviceName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  deviceAddress: {
    fontSize: 12,
    color: 'gray',
    fontFamily: 'Poppins-Regular',
  },
});
