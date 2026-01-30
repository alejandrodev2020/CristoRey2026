// import React, {useRef, useState, useEffect} from 'react';
// import {useSelector, useDispatch} from 'react-redux';
// import {RootState} from '../hooks/reducer';
// import { Dimensions, FlatList, StatusBar, Text, TouchableOpacity, View, Platform } from 'react-native';
// import { applyGlobalDiscount, CartItem, clearCart, removeFromCart, updateCartItemAmount } from '../hooks/reducer/cartReducer';
// import TestModal, {TestModalHandle} from '../components/TestModal';
// import {Rate} from '../../product/models/rate_model';
// import {saleService} from '../services/SaleService';
// import {showMessage} from 'react-native-flash-message';
// import {CommonActions, useNavigation} from '@react-navigation/native';
// import {getSelectedClient} from '../context/saveSelectedClientStorage';
// import {getSelectedWarehouse} from '../context/saveSelectedWarehouseStorage';
// import IconLeft from '../../../../assets/icons/tabler/svg/filled/circle-chevron-left.svg';
// import IconTrash from '../../../../assets/icons/tabler/svg/filled/trash-x.svg';
// import IconConfig from '../../../../assets/icons/tabler/svg/outline/adjustments.svg';
// import {PreviewListProductSelectStyle} from './PreviewListProductSelectStyle';
// import {Client} from '../../clients/models/client_model';
// import {Warehouse} from '../../warehouse/models/warehouse';
// import {useTheme} from '../../../core/themes/useTheme';
// import { QuestionPrintModalHandle } from '../components/QuestionsPrint';
// import QuestionPrintModal from '../components/QuestionsPrint';
// import SaleConfigModal from '../components/SaleConfigModal';
// import {buildSaleObject} from '../functions/BuildObject';
// import WaveDividerOne from '../components/svg/WaveDividerOne';
// import { SaleConfig, SaleConfigModalHandle } from '../functions/types/types';

// export const PreviewListProductSelect = () => {
//   const theme = useTheme();
//   const styles = PreviewListProductSelectStyle(theme);
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const {height: screenHeight} = Dimensions.get('window');

//   // REFS
//   const printSendModalRef = useRef<QuestionPrintModalHandle>(null);
//   const saleConfigModalRef = useRef<SaleConfigModalHandle>(null);
//   const testModalRef = useRef<TestModalHandle>(null);

//   // REDUX & DATA
//   const cartItems = useSelector((state: RootState) => state.cart.cart);
//   const [rates, setRates] = useState<Rate[]>([]);
//   const [currentRate, setCurrentRate] = useState<Rate | null>(null);
//   const [currentClient, setCurrentClient] = useState<Client | null>(null);
//   const [currentWarehouse, setCurrentWarehouse] = useState<Warehouse | null>(null);
//   const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

//   // TOTALES
//   const totalAmount = cartItems.reduce((sum, item) => sum + (item.subTotal ?? 0), 0);

//   // CONFIGURACIÓN DE VENTA (Origen de la verdad)
//   const [saleConfig, setSaleConfig] = useState<SaleConfig>({
//     discount: {type: 'PERCENT', value: 0},
//     saleType: 'CASH',
//     amountTotal: {
//       amountMain: totalAmount,
//       amountCash: totalAmount,
//       amountQr: 0,
//       amountCard: 0,
//     }
//   });

//   useEffect(() => {
//     const loadSaleInfo = async () => {
//       try {
//         const warehouse = await getSelectedWarehouse();
//         const client = await getSelectedClient();
//         setCurrentWarehouse(warehouse);
//         setCurrentClient(client);
//       } catch (error) {
//         console.error('Error cargando info:', error);
//       }
//     };
//     loadSaleInfo();
//   }, []);

//   // Actualizar el total de la config si el carrito cambia
//   useEffect(() => {
//     setSaleConfig(prev => ({
//       ...prev,
//       amountTotal: {
//         ...prev.amountTotal!,
//         amountMain: totalAmount,
//         amountCash: prev.saleType === 'CASH' ? totalAmount : prev.amountTotal?.amountCash ?? 0
//       }
//     }));
//   }, [totalAmount]);

