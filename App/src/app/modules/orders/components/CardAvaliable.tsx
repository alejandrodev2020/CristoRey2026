import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import IconCheck from '../../../../assets/icons/tabler/svg/outline/check.svg'; // usa tu ícono correcto

type Props = {
  count: number;
  unitmeasurement?: string;
};

const CardAvaliable = ({count, unitmeasurement}: Props) => {
  return (
    <View style={styles.container}>
      <IconCheck width={25} height={25} style={styles.icon} />
        <Text style={styles.text}>
            Disponible: <Text style={styles.count}>{count}</Text> {unitmeasurement}
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DFF5E2', // verde claro
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    width: '100%',
    height: 40,

    alignSelf: 'flex-start', // ancho automático
  },
  icon: {
    marginRight: 6,
    color: '#0B9E41',
  },
  text: {
    color: '#0B9E41',
    fontSize: 20,
    fontWeight: '600',
  },
  count: {
    fontWeight: '800', // Aplicado solo al número
  },
});

export default CardAvaliable;
