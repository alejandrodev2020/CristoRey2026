import React, {useRef, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../hooks/reducer';
import { Dimensions, FlatList, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { applyGlobalDiscount, CartItem, clearCart, removeFromCart, updateCartItemAmount } from '../hooks/reducer/cartReducer';
import TestModal, {TestModalHandle} from '../components/TestModal';
import {Rate} from '../../product/models/rate_model';
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
import { ordersService } from '../services/OrdersService';
import WaveDividerOne from '../../sale/components/svg/WaveDividerOne';
import { buildSaleObject } from '../functions/BuildObject';
import { SaleConfig, SaleConfigModalHandle } from '../../sale/functions/types/types';
import QuestionPrintModal, { QuestionPrintModalHandle } from '../../sale/components/QuestionsPrint';
import OrdersConfigModal from '../components/OrdersConfigModal';
// import SaleConfigModal from '../../sale/components/SaleConfigModal';

export const PreviewListProductSelect = () => {
  const theme = useTheme();
  const styles = PreviewListProductSelectStyle(theme);
  const printSendModalRef = useRef<QuestionPrintModalHandle>(null);
  const saleConfigModalRef = useRef<SaleConfigModalHandle>(null);
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [rates, setRates] = useState<Rate[]>([]);
  const [currentRate, setCurrentRate] = useState<Rate | null>(null);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [currentWarehouse, setCurrentWarehouse] = useState<Warehouse | null>(
    null,
  );

  const [saleConfig, setSaleConfig] = useState<SaleConfig>({
    discount: {type: 'PERCENT', value: 0},
    saleType: 'CASH',
  });

  const [saleDiscount, setSaleDiscount] = useState<{
    type: 'PERCENT' | 'FIXED';
    value: number;
  }>({
    type: 'PERCENT',
    value: 0,
  });

  useEffect(() => {
    const loadSaleInfo = async () => {
      try {
        const warehouse = await getSelectedWarehouse();
        const client = await getSelectedClient();
        setCurrentWarehouse(warehouse);
        setCurrentClient(client);
      } catch (error) {
        console.error(
          'Error cargando la información del cliente o almacén:',
          error,
        );
      }
    };
    loadSaleInfo();
  }, []);

  const testModalRef = useRef<TestModalHandle>(null);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

  const openEditModal = (item: CartItem) => {
    setSelectedItem(item);
    testModalRef.current?.open();
  };

  const onSaveEdit = (newAmount: number) => {
    if (!selectedItem) return;
    dispatch(updateCartItemAmount({id: selectedItem.id, amount: newAmount}));
    setSelectedItem(null);
    testModalRef.current?.close();
  };

  const handleRemoveItem = (item: CartItem) => {
    dispatch(removeFromCart(item.id));
  };

const handlePay = async () => {
  if (cartItems.length === 0) {
    showMessage({
      message: 'El carrito está vacío',
      description: 'Agregue productos para poder realizar la venta.',
      type: 'warning',
    });
    return;
  }

  if (!currentClient || !currentWarehouse) {
    showMessage({
      message: 'Error de información',
      description:
        'No se pudo obtener la información del cliente o el almacén.',
      type: 'danger',
    });
    return;
  }

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
    const response = await ordersService.store(saleData);
    const saleId = response.data.data;

    // ✅ MENSAJE DE ÉXITO
    showMessage({
      message: 'Pedido Exitoso!',
      description: 'El Pedido se guardó correctamente.',
      type: 'success',
      backgroundColor: '#4CAF50',
      color: '#fff',
      icon: 'success',
      duration: 2500,
    });

    // Opcional: abrir modal de impresión
    // printSendModalRef.current?.open(saleId);

    dispatch(clearCart());

    // ⏳ Pequeño delay para que el usuario vea el mensaje
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      );
    }, 800);

  } catch (error: any) {
    showMessage({
      message: 'Error al guardar la venta',
      description:
        error?.response?.data?.message ?? 'No se pudo guardar la venta',
      type: 'danger',
      backgroundColor: '#D32F2F',
      color: '#fff',
      icon: 'auto',
    });
  }
};

  const handleSettings = () => {
    printSendModalRef.current?.open(20);
  };

  const handleFinalize = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'SaleList'}],
      }),
    );
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.subTotal ?? 0),
    0,
  );

  const formatMoney = (value: number) =>
    value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const renderItem = ({item}: {item: CartItem}) => {
    const product = item.warehouseProduct.product;
    const unit = item.warehouseProduct.unitMeasurement?.name ?? '';
    const price = item.price;
    const amount = item.amount ?? 1;
    const discount = item.discount ?? 0;
    const itemSubTotal =
      item.subTotal != null
        ? item.subTotal
        : Math.max(0, price * amount - discount);

    return (
      <TouchableOpacity
        onPress={() => openEditModal(item)}
        style={styles.itemContainer}
        activeOpacity={0.85}>
        <View style={styles.rowBetween}>
          <Text
            style={[styles.name, {flex: 9}]}
            numberOfLines={2}
            ellipsizeMode="tail">
            {product.name}
          </Text>

          <TouchableOpacity
            onPress={() => handleRemoveItem(item)}
            style={{flex: 1, alignItems: 'flex-end'}}>
            <IconTrash width={32} height={32} color="#1a7f9e" />
          </TouchableOpacity>
        </View>

        <Text style={styles.detailText}>
          Cantidad: {amount} {unit && `(${unit})`}
        </Text>

        <View style={styles.rowBetween}>
          <Text style={styles.detailText}>Precio: Bs {price.toFixed(2)}</Text>

          <Text style={styles.discountText}>
            Desc.: Bs {discount.toFixed(2)}
          </Text>
        </View>

        <View style={styles.subtotalContainer}>
          <Text style={styles.subtotalLabel}>SUBTOTAL</Text>
          <Text style={styles.subtotalValue}>
            Bs {formatMoney(itemSubTotal)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={'#23305F'} barStyle="light-content" />
      <View style={styles.container}>
        <WaveDividerOne top={screenHeight * 0} height={220} />
        <View style={{height: 60}}></View>

        <View style={{paddingHorizontal: 15}}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconLeft
                width={55}
                height={55}
                style={{margin: 0}}
                color={'#9b9b9bff'}
              />
            </TouchableOpacity>

            <Text style={styles.title}>
              Productos seleccionados: {cartItems.length}
            </Text>
          </View>
        </View>

        <FlatList
          data={cartItems}
          style={{paddingHorizontal: 15}}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No hay productos seleccionados.
            </Text>
          }
        />

        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 12,
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>

          <View style={{flex: 1}}>
            <Text style={{fontSize: 13, color: '#555', marginBottom: 2}}>
              Descuento:{' '}
              <Text style={{fontWeight: '600', color: '#000'}}>
                {saleDiscount.type === 'PERCENT'
                  ? `${saleDiscount.value}%`
                  : `Bs ${formatMoney(saleDiscount.value)}`}
              </Text>
            </Text>

            <Text style={{fontSize: 13, color: '#555'}}>
              Desc. adicional:{' '}
              <Text style={{fontWeight: '600', color: '#000'}}>Bs 0.00</Text>
            </Text>
          </View>

          {/* 🔹 TOTAL */}
          <View style={{alignItems: 'flex-end'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 26,
                color: '#000',
              }}>
              Bs {formatMoney(totalAmount)}
            </Text>
          </View>
        </View>

        <View style={styles.footerFixed}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                saleConfigModalRef.current?.open({
                  discount: saleDiscount,
                  saleType: 'CASH',
                  amountTotal: {
                    amountMain: totalAmount,
                    amountCash: totalAmount,
                    amountQr: 0,
                    amountCard: 0,
                  },
                });
              }}
              style={{backgroundColor: '#325284', borderRadius: 40}}>
              <IconConfig
                width={30}
                height={30}
                style={{margin: 15}}
                color="#fff"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.flexButton,
                {backgroundColor: theme.colors.primary},
              ]}
              onPress={handlePay}>
              <Text style={styles.buttonText}>GUARDAR PEDIDO</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TestModal
          ref={testModalRef}
          product={selectedItem?.warehouseProduct ?? null}
          listRates={rates}
          rate={currentRate}
          discount={0}
          initialAmount={selectedItem?.amount ?? 1}
        />
      </View>

      <QuestionPrintModal
        ref={printSendModalRef} 
        onPrint={id => {
        }}
        onSend={id => {
        }}
        onFinalize={handleFinalize}
      />
      <OrdersConfigModal
        ref={saleConfigModalRef}
        onApply={(config: SaleConfig) => {
          setSaleConfig(config);
          dispatch(applyGlobalDiscount(config.discount));
        }}
      />
    </>
  );
};