//   /* ========= MANEJADORES ========= */
//   const openEditModal = (item: CartItem) => {
//     setSelectedItem(item);
//     testModalRef.current?.open();
//   };

//   const onSaveEdit = (newAmount: number) => {
//     if (!selectedItem) return;
//     dispatch(updateCartItemAmount({id: selectedItem.id, amount: newAmount}));
//     setSelectedItem(null);
//     testModalRef.current?.close();
//   };

//   const handleRemoveItem = (item: CartItem) => {
//     dispatch(removeFromCart(item.id));
//   };

//   const handlePay = async () => {
//     if (cartItems.length === 0) {
//       showMessage({ message: 'El carrito está vacío', type: 'warning' });
//       return;
//     }
//     if (!currentClient || !currentWarehouse) {
//       showMessage({ message: 'Falta información de cliente/almacén', type: 'danger' });
//       return;
//     }

//     const saleData = buildSaleObject({
//       cartItems,
//       client: currentClient,
//       warehouse: currentWarehouse,
//       discount: saleConfig.discount,
//       saleType: saleConfig.saleType,
//       amountTotal: saleConfig.amountTotal,
//       paymentDelivered: saleConfig.paymentDelivered,
//     });

//     try {
//       const response = await saleService.store(saleData);
//       showMessage({ message: 'Venta registrada', type: 'success', backgroundColor: '#4CAF50' });
//       dispatch(clearCart());
//       setTimeout(() => {
//         navigation.dispatch(CommonActions.reset({ index: 0, routes: [{name: 'Home'}] }));
//       }, 800);
//     } catch (error: any) {
//       showMessage({
//         message: 'Error al guardar',
//         description: error?.response?.data?.message ?? 'No se pudo guardar',
//         type: 'danger',
//       });
//     }
//   };

//   const handleFinalize = () => {
//     navigation.dispatch(CommonActions.reset({ index: 0, routes: [{name: 'SaleList'}] }));
//   };

//   const formatMoney = (value: number) =>
//     value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

//   const renderItem = ({item}: {item: CartItem}) => {
//     const product = item.warehouseProduct.product;
//     const unit = item.warehouseProduct.unitMeasurement?.name ?? '';
//     return (
//       <TouchableOpacity onPress={() => openEditModal(item)} style={styles.itemContainer} activeOpacity={0.85}>
//         <View style={styles.rowBetween}>
//           <Text style={[styles.name, {flex: 9}]} numberOfLines={2}>{product.name}</Text>
//           <TouchableOpacity onPress={() => handleRemoveItem(item)} style={{flex: 1, alignItems: 'flex-end'}}>
//             <IconTrash width={32} height={32} color="#1a7f9e" />
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.detailText}>Cantidad: {item.amount} {unit && `(${unit})`}</Text>
//         <View style={styles.rowBetween}>
//           <Text style={styles.detailText}>Precio: Bs {item.price.toFixed(2)}</Text>
//           <Text style={styles.discountText}>Desc.: Bs {(item.discount ?? 0).toFixed(2)}</Text>
//         </View>
//         <View style={styles.subtotalContainer}>
//           <Text style={styles.subtotalLabel}>SUBTOTAL</Text>
//           <Text style={styles.subtotalValue}>Bs {formatMoney(item.subTotal ?? 0)}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <>
//       <StatusBar backgroundColor={'#23305F'} barStyle="light-content" />
//       <View style={styles.container}>
//         <WaveDividerOne top={0} height={220} />
//         <View style={{height: 60}} />

//         <View style={{paddingHorizontal: 15}}>
//           <View style={styles.row}>
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//               <IconLeft width={55} height={55} color={'#9b9b9bff'} />
//             </TouchableOpacity>
//             <Text style={styles.title}>Productos seleccionados: {cartItems.length}</Text>
//           </View>
//         </View>

//         <FlatList
//           data={cartItems}
//           style={{paddingHorizontal: 15}}
//           keyExtractor={(item, index) => `${item.id}-${index}`}
//           renderItem={renderItem}
//           showsVerticalScrollIndicator={false}
//           ListEmptyComponent={<Text style={styles.emptyText}>No hay productos seleccionados.</Text>}
//         />

