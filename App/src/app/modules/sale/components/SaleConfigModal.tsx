// import React, {
//   forwardRef,
//   useImperativeHandle,
//   useRef,
//   useState,
//   useEffect,
// } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Keyboard,
//   Platform,
//   Image,
//   Dimensions,
// } from 'react-native';
// import { Modalize } from 'react-native-modalize';
// import DiscountSection from './discount/DiscountSection';
// import Images from '../../../../assets/images/images';
// import {
//   SaleConfig,
//   SaleConfigModalHandle,
//   SaleType,
// } from '../functions/types/types';

// const { width } = Dimensions.get('window');

// type Props = {
//   onApply: (config: SaleConfig) => void;
// };

// const SaleConfigModal = forwardRef<SaleConfigModalHandle, Props>(
//   ({ onApply }, ref) => {
//     const modalizeRef = useRef<Modalize>(null);
//     const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

//     /* ========= ESTADOS ========= */
//     const [discountType, setDiscountType] = useState<'PERCENT' | 'FIXED'>('PERCENT');
//     const [discountValue, setDiscountValue] = useState(0);
//     const [saleType, setSaleType] = useState<SaleType>('CASH');
//     const [totalAmount, setTotalAmount] = useState(0);

//     /* ========= PAGOS ========= */
//     const [amountCash, setAmountCash] = useState(0);
//     const [amountQr, setAmountQr] = useState(0);
//     const [amountCard, setAmountCard] = useState(0);

//     useEffect(() => {
//       const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
//       const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
//       const showSub = Keyboard.addListener(showEvent, () => setIsKeyboardVisible(true));
//       const hideSub = Keyboard.addListener(hideEvent, () => setIsKeyboardVisible(false));
//       return () => { showSub.remove(); hideSub.remove(); };
//     }, []);

//     const getPaymentIcon = (paymentTypeId: number) => {
//       switch (paymentTypeId) {
//         case 1: return Images.ui.icon_cash; 
//         case 2: return Images.ui.icon_qr; 
//         case 3: return Images.ui.icon_card; 
//         default: return Images.ui.icon_cash;
//       }
//     };

//     useImperativeHandle(ref, () => ({
//       open: (initial: SaleConfig) => {
//         setDiscountType(initial.discount.type);
//         setDiscountValue(initial.discount.value);
//         setSaleType(initial.saleType);
//         if (initial.amountTotal) {
//           setTotalAmount(initial.amountTotal.amountMain);
//           setAmountCash(initial.amountTotal.amountCash);
//           setAmountQr(initial.amountTotal.amountQr);
//           setAmountCard(initial.amountTotal.amountCard);
//         } else if (initial.paymentDelivered) {
//           setTotalAmount(initial.paymentDelivered.amountMain);
//           setAmountCash(initial.paymentDelivered.amountCash);
//           setAmountQr(initial.paymentDelivered.amountQr);
//           setAmountCard(initial.paymentDelivered.amountCard);
//         }
//         modalizeRef.current?.open();
//       },
//       close: () => modalizeRef.current?.close(),
//     }));

//     /* =======================
//        LÓGICA DINÁMICA (RESTAURADA)
//     ======================= */
//     const distribute = (type: 'cash' | 'qr' | 'card', value: number) => {
//       // Limitamos el valor ingresado para que no exceda el total
//       const safeValue = Math.max(0, Math.min(value, totalAmount));
//       const remaining = totalAmount - safeValue;

//       if (type === 'cash') {
//         setAmountCash(safeValue);
//         setAmountQr(remaining); // El resto se va a QR por defecto
//         setAmountCard(0);
//       } else if (type === 'qr') {
//         setAmountQr(safeValue);
//         setAmountCash(remaining); // El resto se va a Efectivo
//         setAmountCard(0);
//       } else if (type === 'card') {
//         setAmountCard(safeValue);
//         setAmountCash(remaining); // El resto se va a Efectivo
//         setAmountQr(0);
//       }
//     };

//     const selectFullAmount = (type: 'cash' | 'qr' | 'card') => {
//       setAmountCash(type === 'cash' ? totalAmount : 0);
//       setAmountQr(type === 'qr' ? totalAmount : 0);
//       setAmountCard(type === 'card' ? totalAmount : 0);
//     };

