import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardTypeOptions,
  TextInputProps,
} from 'react-native';
import { useTheme } from '../../core/themes/useTheme';
import { AppTheme } from '../../core/themes/colors';

import Eye from '../../../assets/icons/tabler/svg/filled/eye.svg';
import EyeClose from '../../../assets/icons/tabler/svg/outline/eye-off.svg';

type InputType = 'string' | 'number' | 'password';

type Props = {
  icon?: React.FC<any>;
  placeholder: string;

  // OJO: si el padre no actualiza esto al escribir, parecerá que "no deja escribir"
  value?: string;

  onChangeText?: (text: string) => void;

  type?: InputType;

  // extras útiles opcionales
  inputProps?: Omit<TextInputProps, 'value' | 'onChangeText' | 'secureTextEntry' | 'keyboardType'>;
};

export default function AppInputPassword({
  icon: Icon,
  placeholder,
  value,
  onChangeText,
  type = 'string',
  inputProps,
}: Props) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  // 1) Estado interno para que SIEMPRE puedas escribir
  const [innerValue, setInnerValue] = useState(value ?? '');

  // 2) Si el padre cambia value, sincronizamos
  useEffect(() => {
    if (typeof value === 'string' && value !== innerValue) {
      setInnerValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // 3) Ojito
  const [secure, setSecure] = useState(type === 'password');

  // Si cambia el type dinámicamente, ajusta secure
  useEffect(() => {
    setSecure(type === 'password');
  }, [type]);

  const keyboardType: KeyboardTypeOptions =
    type === 'number' ? 'number-pad' : 'default';

  const placeholderColor =
    theme.mode === 'dark'
      ? 'rgba(115, 151,215, 0.6)'
      : 'rgba(128,170, 229, 0.45)';

  const iconColor = theme.mode === 'dark' ? '#FFFFFF' : '#919191';

  const handleChange = (text: string) => {
    setInnerValue(text);
    onChangeText?.(text);
  };

  const isPassword = type === 'password';

  return (
    <View style={styles.container}>
      {Icon && (
        <View style={styles.icon}>
          <Icon width={35} height={35} color={placeholderColor} />
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        value={innerValue}
        onChangeText={handleChange}
        keyboardType={keyboardType}
        secureTextEntry={isPassword ? secure : false}
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        // Para password en iOS/Android (no rompe si no aplica)
        textContentType={isPassword ? 'password' : 'none'}
        importantForAutofill={isPassword ? 'yes' : 'auto'}
        {...inputProps}
      />

      {isPassword && (
        <TouchableOpacity
          onPress={() => setSecure(s => !s)}
          style={styles.eyeIcon}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {secure ? (
            <EyeClose width={24} height={24} color={iconColor} stroke={iconColor} fill="none" />
          ) : (
            <Eye width={24} height={24} color={iconColor} fill={iconColor} stroke="none" />
          )}
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
      backgroundColor: theme.mode === 'dark' ? 'rgba(34, 50, 140, 0.06)' : '#FFFFFF',
      borderWidth: 1,
      borderColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.12)' : '#E5E7EB',
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
      // opcional: para que el texto no quede pegado al borde
      minHeight: 40,
    },
    eyeIcon: {
      padding: 6,
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
