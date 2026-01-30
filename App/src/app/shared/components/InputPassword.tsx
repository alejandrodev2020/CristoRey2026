import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import Eye from '../../../assets/icons/tabler/svg/filled/eye.svg';
import EyeClose from '../../../assets/icons/tabler/svg/outline/eye-off.svg';
import { useTheme } from '../../core/themes/useTheme';

interface Props extends Omit<TextInputProps, 'onChangeText' | 'value'> {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: object;
  onlyNumeric?: boolean;
}

const InputPassword: React.FC<Props> = ({
  placeholder,
  value,
  onChangeText,
  style,
  onlyNumeric = false,
  ...rest
}) => {
  const [secure, setSecure] = useState(true);
  const theme = useTheme();

  const handleChange = (text: string) => {
    const cleaned = onlyNumeric ? text.replace(/[^0-9]/g, '') : text;
    onChangeText(cleaned);
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#B0B0B0"
        secureTextEntry={secure}
        value={value}
        onChangeText={handleChange}
        keyboardType={onlyNumeric ? 'number-pad' : 'default'}
        {...rest}
      />

      <TouchableOpacity onPress={() => setSecure(!secure)}>
        {secure ? (
          <EyeClose width={24} height={24} fill={'#919191'} />
        ) : (
          <Eye width={24} height={24} fill={'#919191'} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    borderColor: '#E5E5E5',
    borderRadius: 15,
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 16,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    padding: 0,
    marginRight: 10,
    fontFamily: 'Poppins-Regular',

  },
});

export default InputPassword;