//     const handleApply = () => {
//       const config: SaleConfig = {
//         discount: { type: discountType, value: discountValue },
//         saleType,
//       };
//       if (saleType === 'CASH') {
//         config.amountTotal = { amountMain: totalAmount, amountCash, amountQr, amountCard };
//       } else {
//         const delivered = amountCash + amountQr + amountCard;
//         config.paymentDelivered = { amountMain: delivered, amountCash, amountQr, amountCard };
//       }
//       onApply(config);
//       modalizeRef.current?.close();
//     };

//     return (
//       <Modalize
//         ref={modalizeRef}
//         withHandle
//         adjustToContentHeight
//         keyboardAvoidingBehavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         scrollViewProps={{
//           keyboardShouldPersistTaps: 'handled',
//           contentContainerStyle: [styles.container, isKeyboardVisible && styles.containerEditing],
//         }}>
        
//         <Text style={styles.title}>Configuración de Venta</Text>

//         <View style={styles.totalBanner}>
//           <Text style={styles.totalText}>Total a pagar: {totalAmount} Bs</Text>
//         </View>

//         <DiscountSection
//           type={discountType}
//           value={discountValue}
//           onTypeChange={setDiscountType}
//           onValueChange={setDiscountValue}
//         />

//         <Text style={styles.sectionTitle}>Forma de pago</Text>
//         <View style={styles.paymentsContainer}>
//           <PaymentInput
//             label="Efectivo"
//             value={amountCash}
//             icon={getPaymentIcon(1)}
//             isActive={amountCash > 0}
//             onSelect={() => selectFullAmount('cash')}
//             onChange={(v:any) => distribute('cash', v)}
//           />
//           <PaymentInput
//             label="QR"
//             value={amountQr}
//             icon={getPaymentIcon(2)}
//             isActive={amountQr > 0}
//             onSelect={() => selectFullAmount('qr')}
//             onChange={(v:any) => distribute('qr', v)}
//           />
//           <PaymentInput
//             label="Tarjeta"
//             value={amountCard}
//             icon={getPaymentIcon(3)}
//             isActive={amountCard > 0}
//             onSelect={() => selectFullAmount('card')}
//             onChange={(v:any) => distribute('card', v)}
//           />
//         </View>

//         <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
//           <Text style={styles.applyButtonText}>Aplicar cambios</Text>
//         </TouchableOpacity>
//       </Modalize>
//     );
//   }
// );

// const PaymentInput = ({ label, value, icon, isActive, onSelect, onChange }: any) => (
//   <TouchableOpacity 
//     activeOpacity={0.9}
//     onPress={onSelect}
//     style={[styles.paymentBox, isActive && styles.paymentBoxActive]}
//   >
//     <View style={styles.paymentHeader}>
//       <Image source={icon} style={[styles.paymentIcon, isActive ]} />
//       <Text style={[styles.paymentLabel, isActive && styles.textWhite]}>{label}</Text>
//     </View>
//     <View style={styles.whiteInputCard}>
//       <TextInput
//         value={value === 0 ? '' : value.toString()}
//         onChangeText={text => {
//           const parsed = parseFloat(text.replace(',', '.'));
//           onChange(isNaN(parsed) ? 0 : parsed);
//         }}
//         keyboardType="decimal-pad"
//         style={styles.paymentInput}
//         selectTextOnFocus
//       />
//     </View>
//   </TouchableOpacity>
// );

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   containerEditing: { paddingBottom: Platform.OS === 'android' ? 320 : 100 },
//   title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
//   totalBanner: {
//     backgroundColor: '#F39C12',
//     paddingVertical: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginBottom: 20,
//     elevation: 4,
//   },
//   totalText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
//   sectionTitle: { marginTop: 15, marginBottom: 10, fontWeight: 'bold', color: '#555' },
//   paymentsContainer: { flexDirection: 'row', gap: 8 },
//   paymentBox: {
//     flex: 1,
//     backgroundColor: '#EAEAEA',
//     borderRadius: 12,
//     padding: 8,
//     borderWidth: 1,
//     borderColor: '#D0D0D0',
//     minHeight: 100,
//   },
//   paymentBoxActive: { backgroundColor: '#23305F', borderColor: '#23305F' },
//   paymentHeader: { alignItems: 'center', gap: 4, marginBottom: 8 },
//   paymentIcon: { width: 28, height: 28, resizeMode: 'contain' },
//   paymentLabel: { fontSize: 12, fontWeight: 'bold' },
//   textWhite: { color: '#fff' },
//   whiteInputCard: { backgroundColor: '#fff', borderRadius: 8, height: 40, justifyContent: 'center' },
//   paymentInput: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#333' },
//   applyButton: { backgroundColor: '#2778cf', paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginTop: 25 },
//   applyButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
// });

