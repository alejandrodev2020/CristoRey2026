import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { DiscountType } from './DiscountTypeSelector';

interface Props {
  type: DiscountType;
  value: number;
  onChange: (value: number) => void;
}

const DiscountValueInput = ({ type, value, onChange }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.prefix}>
        {type === 'PERCENT' ? '%' : 'Bs'}
      </Text>

      <TextInput
        value={value.toString()}
        keyboardType="numeric"
        placeholder="0"
        onChangeText={text => {
          const num = Number(text.replace(',', '.'));
          if (!isNaN(num)) onChange(num);
        }}
        style={styles.input}
      />
    </View>
  );
};

export default DiscountValueInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  prefix: {
    fontWeight: 'bold',
    marginRight: 6,
    color: '#555',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
