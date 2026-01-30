// src/shared/components/InputNumeric.tsx

import React from 'react';
import { TextInput, StyleSheet, View, TextInputProps, StyleProp, TextStyle } from 'react-native';

interface InputNumericProps extends Omit<TextInputProps, 'value' | 'onChangeText' | 'style'> {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<TextStyle>;
  multiline?: boolean;
}

const InputNumeric: React.FC<InputNumericProps> = ({
  placeholder,
  value,
  onChangeText,
  multiline = false,
  style,
  ...rest
}) => {
  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, ''); // Solo números enteros

    if (typeof onChangeText === 'function') {
      onChangeText(cleaned);
    } else {
      console.warn('onChangeText is not a function');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, multiline && { textAlignVertical: 'top' }, style]}
        placeholder={placeholder}
        placeholderTextColor="#B0B0B0"
        value={value}
        onChangeText={handleChange}
        multiline={multiline}
        underlineColorAndroid="transparent"
        keyboardType="number-pad"
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 16,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    fontSize: 16,
    color: '#000',
    padding: 0,
  },
});

export default InputNumeric;
