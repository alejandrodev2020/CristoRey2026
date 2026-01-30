import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { useTheme } from '../../core/themes/useTheme';

interface ButtonGenericProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  shadow?: boolean; 
}

const ButtonGeneric: React.FC<ButtonGenericProps> = ({
  title,
  onPress,
  style,
  textStyle,
  icon,
  iconPosition,
  shadow
}) => {
  const theme = useTheme();

  return (
  <TouchableOpacity
      style={[
        styles.button,
        shadow && styles.shadow,
        { backgroundColor: theme.colors.button.background },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {icon && iconPosition === 'left' && (
          <View style={styles.icon}>{icon}</View>
        )}

        <Text
          style={[
            styles.text,
            { color: theme.colors.button.color },
            textStyle,
          ]}
        >
          {title}
        </Text>

        {icon && iconPosition === 'right' && (
          <View style={styles.icon}>{icon}</View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 8,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Android
  },
});

export default ButtonGeneric;
