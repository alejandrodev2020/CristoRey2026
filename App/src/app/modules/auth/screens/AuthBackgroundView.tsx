import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../../core/themes/useTheme';
import { AppTheme } from '../../../core/themes/colors';
import Images from '../../../../assets/images/images';

const { height } = Dimensions.get('window');

type Props = {
  children: React.ReactNode;
  showBack?: boolean;
  onBackPress?: () => void;
};

export default function AuthBackgroundView({
  children,
  showBack,
  onBackPress,
}: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <LinearGradient colors={theme.colors.gradient} style={styles.container}>
      {/* IMAGEN SUPERIOR */}
      <View style={styles.topImage}>
        <Image
          source={Images.bacground.welcome}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* CARD */}
      <View style={styles.card}>
        {children}
      </View>

      {showBack && (
        <TouchableOpacity style={styles.back} onPress={onBackPress}>
          {/* aquí tu svg */}
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    topImage: {
      height: height * 0.45,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    card: {
      backgroundColor: theme.colors.card.background,
      marginHorizontal: 16,
      borderRadius: 16,
      padding: 20,
      marginTop: -40,
      borderWidth: theme.colors.card.border ? 1 : 0,
      borderColor: theme.colors.card.border,
    },
    back: {
      position: 'absolute',
      top: 50,
      left: 16,
    },
  });
