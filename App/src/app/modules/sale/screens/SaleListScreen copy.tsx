// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity ,PermissionsAndroid, Platform} from 'react-native';
// import Voice from '@react-native-voice/voice';
// import { DrawerScreenProps } from '@react-navigation/drawer';
// import { DrawerParamList } from '../../MainRoutes';


// type Props = DrawerScreenProps<DrawerParamList, 'SaleList'>;
// export default function SaleListScreen({ navigation }: Props) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // Estado para reconocimiento de voz
//   const [isRecording, setIsRecording] = useState(false);
//   const [transcript, setTranscript] = useState('');

//   useEffect(() => {
//     Voice.onSpeechResults = onSpeechResultsHandler;
//     Voice.onSpeechError = onSpeechErrorHandler;

//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   const onSpeechResultsHandler = (e: any) => {
//     if (e.value && e.value.length > 0) {
//       setTranscript(e.value[0]);
//     }
//   };

//   const onSpeechErrorHandler = (e: any) => {
//     console.error('Voice recognition error:', e);
//     Alert.alert('Error de voz', 'No se pudo reconocer el habla. Intenta de nuevo.');
//     setIsRecording(false);
//   };

//   async function requestAudioPermission(): Promise<boolean> {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//           {
//             title: 'Permiso para grabar audio',
//             message: 'La app necesita acceso al micrófono para transcribir tu voz.',
//             buttonNeutral: 'Pregúntame después',
//             buttonNegative: 'Cancelar',
//             buttonPositive: 'Aceptar',
//           }
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn('Error al pedir permisos de audio:', err);
//         return false;
//       }
//     }
//     return true; // iOS asume permitido
//   }

//   const startRecording = async () => {
//     const hasPermission = await requestAudioPermission();
//     if (!hasPermission) {
//       Alert.alert('Permiso denegado', 'No podemos acceder al micrófono');
//       return;
//     }

//     try {
//       await Voice.start('es-ES'); // Idioma español
//       setIsRecording(true);
//       setTranscript('');
//     } catch (e) {
//       console.error('Error al iniciar la grabación:', e);
//       Alert.alert('Error', 'No se pudo iniciar la grabación.');
//     }
//   };

//   const stopRecording = async () => {
//     try {
//       await Voice.stop();
//       setIsRecording(false);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const handleLogin = () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Por favor ingresa tu correo y contraseña');
//       return;
//     }
//     console.log('Iniciando sesión con:', email, password);
//     // navigation.navigate('Profile');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>SOY LISTADO DE VENTA1S</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Correo electrónico"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Contraseña"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <Button title="Entrar" onPress={handleLogin} />

//       {/* Texto donde aparece la transcripción */}
//       <TextInput
//         style={[styles.input, { height: 100, marginTop: 32 }]}
//         placeholder="Transcripción aparecerá aquí"
//         value={transcript}
//         multiline
//         editable={false}
//       />

//       {/* Botón micrófono */}
//       <TouchableOpacity
//         style={[styles.micButton, isRecording ? styles.micRecording : null]}
//         onPressIn={startRecording}
//         onPressOut={stopRecording}
//       >
//         <Text style={styles.micText}>{isRecording ? 'Grabando...' : 'Presiona para hablar'}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 24,
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 32,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color:'red'
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 12,
//     marginBottom: 16,
//     borderRadius: 8,
//     color:'orange'
//   },
//   micButton: {
//     marginTop: 20,
//     backgroundColor: '#4285F4',
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   micRecording: {
//     backgroundColor: '#EA4335',
//   },
//   micText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });