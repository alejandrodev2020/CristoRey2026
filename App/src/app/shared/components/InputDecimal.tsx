import React from 'react';
import { TextInput, StyleSheet, View, TextInputProps, StyleProp, TextStyle } from 'react-native';

interface InputDecimalProps extends Omit<TextInputProps, 'value' | 'onChangeText'| 'style'> {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  style?: StyleProp<TextStyle>;
   keyboardType?: TextInputProps['keyboardType'];
}

const InputDecimal: React.FC<InputDecimalProps> = ({
  placeholder,
  value,
  onChangeText,
  multiline = false,
  style,
  keyboardType = 'decimal-pad',
}) => {
  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, '');

    // Solo un punto decimal permitido
    const parts = cleaned.split('.');
    if (parts.length > 2) return;

    if (typeof onChangeText === 'function') {
      onChangeText(cleaned);
    } else {
      console.warn('onChangeText is not a function');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
   
        style={[styles.input, multiline && { textAlignVertical: 'top' }, style ]}
        placeholder={placeholder}
        placeholderTextColor="#B0B0B0"
        value={value}
        onChangeText={handleChange}
        multiline={multiline}
        underlineColorAndroid="transparent"
        keyboardType={keyboardType} 
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

export default InputDecimal;
