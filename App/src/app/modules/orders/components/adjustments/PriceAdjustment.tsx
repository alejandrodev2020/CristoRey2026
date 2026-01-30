import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useTheme } from '../../../../core/themes/useTheme';
import ButtonGeneric from '../../../../shared/components/ButtonGeneric';
import InputDecimal from '../../../../shared/components/InputDecimal';
import { IconMin, IconPlus } from '../../../../../assets/icons/tabler/svg';

// ==============================
// 🔁 Handle expuesto
// ==============================
export type PriceAdjustmentHandle = {
  open: () => void;
  close: () => void;
};

// ==============================
// 🧩 Props
// ==============================
type PriceAdjustmentProps = {
  initialPrice: number;
  onApply: (price: number) => void;
};

// ==============================
// 🧠 Componente
// ==============================
const PriceAdjustment = forwardRef<PriceAdjustmentHandle, PriceAdjustmentProps >(({ initialPrice, onApply }, ref) => {
  const modalRef = useRef<Modalize>(null);
  const theme = useTheme();
  const styles = getStyles(theme);

  const [price, setPrice] = useState<number>(initialPrice);
  const [priceInput, setPriceInput] = useState<string>(
    initialPrice.toString(),
  );

  // ==============================
  // 🔁 open / close
  // ==============================
  useImperativeHandle(ref, () => ({
    open: () => modalRef.current?.open(),
    close: () => modalRef.current?.close(),
  }));

  // ==============================
  // 🔄 sincronizar precio
  // ==============================
  useEffect(() => {
    setPrice(initialPrice);
    setPriceInput(initialPrice.toString());
  }, [initialPrice]);

  // ==============================
  // ➕➖ botones
  // ==============================
  const handlePress = (label: string) => {
    let newValue = price;

    switch (label) {
      case 'DECIMAL_MINUS':
        newValue = Math.max(0, parseFloat((price - 0.1).toFixed(2)));
        break;
      case 'DECIMAL_PLUS':
        newValue = parseFloat((price + 0.1).toFixed(2));
        break;
      case 'FULL_MINUS':
        newValue = Math.max(0, price - 1);
        break;
      case 'FULL_PLUS':
        newValue = price + 1;
        break;
    }

    setPrice(newValue);
    setPriceInput(newValue.toString());
  };

  // ==============================
  // ⌨️ input
  // ==============================
  const handleInputChange = (text: string) => {
    setPriceInput(text);
    const value = parseFloat(text);
    if (!isNaN(value)) {
      setPrice(value);
    }
  };

  // ==============================
  // ✅ aplicar
  // ==============================
  const handleApply = () => {
    onApply(parseFloat(price.toFixed(2)));
    modalRef.current?.close();
  };

  return (
    <Modalize
      ref={modalRef}
      withHandle
      adjustToContentHeight
      modalStyle={styles.container}
    >
      {/* 🟦 TÍTULO */}
      <Text style={styles.title}>PRECIO</Text>

      {/* 🔢 CONTROLES */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.customButton2}
          onPress={() => handlePress('DECIMAL_MINUS')}
        >
          <IconMin color={theme.colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customButton}
          onPress={() => handlePress('FULL_MINUS')}
        >
          <IconMin color="#fff" />
        </TouchableOpacity>

        <View style={{ width: 80 }}>
          <InputDecimal
            placeholder="0.00"
            value={priceInput}
            keyboardType="numeric"
            onChangeText={handleInputChange}
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          style={styles.customButton}
          onPress={() => handlePress('FULL_PLUS')}
        >
          <IconPlus color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customButton2}
          onPress={() => handlePress('DECIMAL_PLUS')}
        >
          <IconPlus color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 25 }}>
        <ButtonGeneric title="Aplicar" shadow onPress={handleApply} />
      </View>

      <View style={{ height: 20 }} />
    </Modalize>
  );
});

export default PriceAdjustment;

// ==============================
// 🎨 ESTILOS LOCALES
// ==============================
const getStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: 20,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      elevation: 5,
      shadowColor: '#677e00ff',
      shadowOpacity: 0.3,
      shadowOffset: { width: 10, height: 20 },
      shadowRadius: 30,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 20,
      color: theme.colors.primary,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    customButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#ccc',
      marginHorizontal: 4,
      height: 60,
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    customButton2: {
      backgroundColor: theme.colors.secondary || '#b6b6b6ff',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#ccc',
      marginHorizontal: 4,
      height: 50,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      fontWeight: '800',
      fontSize: 24,
      width: 50,
      height: 50,
      textAlign: 'center',
    },
  });
