import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardTypeOptions,
} from 'react-native';
import { useTheme } from '../../core/themes/useTheme';
import { AppTheme } from '../../core/themes/colors';

type InputType = 'string' | 'number' | 'password';

type Props = {
  icon?: React.FC<any>; // SVG Tabler icon
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: InputType;
};

export default function AppInput({
  icon: Icon,
  placeholder,
  value,
  onChangeText,
  type = 'string',
}: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [secure, setSecure] = useState(type === 'password');

  const keyboardType: KeyboardTypeOptions =
    type === 'number' ? 'number-pad' : 'default';

  return (
    <View style={styles.container}>
      {Icon && (
        <View style={styles.icon}>
          <Icon
            width={35}
            height={35}
            color={
              theme.mode === 'dark'
                 ? 'rgba(115, 151,215, 0.6)'
                 : 'rgba(128,170, 229, 0.45)'
            }
          />
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={
          theme.mode === 'dark'
            ? 'rgba(115, 151,215, 0.6)'
            : 'rgba(128,170, 229, 0.45)'
        }
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        keyboardType={keyboardType}
      />

      {type === 'password' && (
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          {/* <Icon
            width={20}
            height={20}
            color={
              theme.mode === 'dark'
                ? 'rgba(255,255,255,0.7)'
                : 'rgba(0,0,0,0.5)'
            }
          /> */}
        </TouchableOpacity>
      )}
    </View>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 70,
      borderRadius: 14,
      paddingHorizontal: 16,
      marginVertical: 8,

      backgroundColor:
        theme.mode === 'dark'
          ? 'rgba(34, 50, 140, 0.06)'
          : '#FFFFFF',

      borderWidth: 1,
      borderColor:
        theme.mode === 'dark'
          ? 'rgba(255,255,255,0.12)'
          : '#E5E7EB',

      shadowColor: theme.mode === 'dark' ? '#000' : '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: theme.mode === 'dark' ? 0.2 : 0.05,
      shadowRadius: 2,
      elevation: 1,
    },

    icon: {
      marginRight: 12,
    },

    input: {
      flex: 1,
      fontSize: 14,
      fontFamily: 'Poppins-Regular',
      color: theme.colors.text,
      paddingVertical: 0,
    },
  });
