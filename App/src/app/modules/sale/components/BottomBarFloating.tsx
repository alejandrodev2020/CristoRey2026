import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Shopping from '../../../../assets/icons/tabler/svg/filled/shopping-cart.svg'; // Usa tu ícono
import { useNavigation } from '@react-navigation/native';

type Props = {
  count: number;
};

export default function FloatingCartButton({ count }: Props) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('PreviewListProductSelect' as never); // Ajusta el nombre de la ruta si es diferente
  };

  return (
    <TouchableOpacity style={styles.fabContainer} onPress={handlePress}>
      <View style={styles.fab}>
        <Shopping width={28} height={28} fill="#fff" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 35,
    right: 20,
    zIndex: 10,
  },
  fab: {
    backgroundColor: '#F54927', // Color de fondo del botón
    width: 65,
    height: 65,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#cacacaff',
    borderRadius: 10,
    paddingHorizontal: 5,
    minWidth: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
