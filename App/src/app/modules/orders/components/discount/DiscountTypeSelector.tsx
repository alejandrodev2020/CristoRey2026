import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export type DiscountType = 'PERCENT' | 'FIXED';

interface Props {
  value: DiscountType;
  onChange: (value: DiscountType) => void;
}

const DiscountTypeSelector = ({ value, onChange }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.option,
          value === 'PERCENT' && styles.optionActive,
        ]}
        onPress={() => onChange('PERCENT')}
      >
        <Text
          style={[
            styles.text,
            value === 'PERCENT' && styles.textActive,
          ]}
        >
          %
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          value === 'FIXED' && styles.optionActive,
        ]}
        onPress={() => onChange('FIXED')}
      >
        <Text
          style={[
            styles.text,
            value === 'FIXED' && styles.textActive,
          ]}
        >
          Bs
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DiscountTypeSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  optionActive: {
    backgroundColor: '#325284',
  },
  text: {
    fontWeight: 'bold',
    color: '#555',
  },
  textActive: {
    color: '#fff',
  },
});
