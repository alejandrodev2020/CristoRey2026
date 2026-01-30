import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, StatusBar, PermissionsAndroid, Platform, Button, ActivityIndicator, Switch } from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerParamList} from '../../MainRoutes';
import IconLeft from '../../../../assets/icons/tabler/svg/filled/circle-chevron-left.svg';
import IconMic from '../../../../assets/icons/tabler/svg/outline/microphone.svg';
import Voice from '@react-native-voice/voice';

import Svg, {Path, Rect} from 'react-native-svg';
import SalePreviewIAScreen from '../components/IA/SalePreviewIAScreen';
import { BASE_IA_RESPONSE } from '../models/baseMockIA';
import { SaleStackParamList } from '../routes/SaleStackRoutes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// type Props = DrawerScreenProps<DrawerParamList, 'SaleStoreIA'>;
type Props = NativeStackScreenProps<SaleStackParamList, 'SaleStoreIA'>;
const {height: screenHeight} = Dimensions.get('window');

export default function SaleStoreIAScreen({navigation}: Props) {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isProduction, setIsProduction] = useState(false);


  // 🔹 Pide permiso de micrófono en Android
  const requestAudioPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Permiso de micrófono',
          message:
            'La app necesita acceder al micrófono para reconocimiento de voz.',
          buttonPositive: 'Aceptar',
          buttonNegative: 'Cancelar',
        },
      );
      console.log('🎧 Permiso micrófono:', granted);
    }
  };

  useEffect(() => {
    // Chequear disponibilidad
    (async () => {
      const available = await Voice.isAvailable();
      console.log('📢 Voice disponible:', available);
    })();

    requestAudioPermission();

    Voice.onSpeechStart = e => {
      console.log('🎙️ onSpeechStart', e);
      setIsRecording(true);
    };

    Voice.onSpeechEnd = e => {
      console.log('🛑 onSpeechEnd', e);
      setIsRecording(false);
    };

    Voice.onSpeechResults = e => {
      console.log('📥 onSpeechResults:', e);
      if (e.value && e.value.length > 0) {
        console.log(e.value);
        setText(e.value[0]);
      }
    };

    Voice.onSpeechPartialResults = e => {
      console.log('⏳ onSpeechPartialResults:', e);
      if (e.value && e.value.length > 0) {
        setText(e.value[0]);
      }
    };

    Voice.onSpeechError = e => {
      console.log('❌ onSpeechError:', e);
      setIsRecording(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecording = async () => {
    try {
      console.log('▶️ START');
      setText('');
      await Voice.start('es'); // prueba también 'es-BO' si tu dispositivo lo soporta
    } catch (e) {
      console.log('Error Start:', e);
    }
  };

  const stopRecording = async () => {
    try {
      console.log('⏹️ STOP');
      await Voice.stop();
    } catch (e) {
      console.log('Error Stop:', e);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const setShowSaleModal = (value: boolean, data: any) => {
    const finalData = data ? {...data} : {...BASE_IA_RESPONSE};
    finalData.isProduction = isProduction;

    setModalVisible(value);
    setModalData(finalData);
  };

  const setShowQuoteModal = (value: boolean, data: any) => {
    const finalData = data ? {...data} : {...BASE_IA_RESPONSE};
    finalData.isProduction = isProduction;

    setModalVisible(value);
    setModalData(finalData);
  };

  const WaveDivider = () => (
    <Svg
      viewBox="0 0 900 600"
      style={{position: 'absolute', top: screenHeight * 0}}
      width="100%"
      height={200}
      preserveAspectRatio="none">
      <Rect x="0" y="0" width="900" height="600" fill="#ffffffff" />
      <Path
        d="M0 93L15 101.2C30 109.3 60 125.7 90 129.8C120 134 150 126 180 139.7C210 153.3 240 188.7 270 194C300 199.3 330 174.7 360 171.5C390 168.3 420 186.7 450 178.3C480 170 510 135 540 129C570 123 600 146 630 153.5C660 161 690 153 720 134.3C750 115.7 780 86.3 810 92C840 97.7 870 138.3 885 158.7L900 179L900 0L885 0C870 0 840 0 810 0C780 0 750 0 720 0C690 0 660 0 630 0C600 0 570 0 540 0C510 0 480 0 450 0C420 0 390 0 360 0C330 0 300 0 270 0C240 0 210 0 180 0C150 0 120 0 90 0C60 0 30 0 15 0L0 0Z"
        fill="#23305F"
      />
    </Svg>
  );

const handleSendPrompt = async () => {
  try {
    if (!text || text.trim() === '') {
      console.log('No hay texto para enviar.');
      return;
    }
    setLoading(true); // ⬅⬅⬅ START LOADING
    const promptEncoded = encodeURIComponent(text.trim());
    const warehouseId = 1;
    const isProduction = false;
    // const url = `https://avicola.takysoft.com/api/ia/promt/actions?Prompt=${promptEncoded}&WarehouseId=${warehouseId}&Production=${isProduction}`;
    const url = `https://avicola.takysoft.com/api/ia/promt/actions?Prompt=${promptEncoded}&WarehouseId=${warehouseId}&Production=${isProduction}`;

    console.log('🔵 Enviando a:', url);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    const actionTypeId = result?.data?.actionTypeId;
    if (actionTypeId === 1) {
      console.log("🟢 ES UNA VENTA");
      setShowSaleModal(true, result);
    } else if (actionTypeId === 2) {
      console.log("🟡 ES UNA COTIZACIÓN");
      setShowQuoteModal(true, result);
    }

    console.log('🟢 Respuesta del servidor:', result);

  } catch (error) {
    console.log('❌ Error enviando prompt:', error);
  } finally {
    setLoading(false); // ⬅⬅⬅ STOP LOADING
  }
};


  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'#23305F'} barStyle="light-content" />

      <WaveDivider />

      <View style={{paddingTop: 80, paddingHorizontal: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconLeft width={45} height={45} color={'#777'} />
        </TouchableOpacity>

        <TextInput
          style={{
            marginTop: 20,
            width: '100%',
            height: 180, // ⬅⬅⬅ Textarea grande
            borderRadius: 12,
            borderWidth: 1.5,
            borderColor: '#ccc',
            paddingHorizontal: 15,
            paddingTop: 15, // ⬅⬅⬅ espacio arriba del texto
            fontSize: 17,
            color: 'black',
            backgroundColor: 'white',
            textAlignVertical: 'top', // ⬅⬅⬅ muy importante para textarea
          }}
          value={text}
          onChangeText={setText}
          placeholder="Habla o escribe aquí..."
          placeholderTextColor="#888"
          multiline={true}
        />

        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: isRecording ? '#e74c3c' : '#3498db',
            width: 70,
            height: 70,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
          onPress={toggleRecording}>
          <IconMic width={32} height={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginTop: 40,
            backgroundColor: '#23305F',
            paddingVertical: 16,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleSendPrompt}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '700'}}>
            Enviar
          </Text>
        </TouchableOpacity>

        {isRecording && (
          <Text style={{marginTop: 20, textAlign: 'center', color: '#666'}}>
            Escuchando...
          </Text>
        )}
      </View>

     
        <View style={{marginHorizontal:20}}>

        <TouchableOpacity
          style={{
            marginTop: 40,
            backgroundColor: '#d3d3d3ff',
            paddingVertical: 16,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setShowSaleModal(true, null)}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '700'}}>
            Probar Modal
          </Text>
        </TouchableOpacity>
       </View>

     <SalePreviewIAScreen 
        visible={modalVisible}
        data={modalData}
        onClose={() => setShowSaleModal(false, null)}
      />


<View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 10,
    marginHorizontal:15
  }}
>


  <Switch
    value={isProduction}
    onValueChange={(value) => setIsProduction(value)}
    thumbColor={isProduction ? "#23305F" : "#ccc"}
    trackColor={{ false: "#999", true: "#23305F" }}
  />
  <Text style={{ marginLeft: 10, fontSize: 16, color: '#333' }}>
    Modo producción
  </Text>
</View>








      {loading && (
  <View style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <View style={{
      width: 120,
      height: 120,
      backgroundColor: '#fff',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      elevation: 10
    }}>
      <ActivityIndicator size="large" color="#23305F" />
      <Text style={{marginTop: 10, fontSize: 16, fontWeight: '600'}}>
        Procesando...
      </Text>
    </View>
  </View>
)}
    </View>
  );
}
