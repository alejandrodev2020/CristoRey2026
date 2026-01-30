import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { DiscountType } from './DiscountTypeSelector';

interface Props {
  type: DiscountType;
  value: number;
  onTypeChange: (type: DiscountType) => void;
  onValueChange: (value: number) => void;
}

const QUICK_VALUES = [0, 10, 15, 20];

const DiscountSection = ({
  type,
  value,
  onTypeChange,
  onValueChange,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Descuento</Text>

      {/* 🔹 Chips rápidos */}
      <View style={styles.chipsContainer}>
        {QUICK_VALUES.map(v => (
          <TouchableOpacity
            key={v}
            style={[
              styles.chip,
              value === v && styles.chipActive,
            ]}
            onPress={() => {
              onTypeChange('PERCENT');
              onValueChange(v);
            }}
          >
            <Text
              style={[
                styles.chipText,
                value === v && styles.chipTextActive,
              ]}
            >
              {v}%
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[
            styles.chip,
            !QUICK_VALUES.includes(value) && styles.chipActive,
          ]}
          onPress={() => onTypeChange('PERCENT')}
        >
          <Text
            style={[
              styles.chipText,
              !QUICK_VALUES.includes(value) && styles.chipTextActive,
            ]}
          >
            Otro
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 Input */}
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType="numeric"
          value={value.toString()}
          onChangeText={text => {
            const num = Number(text.replace(',', '.'));
            if (!isNaN(num)) onValueChange(num);
          }}
          style={styles.input}
          placeholder="0"
        />
        <Text style={styles.suffix}>%</Text>
      </View>

      <Text style={styles.helper}>
        Aplica un porcentaje al total
      </Text>
    </View>
  );
};

export default DiscountSection;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  chipActive: {
    backgroundColor: '#325284',
  },
  chipText: {
    color: '#555',
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  suffix: {
    fontWeight: 'bold',
    marginLeft: 6,
  },
  helper: {
    marginTop: 6,
    fontSize: 12,
    color: '#777',
  },
});
