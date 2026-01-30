import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import BluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';
import Images from '../../../assets/images/images';
import { imageBase64 } from './image';
import { Buffer } from 'buffer';




export default function BluetoothScreen() {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    return () => {
      // Opcional: desconectar al salir de la pantalla
      if (connectedDevice) {
        connectedDevice.disconnect();
      }
    };
  }, [connectedDevice]);

  // Función para escanear dispositivos emparejados
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

  // Función para conectar a un dispositivo
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
    Alert.alert('No hay dispositivo', 'Por favor, conecta a una impresora primero.');
    return;
  }

  try {
    const lineCount = 1;
    const lineHeight = 40; // más espacio entre líneas por usar fuente más grande
    const margin =120;
    const labelHeight = (lineCount * lineHeight) + margin; // altura total de la etiqueta

    let cpclCommand = `! 0 200 200 ${labelHeight} 1\n`;

    for (let i = 1; i <= lineCount; i++) {
      const yPos = i * lineHeight;
    //   cpclCommand += `TEXT 6 0 20 ${yPos} "Artículo${i}"\n`;
      cpclCommand += `TEXT 4 0 10 ${yPos} "Aquí va tu nuevo texto Camargo"\n`;
    }
    
    cpclCommand += 'SET-TOF\n'; 
    cpclCommand += 'FORM\nPRINT\n';

    console.log('Enviando:', cpclCommand);
    await connectedDevice.write(cpclCommand, 'latin1');
    Alert.alert('Éxito', 'Ticket impreso con 20 artículos.');
  } catch (error) {
    console.error('Error al enviar datos:', error);
    Alert.alert('Error', 'No se pudieron enviar los datos de impresión.');
  }
};



  // Render de cada dispositivo en la lista
  const renderItem = ({ item }: { item: BluetoothDevice }) => (
    <TouchableOpacity onPress={() => connectToDevice(item)} style={{ padding: 15, borderBottomWidth: 1 }}>
      <Text>{item.name || 'Dispositivo sin nombre'}</Text>
      <Text style={{ fontSize: 12, color: 'gray' }}>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Dispositivos Bluetooth</Text>
      <Button title="Escanear dispositivos emparejados" onPress={scanDevices} />
      {isConnecting && <Text style={{ marginTop: 10 }}>Conectando...</Text>}
      {connectedDevice && (
        <View style={{ marginTop: 20 }}>
          <Text>Conectado a: {connectedDevice.name}</Text>
          <Button title="Imprimir texto de prueba" onPress={sendData} />
        </View>
      )}
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={item => item.address}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}
