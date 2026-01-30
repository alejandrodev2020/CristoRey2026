import React, {
  useImperativeHandle,
  forwardRef,
  useRef,
  useState,
  useEffect,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import ButtonGeneric from '../../../shared/components/ButtonGeneric';
import {
  IconPlus,
  IconMin,
  IconTag,
  IconBrandUnity,
  IconShoppingCart,
} from '../../../../assets/icons/tabler/svg';
import {UnitMeasurement} from '../../product/models/category_model';
import {BaseClassifier} from '../../../shared/models/baseClassifier';
import {useTheme} from '../../../core/themes/useTheme';
import InputDecimal from '../../../shared/components/InputDecimal';
import { sortRatesBySelected, splitProductName} from '../functions/components/TabBarButton';
import {addToCart, CartItem} from '../hooks/reducer/cartReducer';
import {useDispatch} from 'react-redux';
import {productService} from '../../product/services/ProductService';
import PriceAdjustment, { PriceAdjustmentHandle} from './adjustments/PriceAdjustment';
import DiscountAdjustment, {
  DiscountAdjustmentHandle,
} from './adjustments/DiscountAdjustment';
import { Rate } from '../models/IProductsInterfaceIA';
import CardAvaliable from './CardAvaliable';
import { getStyles } from './TabBarButtonStyles';

export type TestModalHandle = {
  open: () => void;
  close: () => void;
};

type TestModalProps = {
  product?: any;
  listRates?: any;
  rate?: any;
  discount?: number | null;
  initialAmount?: number;
  onlyUnitMeasurement?: boolean;
  onEventTriggered?: (message: string) => void;
};

const TestModal = forwardRef<TestModalHandle, TestModalProps>((props, ref) => {
  const modalRef = useRef<Modalize>(null);
  const priceAdjustmentRef = useRef<PriceAdjustmentHandle>(null);
  const discountAdjustmentRef = useRef<DiscountAdjustmentHandle>(null);

  const theme = useTheme();
  const dispatch = useDispatch();
  const styles = getStyles(theme);

  const [price, setPrice] = useState<number>(0);
  const [equivalences, setEquivalences] = useState<any[]>([]);
  const [optionsList, setOptionsList] = useState<any[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);

  const [discountValue, setDiscountValue] = useState<number>(0);
  const [discountPercent, setDiscountPercent] = useState<number>(
    props.discount ?? 0,
  );
  const [subtotal, setSubtotal] = useState<number>(0);
  const [valor, setValor] = useState<number>(1);
  const [valorInput, setValorInput] = useState<string>('1');
  const [panEnabled, setPanEnabled] = useState(true);

  const sortEquivalencesByDefaultUnit = (
    equivalences: any[],
    defaultUnitMeasurementId: number,
  ) => {
    return [...equivalences].sort((a, b) => {
      if (a.unitMeasurementId === defaultUnitMeasurementId) return -1;
      if (b.unitMeasurementId === defaultUnitMeasurementId) return 1;
      return 0;
    });
  };

  const openPriceAdjustment = () => {
    priceAdjustmentRef.current?.open();
  };
  const openDiscountAdjustment = () => {
    discountAdjustmentRef.current?.open();
  };

  const handlePriceApply = (newPrice: number) => {
    setPrice(newPrice);
  };

  const sortedRates =
    props.product && props.product.product?.listProductRate
      ? sortRatesBySelected(
          props.product.product.listProductRate,
          props.rate?.id,
        )
      : [];

  const isOnlyUnit = props.onlyUnitMeasurement === true;

  useImperativeHandle(ref, () => ({
    open: () => modalRef.current?.open(),
    close: () => modalRef.current?.close(),
  }));

  // const handleAdd = () => {
  //   if (!props.product || !props.rate) return;

  //   const cartItem: CartItem = {
  //     id: `${props.product.id}-${props.rate.id}`,
  //     warehouseProduct: props.product,
  //     amount: valor,
  //     rateId: props.rate.id,
  //     price: parseFloat(subtotal.toFixed(2)),
  //   };

  //   dispatch(addToCart(cartItem));
  //   modalRef.current?.close();
  //   props.onEventTriggered?.(
  //     `Producto agregado: ${props.product.product.name}`,
  //   );
  // };
//   const handleAdd = () => {
//   if (!props.product) return;

//   const cartItem: CartItem = {
//     id: `${props.product.id}-${selectedOptionId ?? 0}`,

//     productId: props.product.product.id,
//     amount: valor,
//     price: price,
//     discount: parseFloat(discountValue.toFixed(2)),
//     subTotal: parseFloat(subtotal.toFixed(2)),
//     unitMeasurenmentSelectId: isOnlyUnit
//       ? props.product.unitMeasurement?.id
//       : props.product.equivalences?.find((e:any) => e.id === selectedOptionId)
//           ?.unitMeasurementId,

//     updatePrice: price !== props.product.suggestedPrice,

//     // 🧠 necesario para UI
//     warehouseProduct: props.product,
//   };

//   dispatch(addToCart(cartItem));
//   modalRef.current?.close();

//   props.onEventTriggered?.(
//     `Producto agregado: ${props.product.product.name}`,
//   );
// };
const handleAdd = () => {
  if (!props.product) return;

  // 🔹 Precio base
  const baseTotal = price * valor;

  // 🔹 DESCUENTO EN VALOR (ya calculado aquí)
  const discountAmount = parseFloat(discountValue.toFixed(2));

  // 🔹 SUBTOTAL FINAL
  const finalSubTotal = Math.max(0, baseTotal - discountAmount);

  const cartItem: CartItem = {
    id: `${props.product.id}-${selectedOptionId ?? 0}`,
    productId: props.product.product.id,
    amount: valor,
    price: price,

    // ✅ DESCUENTO SOLO EN Bs
    discount: discountAmount,

    // ✅ SUBTOTAL FINAL YA CALCULADO
    subTotal: parseFloat(finalSubTotal.toFixed(2)),

    unitMeasurenmentSelectId: isOnlyUnit
      ? props.product.unitMeasurement?.id
      : props.product.equivalences?.find(
          (e: any) => e.id === selectedOptionId,
        )?.unitMeasurementId,

    updatePrice: price !== props.product.suggestedPrice,
    warehouseProduct: props.product,
  };

  dispatch(addToCart(cartItem));
  modalRef.current?.close();
};

  const handlePress = (label: string) => {
    let newValue = valor;

    switch (label) {
      case 'DECIMAL_MINUS':
        newValue = Math.max(0, parseFloat((valor - 0.1).toFixed(2)));
        break;
      case 'DECIMAL_PLUS':
        newValue = parseFloat((valor + 0.1).toFixed(2));
        break;
      case 'FULL_MINUS':
        newValue = Math.max(0, valor - 1);
        break;
      case 'FULL_PLUS':
        newValue = valor + 1;
        break;
    }

    setValor(newValue);
    setValorInput(newValue.toString());
  };

  const loadEquivalences = async (productId: number) => {
    try {
      const response = await productService.getProductEquivalences(productId);
      if (response) {
        setEquivalences(response);
      }
    } catch (error) {
      console.error('Error cargando equivalencias:', error);
    }
  };

  useEffect(() => {
    if (!props.product || isOnlyUnit) return;

    const initialEquivalences = props.product.equivalences ?? [];

    if (!initialEquivalences.length) {
      setOptionsList([]);
      setSelectedOptionId(null);
      return;
    }

    const baseUnitId = props.product.unitMeasurement?.id;
    if (!baseUnitId) return;

    const ordered = sortEquivalencesByDefaultUnit(
      initialEquivalences,
      baseUnitId,
    );
    setOptionsList(ordered);
    const base =
      ordered.find(e => e.unitMeasurementId === baseUnitId) ?? ordered[0];
    setSelectedOptionId(base.id);
    setPrice(base.suggestedPriceSale ?? props.product.suggestedPrice ?? 0);
  }, [props.product, isOnlyUnit]);

  useEffect(() => {
    if (optionsList.length && selectedOptionId === null) {
      setSelectedOptionId(optionsList[0].id);
    }
  }, [optionsList, selectedOptionId]);

  useEffect(() => {
    const discountValueCalc = (price * valor * discountPercent) / 100;
    const subtotalCalc = price * valor - discountValueCalc;
    setDiscountValue(discountValueCalc);
    setSubtotal(subtotalCalc);
  }, [valor, price, discountPercent]);

  const handleInputChange = (text: string) => {
    setValorInput(text);
    const num = parseFloat(text);
    if (!isNaN(num) && text.trim() !== '') {
      setValor(num);
    }
  };

  if (!props.product) {
    return (
      <Modalize
        ref={modalRef}
        withHandle
        adjustToContentHeight
        modalStyle={{
          padding: 20,
          backgroundColor: 'white',
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
        }}>
        <View style={{padding: 20}}>
          <Text style={{textAlign: 'center', fontSize: 18}}>
            Selecciona un producto…
          </Text>
        </View>
      </Modalize>
    );
  }

  return (
    <>
      <Modalize
        ref={modalRef}
        withHandle
        adjustToContentHeight
        scrollViewProps={{
          nestedScrollEnabled: true,
          keyboardShouldPersistTaps: 'handled',
        }}
        onClosed={() => {
          setValor(1);
          setValorInput('1');
          setPanEnabled(true); // 🔥 RESET CLAVE
        }}
        modalStyle={{
          padding: 20,
          backgroundColor: 'white',
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
        }}>
        {/* 🔹 Nombre del producto */}
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <View style={{width: '100%'}}>
            <Text style={styles.text}>
              <Text style={styles.firstWord}>
                {splitProductName(props.product.product?.name ?? '')[0]}
              </Text>{' '}
            </Text>
          </View>

          {splitProductName(props.product.product?.name ?? '')[1]?.length >
            0 && (
            <View style={{width: '100%'}}>
              <Text style={styles.text}>
                {splitProductName(props.product.product?.name ?? '')[1]}
              </Text>
            </View>
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconBrandUnity color={theme.colors.primary} />
            <Text
              style={{
                marginLeft: 6,
                color: theme.colors.primary,
                fontSize: 18,
                fontWeight: '500',
              }}>
              {isOnlyUnit ? props.product.unitMeasurement?.name : 'Unidades'}
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconTag color={theme.colors.primary} />
            <Text
              style={{
                marginLeft: 6,
                color: theme.colors.primary,
                fontSize: 18,
                fontWeight: '500',
              }}>
              {props.product.product?.code}
            </Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {optionsList.map(item => {
            const isSelected = item.id === selectedOptionId;

            const label = isOnlyUnit
              ? props.listRates?.find((r: Rate) => r.id === item.rateId)
                  ?.description
              : item.unitMeasurement?.name;

            const priceValue = isOnlyUnit
              ? item.price
              : item.suggestedPriceSale ?? props.product?.suggestedPrice ?? 0;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => {
                  setSelectedOptionId(item.id);
                  setPrice(priceValue);
                }}>
                <View
                  style={[
                    styles.rateChip,
                    isSelected && styles.rateChipSelected,
                  ]}>
                  <Text
                    style={[
                      styles.rateChipText,
                      isSelected && styles.rateChipTextSelected,
                    ]}>
                    {label}: Bs. {priceValue.toFixed(2)}
                  </Text>

                  {isSelected && (
                    <View style={styles.checkContainer}>
                      <Text style={styles.checkText}>✓</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <CardAvaliable
          count={props.product.amount}
          unitmeasurement={props.product.unitMeasurement?.name}
        />

        <View style={{height: 15}} />

        {/* 🔹 Botones cantidad */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.customButton2}
            onPress={() => handlePress('DECIMAL_MINUS')}>
            <IconMin color={theme.colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.customButton}
            onPress={() => handlePress('FULL_MINUS')}>
            <IconMin color="#fff" />
          </TouchableOpacity>

          <View style={{width: 80}}>
            <InputDecimal
              placeholder="1"
              value={valorInput}
              keyboardType="numeric"
              style={{
                fontWeight: '800',
                fontSize: 24,
                width: 50,
                height: 50,
                textAlign: 'center',
              }}
              onChangeText={handleInputChange}
            />
          </View>

          <TouchableOpacity
            style={styles.customButton}
            onPress={() => handlePress('FULL_PLUS')}>
            <IconPlus color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.customButton2}
            onPress={() => handlePress('DECIMAL_PLUS')}>
            <IconPlus color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={{height: 10}} />
        <View style={{height: 50}}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity onPress={openPriceAdjustment}>
                <Text
                  style={{
                    fontWeight: '700',
                    color: theme.colors.primary,
                  }}>
                  Precio
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity onPress={openDiscountAdjustment}>
                <Text
                  style={{
                    fontWeight: '700',
                    color: theme.colors.primary,
                  }}>
                  Desc.: {discountPercent}%
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text  style={{
                    fontWeight: '700',
                    color: theme.colors.primary,
                  }}> Sub. T.</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', flex: 1}}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity onPress={openPriceAdjustment}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#000',
                    fontWeight: '700',
                  }}>
                  {price.toFixed(2)}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text   style={{
                    fontSize: 20,
                    color: '#000',
                    fontWeight: '700',
                  }}>{discountValue.toFixed(2)}</Text>
            </View>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text   style={{
                    fontSize: 20,
                    color: '#000',
                    fontWeight: '700',
                  }}>
              {subtotal.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={{height: 10}} />
        <ButtonGeneric
          title="Agregar"
          shadow
          icon={<IconShoppingCart width={30} height={30} fill="#fff" />}
          iconPosition="left"
          onPress={handleAdd}
        />

        <View style={{height: 20}} />
      </Modalize>
      <PriceAdjustment
        ref={priceAdjustmentRef}
        initialPrice={price}
        onApply={handlePriceApply}
      />
      <DiscountAdjustment
        ref={discountAdjustmentRef}
        basePrice={price * valor} // precio base actual
        initialPercent={discountPercent}
        onApply={(percent, discountValue) => {
          setDiscountPercent(percent);
          setDiscountValue(discountValue);
          const newSubtotal = price * valor - discountValue;
          setSubtotal(newSubtotal);
        }}
      />
    </>
  );
});

export default TestModal;