//         {/* 🔹 FOOTER DE RESUMEN DINÁMICO */}
//         <View style={styles.summaryContainerManual}> 
//           <View style={{flex: 1}}>
//             <Text style={styles.summaryInfoText}>
//               Venta: <Text style={{fontWeight: '700'}}>{saleConfig.saleType === 'CASH' ? 'Contado' : 'Crédito'}</Text>
//             </Text>
//             <Text style={styles.summaryInfoText}>
//               Descuento: <Text style={{fontWeight: '700'}}>
//                 {saleConfig.discount.type === 'PERCENT' ? `${saleConfig.discount.value}%` : `Bs ${formatMoney(saleConfig.discount.value)}`}
//               </Text>
//             </Text>
//           </View>
//           <View style={{alignItems: 'flex-end'}}>
//             <Text style={styles.totalAmountText}>Bs {formatMoney(totalAmount)}</Text>
//           </View>
//         </View>

//         <View style={styles.footerFixed}>
//           <View style={styles.row}>
//             <TouchableOpacity
//               onPress={() => saleConfigModalRef.current?.open(saleConfig)}
//               style={{backgroundColor: '#325284', borderRadius: 40}}>
//               <IconConfig width={30} height={30} style={{margin: 15}} color="#fff" />
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.button, styles.flexButton, {backgroundColor: theme.colors.primary}]}
//               onPress={handlePay}>
//               <Text style={styles.buttonText}>GUARDAR VENTA</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* MODALES */}
//         <TestModal
//           ref={testModalRef}
//           product={selectedItem?.warehouseProduct ?? null}
//           listRates={rates}
//           rate={currentRate}
//           discount={0}
//           initialAmount={selectedItem?.amount ?? 1}
//           onSave={onSaveEdit}
//         />

//         <QuestionPrintModal 
//           ref={printSendModalRef} 
//           onFinalize={handleFinalize} 
//           onPrint={() => {}} 
//           onSend={() => {}} 
//         />
        
//         <SaleConfigModal
//           ref={saleConfigModalRef}
//           onApply={(config: SaleConfig) => {
//             setSaleConfig(config);
//             dispatch(applyGlobalDiscount(config.discount));
//           }}
//         />
//       </View>
//     </>
//   );
// };



// import React, {useRef, useState, useEffect} from 'react';
// import {useSelector, useDispatch} from 'react-redux';
// import {RootState} from '../hooks/reducer';
// import { Dimensions, FlatList, StatusBar, Text, TouchableOpacity, View } from 'react-native';
// import { applyGlobalDiscount, CartItem, clearCart, removeFromCart, updateCartItemAmount } from '../hooks/reducer/cartReducer';
// import TestModal, {TestModalHandle} from '../components/TestModal';
// import {Rate} from '../../product/models/rate_model';
// import {saleService} from '../services/SaleService';
// import {showMessage} from 'react-native-flash-message';
// import {CommonActions, useNavigation} from '@react-navigation/native';
// import {getSelectedClient} from '../context/saveSelectedClientStorage';
// import {getSelectedWarehouse} from '../context/saveSelectedWarehouseStorage';
// import IconLeft from '../../../../assets/icons/tabler/svg/filled/circle-chevron-left.svg';
// import IconTrash from '../../../../assets/icons/tabler/svg/filled/trash-x.svg';
// import IconConfig from '../../../../assets/icons/tabler/svg/outline/adjustments.svg';
// import {PreviewListProductSelectStyle} from './PreviewListProductSelectStyle';
// import {Client} from '../../clients/models/client_model';
// import {Warehouse} from '../../warehouse/models/warehouse';
// import {useTheme} from '../../../core/themes/useTheme';
// import { QuestionPrintModalHandle } from '../components/QuestionsPrint';
// import QuestionPrintModal from '../components/QuestionsPrint';
// import SaleConfigModal from '../components/SaleConfigModal';
// import {buildSaleObject} from '../functions/BuildObject'; // Tu función original
// import WaveDividerOne from '../components/svg/WaveDividerOne';
// import { SaleConfig, SaleConfigModalHandle } from '../functions/types/types';

// export const PreviewListProductSelect = () => {
//   const theme = useTheme();
//   const styles = PreviewListProductSelectStyle(theme);
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   // REFS
//   const printSendModalRef = useRef<QuestionPrintModalHandle>(null);
//   const saleConfigModalRef = useRef<SaleConfigModalHandle>(null);
//   const testModalRef = useRef<TestModalHandle>(null);