// export default SaleConfigModal;
// import React, {
//   forwardRef,
//   useImperativeHandle,
//   useRef,
//   useState,
//   useEffect,
// } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Keyboard,
//   Platform,
//   Image,
//   Dimensions,
//   Animated,
// } from 'react-native';
// import { Modalize } from 'react-native-modalize';
// import DiscountSection from './discount/DiscountSection';
// import Images from '../../../../assets/images/images';

// const { width } = Dimensions.get('window');

// const SaleConfigModal = forwardRef((props: any, ref) => {
//   const { onApply } = props;
//   const modalizeRef = useRef<Modalize>(null);
//   const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

//   /* ========= ESTADOS LOCALES ========= */
//   const [discountType, setDiscountType] = useState<'PERCENT' | 'FIXED'>('PERCENT');
//   const [discountValue, setDiscountValue] = useState(0);
//   const [saleType, setSaleType] = useState<'CASH' | 'CREDIT'>('CASH');
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [amountCash, setAmountCash] = useState(0);
//   const [amountQr, setAmountQr] = useState(0);

//   /* ========= ANIMACIÓN TAB ========= */
//   const tabIndicatorPos = useRef(new Animated.Value(0)).current;
//   const TAB_CONTAINER_WIDTH = width - 40;
//   const INDICATOR_WIDTH = TAB_CONTAINER_WIDTH / 2 - 4;

//   const handleSelectSaleType = (type: 'CASH' | 'CREDIT') => {
//     setSaleType(type);
//     Animated.timing(tabIndicatorPos, {
//       toValue: type === 'CASH' ? 0 : 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();

//     if (type === 'CREDIT') {
//       setAmountCash(0);
//       setAmountQr(0);
//     } else {
//       setAmountCash(totalAmount);
//       setAmountQr(0);
//     }
//   };

//   const translateX = tabIndicatorPos.interpolate({
//     inputRange: [0, 1],
//     outputRange: [2, INDICATOR_WIDTH + 2],
//   });

//   useImperativeHandle(ref, () => ({
//     open: (initial: any) => {
//       // Protección contra undefined para evitar el error 'type' of undefined
//       const disc = initial?.discount || { type: 'PERCENT', value: 0 };
//       setDiscountType(disc.type);
//       setDiscountValue(disc.value);
      
//       const type = initial?.saleType || 'CASH';
//       setSaleType(type);
      
//       // Sincronizar tab
//       Animated.timing(tabIndicatorPos, {
//         toValue: type === 'CASH' ? 0 : 1,
//         duration: 0,
//         useNativeDriver: true,
//       }).start();

//       const mainAmount = initial?.amountTotal?.amountMain || 0;
//       setTotalAmount(mainAmount);
      
//       if (type === 'CASH') {
//         setAmountCash(initial?.amountTotal?.amountCash ?? mainAmount);
//         setAmountQr(initial?.amountTotal?.amountQr ?? 0);
//       } else {
//         setAmountCash(initial?.paymentDelivered?.amountCash ?? 0);
//         setAmountQr(initial?.paymentDelivered?.amountQr ?? 0);
//       }
      
//       modalizeRef.current?.open();
//     },
//     close: () => modalizeRef.current?.close(),
//   }));

//   /* ========= LÓGICA DE DISTRIBUCIÓN & SELECCIÓN TOTAL ========= */
//   const selectFullAmount = (type: 'cash' | 'qr') => {
//     if (type === 'cash') {
//       setAmountCash(totalAmount);
//       setAmountQr(0);
//     } else {
//       setAmountQr(totalAmount);
//       setAmountCash(0);
//     }
//   };

//   const distribute = (type: 'cash' | 'qr', value: number) => {
//     const safeValue = Math.max(0, Math.min(value, totalAmount));
//     if (saleType === 'CASH') {
//       if (type === 'cash') {
//         setAmountCash(safeValue);
//         setAmountQr(totalAmount - safeValue);
//       } else {
//         setAmountQr(safeValue);
//         setAmountCash(totalAmount - safeValue);
//       }
//     } else {
//       if (type === 'cash') setAmountCash(safeValue);
//       else setAmountQr(safeValue);
//     }
//   };

