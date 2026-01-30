import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView, // Añadido
  TouchableWithoutFeedback, // Añadido para cerrar teclado al tocar fuera
  Keyboard
} from 'react-native';

export default function BasicKeyboardModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [v1, setV1] = useState('');
  const [v2, setV2] = useState('');
  const [v3, setV3] = useState('');
  const [v4, setV4] = useState('');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          // En Android 'height' suele funcionar mejor dentro de modales
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.overlay}
        >
          <View style={styles.modalContainer}>
            <ScrollView 
              bounces={false} 
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.title}>Modal con ajuste de teclado</Text>

              <TextInput
                placeholder="Input 1"
                style={styles.input}
                value={v1}
                onChangeText={setV1}
              />

              <TextInput
                placeholder="Input 2"
                style={styles.input}
                value={v2}
                onChangeText={setV2}
              />

              <TextInput
                placeholder="Input 3"
                style={styles.input}
                value={v3}
                onChangeText={setV3}
              />

              <TextInput
                placeholder="Input 4 (ajusta el modal)"
                style={styles.input}
                value={v4}
                onChangeText={setV4}
                keyboardType="decimal-pad"
              />

              <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cerrar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%', // Evita que el modal cubra toda la pantalla si no es necesario
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40, // Espacio extra al final para el scroll
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginTop: 15,
    backgroundColor: '#f9f9f9'
  },
  button: {
    backgroundColor: '#325284',
    padding: 14,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
  },
});