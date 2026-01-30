// InputText.tsx
import React from 'react';
import { TextInput, StyleSheet, View, TextInputProps } from 'react-native';

interface InputTextProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
}

const InputText: React.FC<InputTextProps> = ({
  placeholder,
  value,
  onChangeText,
  multiline = false,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, multiline && { textAlignVertical: 'top' }]}
        placeholder={placeholder}
        placeholderTextColor="#B0B0B0"
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        autoCapitalize="characters"   // 👈 CLAVE PARA EVITAR DUPLICADOS
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    borderColor: '#E5E5E5',
    borderRadius: 16,
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  input: {
    fontSize: 16,
    color: '#000',
    padding: 0,
    fontFamily: 'Poppins-Regular',
  },
});

export default InputText;