//   // REDUX & DATA
//   const cartItems = useSelector((state: RootState) => state.cart.cart);
//   const [rates, setRates] = useState<Rate[]>([]);
//   const [currentRate, setCurrentRate] = useState<Rate | null>(null);
//   const [currentClient, setCurrentClient] = useState<Client | null>(null);
//   const [currentWarehouse, setCurrentWarehouse] = useState<Warehouse | null>(null);
//   const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

//   // TOTALES
//   const totalAmount = cartItems.reduce((sum, item) => sum + (item.subTotal ?? 0), 0);

//   // CONFIGURACIÓN DE VENTA
//   const [saleConfig, setSaleConfig] = useState<SaleConfig>({
//     discount: {type: 'PERCENT', value: 0},
//     saleType: 'CASH',
//     amountTotal: {
//       amountMain: totalAmount,
//       amountCash: totalAmount,
//       amountQr: 0,
//       amountCard: 0,
//     },
//     paymentDelivered: {
//       amountMain: totalAmount,
//       amountCash: totalAmount,
//       amountQr: 0,
//       amountCard: 0,
//     }
//   });

//   useEffect(() => {
//     const loadSaleInfo = async () => {
//       try {
//         const warehouse = await getSelectedWarehouse();
//         const client = await getSelectedClient();
//         setCurrentWarehouse(warehouse);
//         setCurrentClient(client);
//       } catch (error) {
//         console.error('Error cargando info:', error);
//       }
//     };
//     loadSaleInfo();
//   }, []);

//   useEffect(() => {
//     setSaleConfig(prev => ({
//       ...prev,
//       amountTotal: {
//         ...prev.amountTotal!,
//         amountMain: totalAmount,
//         amountCash: prev.saleType === 'CASH' ? totalAmount : prev.amountTotal?.amountCash ?? 0
//       }
//     }));
//   }, [totalAmount]);

//   // Variables para la UI (Labels)
//   const received = (saleConfig.paymentDelivered?.amountCash ?? 0) + (saleConfig.paymentDelivered?.amountQr ?? 0);
//   const debt = saleConfig.saleType === 'CREDIT' ? Math.max(0, totalAmount - received) : 0;

//   const handlePay = async () => {
//     if (cartItems.length === 0 || !currentClient || !currentWarehouse) {
//       showMessage({ message: 'Información incompleta', type: 'danger' });
//       return;
//     }

//     // USANDO TU FUNCIÓN ORIGINAL buildSaleObject
//     const saleData = buildSaleObject({
//       cartItems,
//       client: currentClient,
//       warehouse: currentWarehouse,
//       discount: saleConfig.discount,
//       saleType: saleConfig.saleType,
//       amountTotal: saleConfig.amountTotal,
//       paymentDelivered: saleConfig.paymentDelivered,
//     });

//     try {
//       await saleService.store(saleData);
//       showMessage({ message: 'Venta registrada con éxito', type: 'success' });
//       dispatch(clearCart());
//       setTimeout(() => {
//         navigation.dispatch(CommonActions.reset({ index: 0, routes: [{name: 'Home'}] }));
//       }, 800);
//     } catch (error: any) {
//       showMessage({
//         message: 'Error al guardar',
//         description: error?.response?.data?.message ?? 'No se pudo guardar',
//         type: 'danger',
//       });
//     }
//   };

//   const formatMoney = (v: number) => v.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

//   return (
//     <>
//       <StatusBar backgroundColor={'#23305F'} barStyle="light-content" />
//       <View style={styles.container}>
//         <WaveDividerOne top={0} height={200} />
//         <View style={{height: 50}} />

//         <View style={{paddingHorizontal: 15, marginBottom: 10}}>
//           <View style={styles.row}>
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//               <IconLeft width={55} height={55} color={'#FFF'} />
//             </TouchableOpacity>
//             <View>
//                 <Text style={[styles.title, {color: '#FFF'}]}>Productos: {cartItems.length}</Text>
//                 {/* <Text style={{color: '#FFF'}}>{currentClient?.sFirstName} {currentClient?.sLastName}</Text> */}
//             </View>
//           </View>
//         </View>

