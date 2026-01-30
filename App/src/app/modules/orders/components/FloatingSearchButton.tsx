import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
  Text,
  Dimensions,
} from 'react-native';
import SearchIcon from '../../../../assets/icons/tabler/svg/outline/search.svg';
import IconClose from '../../../../assets/icons/tabler/svg/outline/x.svg';
import IconMic from '../../../../assets/icons/tabler/svg/outline/microphone.svg';
import IconSend from '../../../../assets/icons/tabler/svg/outline/send.svg';
import Voice from '@react-native-voice/voice';
import {useTheme} from '../../../core/themes/useTheme';

type FloatingSearchButtonProps = {
  onSend: (text: string) => void;
};
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default function FloatingSearchButton({
  onSend,
}: FloatingSearchButtonProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const theme = useTheme();
  const translateY = useRef(new Animated.Value(300)).current;

  const showModal = () => {
    setModalVisible(true);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideModal = () => {
    Animated.timing(translateY, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSearchText('');
    });
  };

  const onSpeechResultsHandler = (e: any) => {
    if (e.value && e.value.length > 0) {
      setTranscript(e.value[0]);
      setSearchText(e.value[0]);
    }
  };

  const onSpeechErrorHandler = (e: any) => {
    console.error('Error de voz:', e);
    setIsRecording(false);
  };

  const startRecording = async () => {
    try {
      setTranscript('');
      setSearchText('');
      await Voice.start('es-ES');
      setIsRecording(true);
    } catch (e) {
      console.error('Error al iniciar la grabación:', e);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (e) {
      console.error('Error al detener la grabación:', e);
    }
  };

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechError = onSpeechErrorHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const handleSend = () => {
    if (searchText.trim() === '') return;
    onSend(searchText.trim().toLowerCase());
    hideModal();
  };

  const clearSearch = () => {
    setSearchText('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.floatingButton} onPress={showModal}>
        <SearchIcon color="white" width={24} height={24} />
      </TouchableOpacity>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={hideModal}
          activeOpacity={1}>
          {/* Aquí está el cambio clave: envolver el Animated.View en un TouchableOpacity */}
          <TouchableOpacity
            style={styles.modalTouchableContainer}
            activeOpacity={1}
            onPress={e => e.stopPropagation()} // Evita que los toques dentro del modal lo cierren
          >
            <Animated.View
              style={[styles.modalContainer, {transform: [{translateY}]}]}>
              <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
                <IconClose color="#555" width={24} height={24} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Buscar por texto o voz</Text>
              <View style={styles.inputRow}>
                <View style={styles.searchContainer}>
                  <View style={styles.searchBar}>
                    <SearchIcon color="#bbb" style={styles.icon} />
                    <TextInput
                      style={styles.input}
                      value={searchText}
                      onChangeText={setSearchText}
                      placeholder="Buscar por nombre.."
                      placeholderTextColor="#bbb"
                    />
                    {searchText.length > 0 && (
                      <TouchableOpacity onPress={clearSearch}>
                        <IconClose color="#bbb" style={styles.icon} />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.micButton, isRecording && styles.micRecording]}
                  onPressIn={startRecording}
                  onPressOut={stopRecording}>
                  <IconMic color="white" width={24} height={24} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.flexButton,
                  {backgroundColor: theme.colors.primary},
                ]}
                onPress={handleSend}>
                <Text style={styles.buttonText}>
                  Enviar{' '}
                  <IconSend
                    color="white"
                    width={20}
                    height={20}
                    style={{marginLeft: 8}}
                  />
                </Text>
              </TouchableOpacity>

              {isRecording && (
                <Text style={styles.recordingText}>Escuchando...</Text>
              )}
            </Animated.View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalTouchableContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  container: {
    position: 'relative',
    zIndex: 999,
  },
  floatingButton: {
    position: 'absolute',
    bottom: screenHeight * -0.61,
    left: '50%',
    transform: [{translateX: -30}],
    width: 70,
    height: 70,
    borderRadius: 40,
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  micButton: {
    backgroundColor: '#3498db',
    width: 60,
    height: 60,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micRecording: {
    backgroundColor: '#e74c3c',
  },
  recordingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#888',
  },
  searchContainer: {
    marginTop: 0,
    paddingHorizontal: 0,
    paddingVertical: 10,
    width: '83%',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF', 
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 15,
    color: 'red',
    elevation: 5,
    width: '100%',
  },
  icon: {
    marginHorizontal: 10,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  flexButton: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
