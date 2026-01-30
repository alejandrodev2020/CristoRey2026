import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
// import DiscountSection from './discount/DiscountSection';
import {
    SaleConfig,
  SaleConfigModalHandle,
  SaleType,
} from '../functions/types/types';
import DiscountSection from './discount/DiscountSection';

/* =======================
   PROPS
======================= */
type Props = {
  onApply: (config: SaleConfig) => void;
};

/* =======================
   COMPONENT
======================= */
const OrdersConfigModal = forwardRef<SaleConfigModalHandle, Props>(
  ({ onApply }, ref) => {
    const modalizeRef = useRef<Modalize>(null);

    /* ========= DESCUENTO ========= */
    const [discountType, setDiscountType] =
      useState<'PERCENT' | 'FIXED'>('PERCENT');
    const [discountValue, setDiscountValue] = useState(0);

    /* ========= TIPO DE VENTA ========= */
    const [saleType, setSaleType] = useState<SaleType>('CASH');

    /* ========= TOTALES ========= */
    const [totalAmount, setTotalAmount] = useState(0);

    /* ========= PAGOS ========= */
    const [amountCash, setAmountCash] = useState(0);
    const [amountQr, setAmountQr] = useState(0);
    const [amountCard, setAmountCard] = useState(0);

    /* =======================
       IMPERATIVE OPEN
    ======================= */
    useImperativeHandle(ref, () => ({
      open: (initial: SaleConfig) => {
        setDiscountType(initial.discount.type);
        setDiscountValue(initial.discount.value);
        setSaleType(initial.saleType);

        if (initial.amountTotal) {
          setTotalAmount(initial.amountTotal.amountMain);
          setAmountCash(initial.amountTotal.amountCash);
          setAmountQr(initial.amountTotal.amountQr);
          setAmountCard(initial.amountTotal.amountCard);
        } else if (initial.paymentDelivered) {
          setTotalAmount(initial.paymentDelivered.amountMain);
          setAmountCash(initial.paymentDelivered.amountCash);
          setAmountQr(initial.paymentDelivered.amountQr);
          setAmountCard(initial.paymentDelivered.amountCard);
        } else {
          setTotalAmount(0);
          setAmountCash(0);
          setAmountQr(0);
          setAmountCard(0);
        }

        modalizeRef.current?.open();
      },
      close: () => modalizeRef.current?.close(),
    }));

    /* =======================
       DISTRIBUCIÓN POS
    ======================= */
    const distribute = (
      type: 'cash' | 'qr' | 'card',
      value: number,
    ) => {
      const safe = Math.max(0, Math.min(value, totalAmount));
      const remaining = totalAmount - safe;

      if (type === 'cash') {
        setAmountCash(safe);
        setAmountQr(remaining);
        setAmountCard(0);
      }

      if (type === 'qr') {
        setAmountQr(safe);
        setAmountCash(remaining);
        setAmountCard(0);
      }

      if (type === 'card') {
        setAmountCard(safe);
        setAmountCash(remaining);
        setAmountQr(0);
      }
    };

    /* =======================
       APPLY
    ======================= */
    const handleApply = () => {
      const config: SaleConfig = {
        discount: {
          type: discountType,
          value: discountValue,
        },
        saleType,
      };

      if (saleType === 'CASH') {
        config.amountTotal = {
          amountMain: totalAmount,
          amountCash,
          amountQr,
          amountCard,
        };
      } else {
        const delivered = amountCash + amountQr + amountCard;

        config.paymentDelivered = {
          amountMain: delivered,
          amountCash,
          amountQr,
          amountCard,
        };
      }

      onApply(config);
      modalizeRef.current?.close();
    };

    /* =======================
       UI
    ======================= */
    return (
      <Modalize
        ref={modalizeRef}
        withHandle
        adjustToContentHeight
        panGestureEnabled>
        <View style={styles.container}>
          <Text style={styles.title}>Configuración de Pedido</Text>

          {/* DESCUENTO */}
          <DiscountSection
            type={discountType}
            value={discountValue}
            onTypeChange={setDiscountType}
            onValueChange={setDiscountValue}
          />
          
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Aplicar cambios</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    );
  },
);

export default OrdersConfigModal;

/* =======================
   PAYMENT INPUT
======================= */
const PaymentInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) => (
  <View style={styles.paymentBox}>
    <Text style={styles.paymentLabel}>{label}</Text>
    <TextInput
      value={value.toString()}
      onChangeText={v =>
        onChange(Number(v.replace(',', '.')) || 0)
      }
      keyboardType="decimal-pad"
      style={styles.paymentInput}
    />
  </View>
);

/* =======================
   STYLES
======================= */
const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  sectionTitle: { marginTop: 15, marginBottom: 6, fontWeight: '600' },

  tabs: { flexDirection: 'row', gap: 10 },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  tabActive: { backgroundColor: '#325284', borderColor: '#325284' },
  tabText: { color: '#333', fontWeight: '600' },
  tabTextActive: { color: '#fff' },

  payments: { flexDirection: 'row', gap: 10, marginTop: 8 },
  paymentBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  paymentLabel: { fontSize: 12, color: '#555', marginBottom: 4 },
  paymentInput: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    paddingVertical: 4,
  },

  applyButton: {
    backgroundColor: '#325284',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