//   const handleSave = () => {
//     const amountReceived = amountCash + amountQr;
//     const pending = Math.max(0, totalAmount - amountReceived);

//     const payload = {
//       discount: { type: discountType, value: discountValue },
//       saleType: saleType,
//       amountTotal: {
//         amountMain: totalAmount,
//         amountCash: saleType === 'CASH' ? amountCash : 0,
//         amountQr: saleType === 'CASH' ? amountQr : 0,
//         amountCard: 0,
//       },
//       amountDiscountAditional: discountType === 'FIXED' ? discountValue : 0,
//       discountPercentage: discountType === 'PERCENT' ? discountValue : 0,
//       saleTypeId: saleType === 'CASH' ? 1 : 2,
//       amountOfDebt: saleType === 'CREDIT' ? pending : 0,
//       amountRecived: amountReceived,
//       paymentDelivered: {
//         amountMain: amountReceived,
//         amountCash: amountCash,
//         amountQr: amountQr,
//         amountCard: 0,
//       },
//     };

//     onApply(payload);
//     modalizeRef.current?.close();
//   };

//   return (
//     <Modalize ref={modalizeRef} withHandle adjustToContentHeight>
//       <View style={styles.container}>
//         <Text style={styles.title}>Configuración de Venta</Text>

//         <View style={[styles.totalBanner, saleType === 'CREDIT' && styles.bannerCredit]}>
//           <Text style={styles.totalText}>
//             {saleType === 'CASH' ? 'Total a pagar' : 'Venta al Crédito'}: {totalAmount} Bs
//           </Text>
//         </View>

//         <Text style={styles.sectionTitle}>Tipo de venta</Text>
//         <View style={styles.tabContainer}>
//           <Animated.View style={[styles.tabIndicator, { width: INDICATOR_WIDTH, transform: [{ translateX }] }]} />
//           <TouchableOpacity style={styles.tabOption} onPress={() => handleSelectSaleType('CASH')}>
//             <Text style={[styles.tabOptionText, saleType === 'CASH' && styles.tabOptionTextActive]}>Contado</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.tabOption} onPress={() => handleSelectSaleType('CREDIT')}>
//             <Text style={[styles.tabOptionText, saleType === 'CREDIT' && styles.tabOptionTextActive]}>Crédito</Text>
//           </TouchableOpacity>
//         </View>

//         {saleType === 'CASH' && (
//           <DiscountSection
//             type={discountType}
//             value={discountValue}
//             onTypeChange={(t: any) => setDiscountType(t)}
//             onValueChange={(v: any) => setDiscountValue(v)}
//           />
//         )}

//         <Text style={styles.sectionTitle}>
//           {saleType === 'CASH' ? 'Forma de pago' : '¿Cuánto dinero recibes ahora?'}
//         </Text>

//         <View style={styles.paymentsContainer}>
//           <PaymentInput
//             label="Efectivo"
//             value={amountCash}
//             icon={Images.ui.icon_cash}
//             isActive={amountCash > 0}
//             onPress={() => selectFullAmount('cash')}
//             onChange={(v: any) => distribute('cash', v)}
//           />
//           <PaymentInput
//             label="QR"
//             value={amountQr}
//             icon={Images.ui.icon_qr}
//             isActive={amountQr > 0}
//             onPress={() => selectFullAmount('qr')}
//             onChange={(v: any) => distribute('qr', v)}
//           />
//         </View>

//         {saleType === 'CREDIT' && (
//           <View style={styles.balanceContainer}>
//             <Text style={styles.balanceLabel}>SALDO PENDIENTE:</Text>
//             <Text style={styles.balanceValue}>Bs {totalAmount - (amountCash + amountQr)}</Text>
//           </View>
//         )}

//         <TouchableOpacity style={styles.applyButton} onPress={handleSave}>
//           <Text style={styles.applyButtonText}>Guardar cambios</Text>
//         </TouchableOpacity>
//       </View>
//     </Modalize>
//   );
// });