//         <FlatList
//           data={cartItems}
//           contentContainerStyle={{paddingHorizontal: 15, paddingBottom: 120}}
//           keyExtractor={(item, index) => `${item.id}-${index}`}
//           renderItem={({item}) => (
//             <View style={styles.itemContainer}>
//                 <View style={styles.rowBetween}>
//                     <Text style={styles.name}>{item.warehouseProduct.product.name ?? item.warehouseProduct.product.name}</Text>
//                     <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
//                         <IconTrash width={28} height={28} color="#e74c3c" />
//                     </TouchableOpacity>
//                 </View>
//                 <TouchableOpacity onPress={() => { setSelectedItem(item); testModalRef.current?.open(); }}>
//                     <Text style={styles.detailText}>Cant: {item.amount} {item.warehouseProduct.unitMeasurement?.description}</Text>
//                     <View style={styles.subtotalContainer}>
//                         <Text style={styles.subtotalLabel}>SUBTOTAL</Text>
//                         <Text style={styles.subtotalValue}>Bs {formatMoney(item.subTotal ?? 0)}</Text>
//                     </View>
//                 </TouchableOpacity>
//             </View>
//           )}
//         />

//         {/* 🔹 FOOTER CON LABELS DE CRÉDITO / SALDO */}
//         <View style={[styles.summaryContainerManual, saleConfig.saleType === 'CREDIT' && { borderTopWidth: 5, borderTopColor: '#e74c3c' }]}> 
//           <View style={{flex: 1}}>
//             <Text style={styles.summaryInfoText}>Tipo Pago: 
//                 <Text style={{fontWeight: 'bold', color: saleConfig.saleType === 'CREDIT' ? '#e74c3c' : '#2ecc71'}}> {saleConfig.saleType === 'CASH' ? 'CONTADO' : 'CRÉDITO'}</Text>
//             </Text>
//             {saleConfig.saleType === 'CREDIT' && (
//                 <Text style={styles.summaryInfoText}>A cuenta: <Text style={{fontWeight: 'bold'}}>Bs {formatMoney(received)}</Text></Text>
//             )}
//           </View>
//           <View style={{alignItems: 'flex-end'}}>
//             <Text style={styles.totalAmountText}>Bs {formatMoney(totalAmount)}</Text>
//             {saleConfig.saleType === 'CREDIT' && (
//                 <Text style={{color: '#e74c3c', fontWeight: 'bold', fontSize: 13}}>DEUDA: Bs {formatMoney(debt)}</Text>
//             )}
//           </View>
//         </View>

//         <View style={styles.footerFixed}>
//           <View style={styles.row}>
//             <TouchableOpacity
//               onPress={() => saleConfigModalRef.current?.open(saleConfig)}
//               style={{backgroundColor: '#34495e', padding: 15, borderRadius: 15}}>
//               <IconConfig width={30} height={30} color="#fff" />
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.button, styles.flexButton, {backgroundColor: saleConfig.saleType === 'CREDIT' ? '#c0392b' : theme.colors.primary, marginLeft: 10}]}
//               onPress={handlePay}>
//               <Text style={styles.buttonText}>{saleConfig.saleType === 'CASH' ? 'GUARDAR VENTA' : 'GUARDAR CRÉDITO'}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <TestModal ref={testModalRef} product={selectedItem?.warehouseProduct ?? null} listRates={rates} initialAmount={selectedItem?.amount ?? 1} onSave={(val) => { dispatch(updateCartItemAmount({id: selectedItem!.id, amount: val})); testModalRef.current?.close(); }} />
//         <SaleConfigModal ref={saleConfigModalRef} onApply={(config: SaleConfig) => { setSaleConfig(config); dispatch(applyGlobalDiscount(config.discount)); }} />
//       </View>
//     </>
//   );
// };

