import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../core/themes/useTheme';
import { AppTheme } from '../../../core/themes/colors';

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: any;
  rightIcon?: React.ReactNode;
};

export default function ThemedTextInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  rightIcon,
}: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [hidden, setHidden] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text + '99'}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={hidden}
        keyboardType={keyboardType}
      />

      {secureTextEntry && (
        <TouchableOpacity onPress={() => setHidden(!hidden)}>
          {rightIcon}
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
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.card.border,
      paddingHorizontal: 14,
      height: 48,
      backgroundColor: 'rgba(255,255,255,0.06)',
    },
    input: {
      flex: 1,
      color: theme.colors.text,
      fontSize: 14,
    },
  });