// const PaymentInput = ({ label, value, icon, isActive, onChange, onPress }: any) => (
//   <TouchableOpacity 
//     activeOpacity={0.9} 
//     onPress={onPress} 
//     style={[styles.paymentBox, isActive && styles.paymentBoxActive]}
//   >
//     <View style={styles.paymentHeader}>
//       <Image source={icon} style={[styles.paymentIcon, isActive && { tintColor: '#fff' }]} />
//       <Text style={[styles.paymentLabel, isActive && styles.textWhite]}>{label}</Text>
//     </View>
//     <View style={styles.whiteInputCard}>
//       <TextInput
//         value={value === 0 ? '' : value.toString()}
//         onChangeText={text => {
//           const parsed = parseFloat(text.replace(',', '.'));
//           onChange(isNaN(parsed) ? 0 : parsed);
//         }}
//         keyboardType="decimal-pad"
//         style={styles.paymentInput}
//         placeholder="0"
//         selectTextOnFocus
//       />
//     </View>
//   </TouchableOpacity>
// );

// const styles = StyleSheet.create({
//   container: { padding: 20, paddingBottom: 40 },
//   title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
//   totalBanner: { backgroundColor: '#F39C12', paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
//   bannerCredit: { backgroundColor: '#23305F' },
//   totalText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
//   sectionTitle: { marginTop: 15, marginBottom: 10, fontWeight: 'bold', color: '#555' },
//   tabContainer: { flexDirection: 'row', height: 50, backgroundColor: '#F0F0F0', borderRadius: 12, padding: 4, position: 'relative' },
//   tabIndicator: { position: 'absolute', height: 42, top: 4, backgroundColor: '#23305F', borderRadius: 10 },
//   tabOption: { flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
//   tabOptionText: { color: '#666', fontWeight: 'bold' },
//   tabOptionTextActive: { color: '#FFF' },
//   paymentsContainer: { flexDirection: 'row', gap: 10 },
//   paymentBox: { flex: 1, backgroundColor: '#EAEAEA', borderRadius: 12, padding: 10, borderWidth: 1, borderColor: '#D0D0D0' },
//   paymentBoxActive: { backgroundColor: '#23305F', borderColor: '#23305F' },
//   paymentHeader: { alignItems: 'center', gap: 4, marginBottom: 8 },
//   paymentIcon: { width: 28, height: 28, resizeMode: 'contain' },
//   paymentLabel: { fontSize: 13, fontWeight: 'bold' },
//   textWhite: { color: '#fff' },
//   whiteInputCard: { backgroundColor: '#fff', borderRadius: 8, height: 45, justifyContent: 'center' },
//   paymentInput: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#333', padding: 0 },
//   balanceContainer: { marginTop: 20, backgroundColor: '#fdecea', padding: 15, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', gap: 10, borderWidth: 1, borderColor: '#f5c6cb' },
//   balanceLabel: { color: '#721c24', fontWeight: 'bold', fontSize: 16 },
//   balanceValue: { color: '#d32f2f', fontWeight: 'bold', fontSize: 16 },
//   applyButton: { backgroundColor: '#2778cf', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 25 },
//   applyButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
// });

// export default SaleConfigModal;


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
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import DiscountSection from './discount/DiscountSection';
import Images from '../../../../assets/images/images';

const { width } = Dimensions.get('window');