import React, {useRef, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../hooks/reducer';
import { Dimensions, FlatList, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { applyGlobalDiscount, CartItem, clearCart, removeFromCart, updateCartItemAmount } from '../hooks/reducer/cartReducer';
import TestModal, {TestModalHandle} from '../components/TestModal';
import {Rate} from '../../product/models/rate_model';
import {saleService} from '../services/SaleService';
import {showMessage} from 'react-native-flash-message';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {getSelectedClient} from '../context/saveSelectedClientStorage';
import {getSelectedWarehouse} from '../context/saveSelectedWarehouseStorage';
import IconLeft from '../../../../assets/icons/tabler/svg/filled/circle-chevron-left.svg';
import IconTrash from '../../../../assets/icons/tabler/svg/filled/trash-x.svg';
import IconConfig from '../../../../assets/icons/tabler/svg/outline/adjustments.svg';
import {PreviewListProductSelectStyle} from './PreviewListProductSelectStyle';
import {Client} from '../../clients/models/client_model';
import {Warehouse} from '../../warehouse/models/warehouse';
import {useTheme} from '../../../core/themes/useTheme';
import { QuestionPrintModalHandle } from '../components/QuestionsPrint';
import QuestionPrintModal from '../components/QuestionsPrint';
import SaleConfigModal from '../components/SaleConfigModal';
import {buildSaleObject} from '../functions/BuildObject';
import WaveDividerOne from '../components/svg/WaveDividerOne';
import { SaleConfig, SaleConfigModalHandle } from '../functions/types/types';

export const PreviewListProductSelect = () => {
  const theme = useTheme();
  const styles = PreviewListProductSelectStyle(theme);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // REFS
  const printSendModalRef = useRef<QuestionPrintModalHandle>(null);
  const saleConfigModalRef = useRef<SaleConfigModalHandle>(null);
  const testModalRef = useRef<TestModalHandle>(null);

  // REDUX & DATA
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const [rates, setRates] = useState<Rate[]>([]);
  const [currentRate, setCurrentRate] = useState<Rate | null>(null);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [currentWarehouse, setCurrentWarehouse] = useState<Warehouse | null>(null);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.subTotal ?? 0), 0);

  const [saleConfig, setSaleConfig] = useState<SaleConfig>({
    discount: {type: 'PERCENT', value: 0},
    saleType: 'CASH',
    amountTotal: {
      amountMain: totalAmount,
      amountCash: totalAmount,
      amountQr: 0,
      amountCard: 0,
    },
    paymentDelivered: {
      amountMain: totalAmount,
      amountCash: totalAmount,
      amountQr: 0,
      amountCard: 0,
    }
  });

  
  const handleFinalize = () => {
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{name: 'SaleList'}] }));
  };

  useEffect(() => {
    const loadSaleInfo = async () => {
      try {
        const warehouse = await getSelectedWarehouse();
        const client = await getSelectedClient();
        setCurrentWarehouse(warehouse);
        setCurrentClient(client);
      } catch (error) { console.error('Error cargando info:', error); }
    };
    loadSaleInfo();
  }, []);

  useEffect(() => {
    setSaleConfig(prev => ({
      ...prev,
      amountTotal: {
        ...prev.amountTotal!,
        amountMain: totalAmount,
        amountCash: prev.saleType === 'CASH' ? totalAmount : prev.amountTotal?.amountCash ?? 0
      }
    }));
  }, [totalAmount]);

  // Lógica para saber qué labels de pago mostrar
  const getPaymentLabel = () => {
    const p = saleConfig.paymentDelivered;
    if (!p) return 'Ninguno';
    let methods = [];
    if (p.amountCash > 0) methods.push('Efectivo');
    if (p.amountQr > 0) methods.push('QR');
    if (p.amountCard > 0) methods.push('Tarjeta');
    return methods.length > 0 ? methods.join(' + ') : 'Por definir';
  };

  const handlePay = async () => {
    if (cartItems.length === 0 || !currentClient || !currentWarehouse) return;

    const saleData = buildSaleObject({
      cartItems,
      client: currentClient,
      warehouse: currentWarehouse,
      discount: saleConfig.discount,
      saleType: saleConfig.saleType,
      amountTotal: saleConfig.amountTotal,
      paymentDelivered: saleConfig.paymentDelivered,
    });

    try {
      await saleService.store(saleData);
      showMessage({ message: 'Venta registrada', type: 'success' });
      dispatch(clearCart());
      setTimeout(() => {
        navigation.dispatch(CommonActions.reset({ index: 0, routes: [{name: 'Home'}] }));
      }, 800);
    } catch (error: any) {
      showMessage({ message: 'Error al guardar', type: 'danger' });
    }
  };

  const formatMoney = (value: number) =>
    value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const renderItem = ({item}: {item: CartItem}) => {
    const product = item.warehouseProduct.product;
    const unit = item.warehouseProduct.unitMeasurement?.description ?? '';
    return (
      <TouchableOpacity onPress={() => { setSelectedItem(item); testModalRef.current?.open(); }} style={styles.itemContainer} activeOpacity={0.85}>
        <View style={styles.rowBetween}>
          <Text style={[styles.name, {flex: 9}]} numberOfLines={2}>{product.name ?? product.name}</Text>
          <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))} style={{flex: 1, alignItems: 'flex-end'}}>
            <IconTrash width={32} height={32} color="#1a7f9e" />
          </TouchableOpacity>
        </View>
        <Text style={styles.detailText}>Cantidad: {item.amount} {unit && `(${unit})`}</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.detailText}>Precio: Bs {item.price.toFixed(2)}</Text>
          <Text style={styles.discountText}>Desc.: Bs {(item.discount ?? 0).toFixed(2)}</Text>
        </View>
        <View style={styles.subtotalContainer}>
          <Text style={styles.subtotalLabel}>SUBTOTAL</Text>
          <Text style={styles.subtotalValue}>Bs {formatMoney(item.subTotal ?? 0)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={'#23305F'} barStyle="light-content" />
      <View style={styles.container}>
        <WaveDividerOne top={0} height={220} />
        <View style={{height: 60}} />

        <View style={{paddingHorizontal: 15}}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconLeft width={55} height={55} color={'#9b9b9bff'} />
            </TouchableOpacity>
            <Text style={styles.title}>Productos seleccionados: {cartItems.length}</Text>
          </View>
        </View>

        <FlatList
          data={cartItems}
          style={{paddingHorizontal: 15}}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay productos seleccionados.</Text>}
        />

        {/* 🔹 FOOTER DE RESUMEN CON TIPO DE PAGO Y SALDO */}
        <View style={styles.summaryContainerManual}> 
          <View style={{flex: 1}}>
            <Text style={styles.summaryInfoText}>
              Venta: <Text style={{fontWeight: '700'}}>{saleConfig.saleType === 'CASH' ? 'Contado' : 'Crédito'}</Text>
            </Text>
            <Text style={styles.summaryInfoText}>
              Pago: <Text style={{fontWeight: '700'}}>{getPaymentLabel()}</Text>
            </Text>
            {saleConfig.saleType === 'CREDIT' && (
              <Text style={styles.summaryInfoText}>
                Saldo: <Text style={{fontWeight: '700', color: '#e74c3c'}}>
                  Bs {formatMoney(totalAmount - (saleConfig.paymentDelivered?.amountMain ?? 0))}
                </Text>
              </Text>
            )}
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.totalAmountText}>Bs {formatMoney(totalAmount)}</Text>
          </View>
        </View>

        <View style={styles.footerFixed}>
          <View style={styles.row}>
            {/* BOTÓN REDONDO ORIGINAL */}
            <TouchableOpacity
              onPress={() => saleConfigModalRef.current?.open(saleConfig)}
              style={{backgroundColor: '#325284', borderRadius: 40}}>
              <IconConfig width={30} height={30} style={{margin: 15}} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.flexButton, {backgroundColor: theme.colors.primary}]}
              onPress={handlePay}>
              <Text style={styles.buttonText}>GUARDAR VENTA</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* MODALES */}
        <TestModal ref={testModalRef} product={selectedItem?.warehouseProduct ?? null} listRates={rates} initialAmount={selectedItem?.amount ?? 1} onSave={(n) => { dispatch(updateCartItemAmount({id: selectedItem!.id, amount: n})); testModalRef.current?.close(); }} />
        <QuestionPrintModal ref={printSendModalRef} onFinalize={handleFinalize} onPrint={() => {}} onSend={() => {}} />
        <SaleConfigModal ref={saleConfigModalRef} onApply={(config: SaleConfig) => { setSaleConfig(config); dispatch(applyGlobalDiscount(config.discount)); }} />
      </View>
    </>
  );
};