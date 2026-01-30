import React, { useImperativeHandle, forwardRef, useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { WarehouseProduct } from '../../warehouse/models/warehouse_product';
import { Rate } from '../../product/models/rate_model';
import InputDecimal from '../../../shared/components/InputDecimal';
import ButtonGeneric from '../../../shared/components/ButtonGeneric';
import { IconPlus, IconMin, IconTag, IconBrandUnity, IconShoppingCart } from '../../../../assets/icons/tabler/svg';
import { useTheme } from '../../../core/themes/useTheme';
import CardAvaliable from './CardAvaliable';
import { getStyles } from './TabBarButtonStyles';
import { sortRatesBySelected, splitProductName } from '../functions/components/TabBarButton';

export type TestModalHandle = {
  open: () => void;
  close: () => void;
};

type TestModalProps = {
  product: WarehouseProduct | null;
  listRates: Rate[] | null;
  rate: Rate | null;
  discount: number | null;
};

const TabBarButton = forwardRef<TestModalHandle, TestModalProps>((props, ref) => {
  const modalizeRef = useRef<Modalize>(null);

  const [valor, setValor] = useState<number>(1);
  const [valorInput, setValorInput] = useState<string>('1');
  const [price, setPrice] = useState<number>(0);
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [discountPercent, setDiscountPercent] = useState<number>(props.discount ?? 0);
  const [subtotal, setSubtotal] = useState<number>(0);

  const theme = useTheme();
  const styles = getStyles(theme);

  useImperativeHandle(ref, () => ({
    open: () => modalizeRef.current?.open(),
    close: () => modalizeRef.current?.close(),
  }));

  // Actualizar price cuando cambian product o rate
  useEffect(() => {
    if (!props.product || !props.rate) return;

    const selected = props.product.product.listProductRate?.find(
      item => item.rateId === props.rate!.id,
    );

    if (selected) {
      setPrice(selected.price);
    } else {
      setPrice(0);
    }
  }, [props.rate, props.product]);

  // Actualizar subtotal y descuento al cambiar valor, price o discountPercent
  useEffect(() => {
    const rawTotal = valor * price;
    const discountAmount = rawTotal * (discountPercent / 100);
    const total = rawTotal - discountAmount;

    setDiscountValue(parseFloat(discountAmount.toFixed(2)));
    setSubtotal(parseFloat(total.toFixed(2)));
  }, [valor, price, discountPercent]);

  // Sincronizar descuento cuando cambie prop.discount
  useEffect(() => {
    if (props.discount !== null && props.discount !== undefined) {
      setDiscountPercent(props.discount);
    }
  }, [props.discount]);

  const handleInputChange = (text: string) => {
    setValorInput(text);
    const num = parseFloat(text);
    if (!isNaN(num)) {
      setValor(num);
    }
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
      default:
        console.log(`Acción desconocida: ${label}`);
    }
    setValor(newValue);
    setValorInput(newValue.toString());
  };

  const handleAdd = () => {
    // Aquí puede ir la lógica para agregar producto a carrito o lo que se requiera
    console.log('Agregar producto con:', {
      product: props.product,
      cantidad: valor,
      rate: props.rate,
      subtotal,
      discountPercent,
    });
  };

  if (!props.product || !props.listRates || !props.rate) {
    return (
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        childrenStyle={{ height: 370 }}
        withHandle
        panGestureEnabled
      >
        <View style={{ padding: 20 }}>
          <Text>Datos incompletos para mostrar el modal</Text>
        </View>
      </Modalize>
    );
  }

  const sortedRates = sortRatesBySelected(props.product.product.listProductRate, props.rate.id);

  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight
      childrenStyle={{ height: 600 }} // ajustado para contenido más grande
      withHandle
      panGestureEnabled
    >
      <View style={{ padding: 20 }}>
        {/* Nombre del producto */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <View style={{ width: '100%' }}>
            <Text style={styles.text}>
              <Text style={styles.firstWord}>
                {splitProductName(props.product.product.name)[0]}
              </Text>{' '}
            </Text>
          </View>
          {splitProductName(props.product.product.name)[1].length > 0 && (
            <View style={{ width: '100%' }}>
              <Text style={styles.text}>
                {splitProductName(props.product.product.name)[1]}
              </Text>
            </View>
          )}
        </View>

        {/* Unidad de medida y código */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconBrandUnity color={theme.colors.primary} />
            <Text
              style={{
                marginLeft: 6,
                color: theme.colors.primary,
                fontSize: 18,
                fontWeight: '500',
              }}
            >
              {props.product.unitMeasurement?.name}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconTag color={theme.colors.primary} />
            <Text
              style={{
                marginLeft: 6,
                color: theme.colors.primary,
                fontSize: 18,
                fontWeight: '500',
              }}
            >
              {props.product.product.code}
            </Text>
          </View>
        </View>

        {/* Lista de tarifas */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
        >
          {sortedRates?.map(item => {
            const isSelectedRate = item.rateId === props.rate!.id;
            const rateMatch = props.listRates!.find(r => r.id === item.rateId);
            const label = rateMatch ? `${rateMatch.description}` : `Precio ${item.id}`;
            return (
              <View
                key={item.id}
                style={[styles.rateChip, isSelectedRate && styles.rateChipSelected]}
              >
                <Text
                  style={[styles.rateChipText, isSelectedRate && styles.rateChipTextSelected]}
                >
                  {label}: Bs. {item.price}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        {/* Cantidad disponible */}
        <CardAvaliable
          count={props.product.amount}
          unitmeasurement={props.product.unitMeasurement?.name}
        />

        {/* Controles para cantidad */}
        <View style={{ height: 15 }} />

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
            <IconMin color={'#fff'} />
          </TouchableOpacity>
          <View style={{ width: 80 }}>
            <InputDecimal
              placeholder="1"
              value={valorInput}
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
            onPress={() => handlePress('FULL_PLUS')}
          >
            <IconPlus color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.customButton2}
            onPress={() => handlePress('DECIMAL_PLUS')}
          >
            <IconPlus color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Resumen de precios */}
        <View style={{ height: 10 }} />

        <View style={{ height: 80 }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Precio</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Des.: {discountPercent}%</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Sub. T.</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>{(price ?? 0).toFixed(2)}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>{(discountValue ?? 0).toFixed(2)}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>{(subtotal ?? 0).toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 15 }} />

        {/* Botón agregar */}
        <ButtonGeneric
          title="Agregar"
          shadow={true}
          icon={<IconShoppingCart width={30} height={30} fill={'#fff'} />}
          iconPosition="left"
          onPress={handleAdd}
        />
      </View>
    </Modalize>
  );
});

export default TabBarButton;