const SaleConfigModal = forwardRef((props: any, ref) => {
  const { onApply } = props;
  const modalizeRef = useRef<Modalize>(null);

  /* ========= ESTADOS LOCALES ========= */
  const [discountType, setDiscountType] = useState<'PERCENT' | 'FIXED'>('PERCENT');
  const [discountValue, setDiscountValue] = useState(0);
  const [saleType, setSaleType] = useState<'CASH' | 'CREDIT'>('CASH');
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountCash, setAmountCash] = useState(0);
  const [amountQr, setAmountQr] = useState(0);

  /* ========= ANIMACIÓN TAB ========= */
  const tabIndicatorPos = useRef(new Animated.Value(0)).current;
  const TAB_CONTAINER_WIDTH = width - 40;
  const INDICATOR_WIDTH = TAB_CONTAINER_WIDTH / 2 - 4;

  const handleSelectSaleType = (type: 'CASH' | 'CREDIT') => {
    setSaleType(type);
    Animated.timing(tabIndicatorPos, {
      toValue: type === 'CASH' ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Reset de montos al cambiar modo para evitar basura de datos
    if (type === 'CREDIT') {
      setAmountCash(0);
      setAmountQr(0);
    } else {
      setAmountCash(totalAmount);
      setAmountQr(0);
    }
  };

  const translateX = tabIndicatorPos.interpolate({
    inputRange: [0, 1],
    outputRange: [2, INDICATOR_WIDTH + 2],
  });

  /* ========= INTERFAZ IMPERATIVA PARA EL PADRE ========= */
  useImperativeHandle(ref, () => ({
    open: (initial: any) => {
      // Seguridad contra undefined para evitar errores de Hermes
      const safeInitial = initial || {};
      const disc = safeInitial.discount || { type: 'PERCENT', value: 0 };
      const type = safeInitial.saleType || 'CASH';
      const mainAmount = safeInitial.amountTotal?.amountMain || 0;

      setDiscountType(disc.type);
      setDiscountValue(disc.value);
      setSaleType(type);
      setTotalAmount(mainAmount);

      // Cargar montos según el tipo de venta
      if (type === 'CASH') {
        setAmountCash(safeInitial.amountTotal?.amountCash ?? mainAmount);
        setAmountQr(safeInitial.amountTotal?.amountQr ?? 0);
      } else {
        setAmountCash(safeInitial.paymentDelivered?.amountCash ?? 0);
        setAmountQr(safeInitial.paymentDelivered?.amountQr ?? 0);
      }

      // Sincronizar posición del tab
      Animated.timing(tabIndicatorPos, {
        toValue: type === 'CASH' ? 0 : 1,
        duration: 0,
        useNativeDriver: true,
      }).start();

      modalizeRef.current?.open();
    },
    close: () => modalizeRef.current?.close(),
  }));

  /* ========= LÓGICA DE DISTRIBUCIÓN & SELECCIÓN TOTAL ========= */
  const selectFullAmount = (type: 'cash' | 'qr') => {
    if (type === 'cash') {
      setAmountCash(totalAmount);
      setAmountQr(0);
    } else {
      setAmountQr(totalAmount);
      setAmountCash(0);
    }
  };

  const distribute = (type: 'cash' | 'qr', value: any) => {
    const numValue = parseFloat(value) || 0;
    const safeValue = Math.max(0, Math.min(numValue, totalAmount));
    
    if (saleType === 'CASH') {
      if (type === 'cash') {
        setAmountCash(safeValue);
        setAmountQr(parseFloat((totalAmount - safeValue).toFixed(2)));
      } else {
        setAmountQr(safeValue);
        setAmountCash(parseFloat((totalAmount - safeValue).toFixed(2)));
      }
    } else {
      // En crédito los montos son libres (cuota inicial)
      if (type === 'cash') setAmountCash(safeValue);
      else setAmountQr(safeValue);
    }
  };

  const handleSave = () => {
    const amountReceived = amountCash + amountQr;
    const pending = Math.max(0, totalAmount - amountReceived);

    const payload = {
      discount: { type: discountType, value: discountValue },
      saleType: saleType,
      amountTotal: {
        amountMain: totalAmount,
        amountCash: saleType === 'CASH' ? amountCash : 0,
        amountQr: saleType === 'CASH' ? amountQr : 0,
        amountCard: 0,
      },
      amountDiscountAditional: discountType === 'FIXED' ? discountValue : 0,
      discountPercentage: discountType === 'PERCENT' ? discountValue : 0,
      saleTypeId: saleType === 'CASH' ? 1 : 2,
      amountOfDebt: saleType === 'CREDIT' ? pending : 0,
      amountRecived: amountReceived,
      paymentDelivered: {
        amountMain: amountReceived,
        amountCash: amountCash,
        amountQr: amountQr,
        amountCard: 0,
      },
    };

    onApply(payload);
    modalizeRef.current?.close();
  };

  return (
    <Modalize ref={modalizeRef} withHandle adjustToContentHeight>
      <View style={styles.container}>
        <Text style={styles.title}>Configuración de Venta</Text>

        <View style={[styles.totalBanner, saleType === 'CREDIT' && styles.bannerCredit]}>
          <Text style={styles.totalText}>
            {saleType === 'CASH' ? 'Total a pagar' : 'Venta al Crédito'}: {totalAmount} Bs
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Tipo de venta</Text>
        <View style={styles.tabContainer}>
          <Animated.View style={[styles.tabIndicator, { width: INDICATOR_WIDTH, transform: [{ translateX }] }]} />
          <TouchableOpacity style={styles.tabOption} onPress={() => handleSelectSaleType('CASH')}>
            <Text style={[styles.tabOptionText, saleType === 'CASH' && styles.tabOptionTextActive]}>Contado</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabOption} onPress={() => handleSelectSaleType('CREDIT')}>
            <Text style={[styles.tabOptionText, saleType === 'CREDIT' && styles.tabOptionTextActive]}>Crédito</Text>
          </TouchableOpacity>
        </View>

        {saleType === 'CASH' && (
          <DiscountSection
            type={discountType}
            value={discountValue}
            onTypeChange={(t: any) => setDiscountType(t)}
            onValueChange={(v: any) => setDiscountValue(v)}
          />
        )}

        <Text style={styles.sectionTitle}>
          {saleType === 'CASH' ? 'Forma de pago' : '¿Cuánto dinero estás recibiendo?'}
        </Text>

        <View style={styles.paymentsContainer}>
          <PaymentInput
            label="Efectivo"
            value={amountCash}
            icon={Images.ui.icon_cash}
            isActive={amountCash > 0}
            onPress={() => selectFullAmount('cash')}
            onChange={(v: any) => distribute('cash', v)}
          />
          <PaymentInput
            label="QR"
            value={amountQr}
            icon={Images.ui.icon_qr}
            isActive={amountQr > 0}
            onPress={() => selectFullAmount('qr')}
            onChange={(v: any) => distribute('qr', v)}
          />
        </View>

        {saleType === 'CREDIT' && (
          <View style={styles.balanceContainer}>
            <View>
              <Text style={styles.balanceLabel}>SALDO A CUENTA</Text>
              <Text style={styles.balanceSubLabel}>Monto que se debe pagar después</Text>
            </View>
            <Text style={styles.balanceValue}>Bs {(totalAmount - (amountCash + amountQr)).toFixed(2)}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.applyButton} onPress={handleSave}>
          <Text style={styles.applyButtonText}>Guardar cambios</Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
});

const PaymentInput = ({ label, value, icon, isActive, onChange, onPress }: any) => (
  <TouchableOpacity 
    activeOpacity={0.9} 
    onPress={onPress} 
    style={[styles.paymentBox, isActive && styles.paymentBoxActive]}
  >
    <View style={styles.paymentHeader}>
      <Image source={icon} style={[styles.paymentIcon, isActive && { tintColor: '#fff' }]} />
      <Text style={[styles.paymentLabel, isActive && styles.textWhite]}>{label}</Text>
    </View>
    <View style={styles.whiteInputCard}>
      <TextInput
        value={value === 0 ? '' : value.toString()}
        onChangeText={onChange}
        keyboardType="decimal-pad"
        style={styles.paymentInput}
        placeholder="0"
        selectTextOnFocus
      />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  totalBanner: { backgroundColor: '#F39C12', paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginBottom: 20, elevation: 3 },
  bannerCredit: { backgroundColor: '#23305F' },
  totalText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  sectionTitle: { marginTop: 15, marginBottom: 10, fontWeight: 'bold', color: '#555' },
  tabContainer: { flexDirection: 'row', height: 50, backgroundColor: '#F0F0F0', borderRadius: 12, padding: 4, position: 'relative' },
  tabIndicator: { position: 'absolute', height: 42, top: 4, backgroundColor: '#23305F', borderRadius: 10 },
  tabOption: { flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  tabOptionText: { color: '#666', fontWeight: 'bold' },
  tabOptionTextActive: { color: '#FFF' },
  paymentsContainer: { flexDirection: 'row', gap: 10 },
  paymentBox: { flex: 1, backgroundColor: '#EAEAEA', borderRadius: 12, padding: 10, borderWidth: 1, borderColor: '#D0D0D0' },
  paymentBoxActive: { backgroundColor: '#23305F', borderColor: '#23305F' },
  paymentHeader: { alignItems: 'center', gap: 4, marginBottom: 8 },
  paymentIcon: { width: 28, height: 28, resizeMode: 'contain' },
  paymentLabel: { fontSize: 13, fontWeight: 'bold' },
  textWhite: { color: '#fff' },
  whiteInputCard: { backgroundColor: '#fff', borderRadius: 8, height: 45, justifyContent: 'center' },
  paymentInput: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#333', padding: 0 },
  balanceContainer: { marginTop: 20, backgroundColor: '#FFF5F5', padding: 15, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#FEB2B2' },
  balanceLabel: { color: '#C53030', fontWeight: 'bold', fontSize: 14 },
  balanceSubLabel: { color: '#F56565', fontSize: 11 },
  balanceValue: { color: '#C53030', fontWeight: 'bold', fontSize: 22 },
  applyButton: { backgroundColor: '#2778cf', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 25 },
  applyButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});

export default SaleConfigModal;