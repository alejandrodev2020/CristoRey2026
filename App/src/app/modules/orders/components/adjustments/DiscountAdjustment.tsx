import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useTheme } from '../../../../core/themes/useTheme';
import ButtonGeneric from '../../../../shared/components/ButtonGeneric';
import InputDecimal from '../../../../shared/components/InputDecimal';
import { IconMin, IconPlus } from '../../../../../assets/icons/tabler/svg';

// ==============================
// 🔁 Handle
// ==============================
export type DiscountAdjustmentHandle = {
  open: () => void;
  close: () => void;
};

// ==============================
// 🧩 Props
// ==============================
type DiscountAdjustmentProps = {
  basePrice: number;
  initialPercent?: number; // opcional (cliente)
  onApply: (percent: number, discountValue: number) => void;
};

// ==============================
// 🧠 Componente
// ==============================
const DiscountAdjustment = forwardRef<
  DiscountAdjustmentHandle,
  DiscountAdjustmentProps
>(({ basePrice, initialPercent = 0, onApply }, ref) => {
  const modalRef = useRef<Modalize>(null);
  const theme = useTheme();
  const styles = getStyles(theme);

  const [percent, setPercent] = useState<number>(initialPercent);
  const [value, setValue] = useState<number>(
    (basePrice * initialPercent) / 100,
  );

  const [percentInput, setPercentInput] = useState<string>(
    initialPercent.toString(),
  );
  const [valueInput, setValueInput] = useState<string>(
    value.toFixed(2),
  );

  // ==============================
  // 🔁 Exponer open / close
  // ==============================
  useImperativeHandle(ref, () => ({
    open: () => modalRef.current?.open(),
    close: () => modalRef.current?.close(),
  }));

  // ==============================
  // 🔄 sincronizar al abrir
  // ==============================
  useEffect(() => {
    const initialValue = (basePrice * initialPercent) / 100;
    setPercent(initialPercent);
    setValue(initialValue);
    setPercentInput(initialPercent.toString());
    setValueInput(initialValue.toFixed(2));
  }, [basePrice, initialPercent]);

  // ==============================
  // 🎯 Chips rápidos
  // ==============================
  const presetPercents = [0, 10, 15, 20];

  const applyPercent = (p: number) => {
    const v = (basePrice * p) / 100;
    setPercent(p);
    setValue(v);
    setPercentInput(p.toString());
    setValueInput(v.toFixed(2));
  };

  // ==============================
  // ⌨️ Input porcentaje
  // ==============================
  const handlePercentChange = (text: string) => {
    setPercentInput(text);
    const p = parseFloat(text);
    if (!isNaN(p)) {
      const v = (basePrice * p) / 100;
      setPercent(p);
      setValue(v);
      setValueInput(v.toFixed(2));
    }
  };

  // ==============================
  // ⌨️ Input valor
  // ==============================
  const handleValueChange = (text: string) => {
    setValueInput(text);
    const v = parseFloat(text);
    if (!isNaN(v) && basePrice > 0) {
      const p = (v / basePrice) * 100;
      setValue(v);
      setPercent(p);
      setPercentInput(p.toFixed(2));
    }
  };

  // ==============================
  // ✅ Aplicar
  // ==============================
  const handleApply = () => {
    onApply(
      parseFloat(percent.toFixed(2)),
      parseFloat(value.toFixed(2)),
    );
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
      <Text style={styles.title}>DESCUENTO</Text>

      {/* 🧩 CHIPS */}
      <View style={styles.chipRow}>
        {presetPercents.map(p => {
          const selected = Math.round(percent) === p;
          return (
            <TouchableOpacity
              key={p}
              onPress={() => applyPercent(p)}
              style={[
                styles.chip,
                selected && styles.chipSelected,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  selected && styles.chipTextSelected,
                ]}
              >
                {p}%
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 🔢 INPUTS */}
      <View style={styles.inputRow}>
        <View style={{ width: 100 }}>
          <InputDecimal
            placeholder="0%"
            value={percentInput}
            keyboardType="numeric"
            onChangeText={handlePercentChange}
            style={styles.input}
          />
        </View>

        <View style={{ width: 120 }}>
          <InputDecimal
            placeholder="0.00"
            value={valueInput}
            keyboardType="numeric"
            onChangeText={handleValueChange}
            style={styles.input}
          />
        </View>
      </View>

      {/* ✅ BOTÓN */}
      <View style={{ marginTop: 25 }}>
        <ButtonGeneric title="Aplicar" shadow onPress={handleApply} />
      </View>

      <View style={{ height: 20 }} />
    </Modalize>
  );
});

export default DiscountAdjustment;

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
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: -4 },
      shadowRadius: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 20,
      color: theme.colors.primary,
    },
    chipRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    chip: {
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#ccc',
      marginHorizontal: 6,
      backgroundColor: '#f5f5f5',
    },
    chipSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    chipText: {
      fontSize: 16,
      color: '#333',
      fontWeight: '500',
    },
    chipTextSelected: {
      color: '#fff',
      fontWeight: '700',
    },
    inputRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    input: {
      fontSize: 22,
      fontWeight: '700',
      textAlign: 'center',
    },
  });
