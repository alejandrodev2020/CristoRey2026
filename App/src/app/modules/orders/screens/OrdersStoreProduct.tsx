import React, {useEffect, useRef, useState} from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView, TouchableOpacity, StatusBar, Dimensions, useColorScheme} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerParamList} from '../../MainRoutes';
import {warehouseService} from '../../warehouse/services/WarehouseService';
import {Category} from '../../product/models/category_model';
import {WarehouseProduct} from '../../warehouse/models/warehouse_product';
import {createOrdersStoreProductStyle} from './OrdersStoreProductStyle';
import {getSelectedWarehouse} from '../context/saveSelectedWarehouseStorage';
import {Warehouse} from '../../warehouse/models/warehouse';
import {getSelectedClient} from '../context/saveSelectedClientStorage';
import {Client} from '../../clients/models/client_model';
import {productService} from '../../product/services/ProductService';
import {Rate} from '../../product/models/rate_model';
import {getListRates, saveListRates} from '../context/saveListRatesStorage';
import {getDiscountValue} from '../models/EnumClientDiscount';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Path} from 'react-native-svg';
import EyeClose from '../../../../assets/icons/tabler/svg/filled/circle-chevron-left.svg';
import {useTheme} from '../../../core/themes/useTheme';
import AuthStorageService from '../../auth/services/AuthStorageService';
import BarcodeScanner from '../components/BarCodeScanner';
import FloatingSearchButton from '../components/FloatingSearchButton';
import BottomBarFloating from '../components/BottomBarFloating';
import TestModal, {TestModalHandle} from '../components/TestModal';
import {RootState} from '../hooks/reducer';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

type Props = DrawerScreenProps<DrawerParamList, 'OrdersStoreProduct'>;

export default function OrdersStoreProductScreen({route, navigation}: Props) {
  const [company, setCompany] = useState<any>(null);
  const {warehouseId, clientId} = route.params;
  const [hasMore, setHasMore] = useState(true);
  const [products, setProducts] = useState<WarehouseProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [limit] = useState(10);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState<string | null>('');
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [rates, setRates] = useState<Rate[]>([]);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] =
    useState<WarehouseProduct | null>(null);
  const [currentWarehouse, setCurrentWarehouse] = useState<Warehouse | null>(
    null,
  );
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [currentRate, setCurrentRate] = useState<Rate | null>(null);
  const [valueDiscount, setValueDiscount] = useState<number>(0);
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const selectedCount = cartItems.length;
  const testModalRef = useRef<TestModalHandle>(null);
  const scheme = useColorScheme();
  const theme = useTheme();
  const styles = createOrdersStoreProductStyle(theme);
  const isFirstLoadRef = useRef(true);

  const loadProductsByCode = async (code: string) => {
    try {
      const response = await warehouseService.getListProductWarehouseByCode(
        warehouseId,
        code,
      );

      if (response?.data) {
        const myObj = response.data;
        setSelectedProduct(myObj);
        testModalRef.current?.open();
      } else {
        setSelectedId(0);
        setProducts([]);
        setPage(0);
        setHasMore(true);
        setSearch('');
        loadProducts(true, 0, 0, null);
      }
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
    }
  };

  const handleEventTriggered = (message: string) => {
    setProducts([]);
    setPage(0);
    setHasMore(true);
    setSearch('');
    setSelectedId(0);
    loadProducts(true, 0, 0, null);
  };

  const handleSend = (text: string) => {
    setSearch(text);
    setSelectedId(0);
    setProducts([]);
    setPage(0);
    setHasMore(true);
  };

  const handleBarcodeScanned = (code: string) => {
    setSearch(code);
    setSelectedId(0);
    setProducts([]);
    setPage(0);
    setHasMore(true);
    loadProductsByCode(code);
  };

  useEffect(() => {
    const initializeScreen = async () => {
      const warehouse = await getSelectedWarehouse();
      if (!warehouse) {
        navigation.reset({
          index: 0,
          routes: [{name: 'OrdersStore'}],
        });
        return; // ⛔ NO seguir
      }
      setCurrentWarehouse(warehouse);
      const client = await getSelectedClient();
      setCurrentClient(client);
      if (client?.clientDiscountId) {
        const discountValue = getDiscountValue(client.clientDiscountId);
        setValueDiscount(discountValue);
      }

      const company = await AuthStorageService.getCompany();
      const configuration = await AuthStorageService.getConfiguration();

      setCompany(company);

      let activeRates: Rate[] = [];
      const savedRates = null;

      if (!savedRates) {
        const response = await productService.getListRates('?Limit=5&Page=0');
        const fetchedRates: Rate[] = response?.data?.listRates;
        if (fetchedRates && Array.isArray(fetchedRates)) {
          activeRates = fetchedRates.filter(r => r.isActive);
          await saveListRates(activeRates);
        }
      } else {
        activeRates = savedRates;
      }

      setRates(activeRates);

      let selectedRate: Rate | undefined;
      if (client?.clientRateId) {
        selectedRate = activeRates.find(r => r.id === client.clientRateId);
      }

      if (!selectedRate && activeRates.length > 0) {
        selectedRate = activeRates[0];
      }

      setCurrentRate(selectedRate ?? null);

      const categoryResponse = await warehouseService.getListCategory('');
      if (categoryResponse && Array.isArray(categoryResponse)) {
        const activeCategories = categoryResponse.filter(cat => cat.isActive);
        const allCategory = {
          id: 0,
          name: 'TODOS',
          description: 'Todas las categorías',
          isActive: true,
        };
        setCategories([allCategory, ...activeCategories]);
      }

      await loadProducts(true, selectedId, 0);
    };

    initializeScreen();
  }, []);

  const handleLoadMore = () => {
    if (
      loading ||
      loadingInitial ||
      !hasMore ||
      isFirstLoadRef.current ||
      search?.trim()
    ) {
      return;
    }

    loadProducts(false, selectedId, page + 1, null);
  };

  useEffect(() => {
    if (isFirstLoadRef.current) return;

    loadProducts(true, selectedId, 0, search);
  }, [search, selectedId]);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedId(categoryId);
    setProducts([]);
    setPage(0);
    setHasMore(true);
    setSearch('');
    loadProducts(true, categoryId, 0, null);
  };

  const loadProducts = async (
    initial = false,
    categoryId: number = selectedId,
    pageToLoad: number = 0,
    searchQuery: string | null = search,
  ) => {
    try {
      if (searchQuery?.trim()) {
        pageToLoad = 0; // ✅ FORZAMOS RESET
      }
      if (!initial) setLoading(true);

      let queryString = `?returnImage=false&WithStock=true&Limit=${limit}&Page=${pageToLoad}`;
      if (categoryId && categoryId > 0) {
        queryString += `&CategoryId=${categoryId}`;
      }

      if (searchQuery?.trim()) {
        queryString += `&Name=${encodeURIComponent(searchQuery)}`;
      }
      const response = await warehouseService.getListProductWarehouseById(
        warehouseId,
        queryString,
      );
      const newItems = response?.data?.listProducts ?? [];
      const total = response?.data?.total ?? 0;
      if (newItems.length === 0) {
        setHasMore(false);
        return;
      }

      setProducts(prev => (initial ? newItems : [...prev, ...newItems]));

      const accumulated = (initial ? 0 : products.length) + newItems.length;
      if (accumulated >= total) setHasMore(false);

      setPage(pageToLoad);
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setLoading(false);
      if (initial) {
        setLoadingInitial(false);
        isFirstLoadRef.current = false; // 🔓 AQUÍ
      }
    }
  };

  const handleShowAnimatedText = (item: WarehouseProduct) => {
    setSelectedProduct(item);
    setTimeout(() => {
      testModalRef.current?.open();
    }, 100);
  };

  const WaveDivider = () => (
    <Svg
      height={100}
      width="100%"
      viewBox="0 0 1440 320"
      style={{position: 'absolute', top: screenHeight * 0.15}}>
      <Path
        fill="#ffffffff"
        d="M0,192L80,165.3C160,139,320,85,480,106.7C640,128,800,224,960,240C1120,256,1280,192,1360,160L1440,128V320H0Z"
      />
    </Svg>
  );

  const onlyUnitMeasurement =
    company?.onlyUnitMeasurement === true &&
    company?.multiUnitMeasurement === false;
  const hasFilter = Boolean(search?.trim() || selectedId > 0);
  const filterLabel = search?.trim()
    ? `🔍 ${search}`
    : categories.find(c => c.id === selectedId)?.name;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#00317aff'} barStyle="light-content" />
      <TestModal
        ref={testModalRef}
        product={selectedProduct ?? null}
        onlyUnitMeasurement={onlyUnitMeasurement}
        listRates={selectedProduct ? rates : []}
        rate={selectedProduct ? currentRate : null}
        discount={selectedProduct ? valueDiscount : 0}
        initialAmount={1}
        onEventTriggered={handleEventTriggered}
      />
      <View style={styles.container2}>
        <LinearGradient
          colors={['#325284', '#00317aff']}
          start={{x: 1, y: 1}}
          end={{x: 1, y: 0}}
          style={styles.linear}>
          <View style={{paddingHorizontal: 15}}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
                marginTop: 0,
                borderRadius: 8,
                marginBottom: 10,
              }}>
              {[
                `Cliente: ${currentClient?.firstName ?? ''} ${
                  currentClient?.lastName ?? ''
                }`,
                onlyUnitMeasurement && `Precio: ${currentRate?.description}`,
                onlyUnitMeasurement &&
                  `Desc: ${getDiscountValue(
                    currentClient?.clientDiscountId ?? 1,
                  )}%`,
                `Suc: ${currentWarehouse?.name}`,
              ]
                .filter(Boolean)
                .map((text, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: '#e0e0e0',
                      borderRadius: 20,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                    }}>
                    <Text style={{fontSize: 13}}>{text}</Text>
                  </View>
                ))}
            </View>
          </View>
        </LinearGradient>
        <WaveDivider />

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EyeClose width={50} height={50} color={'#325284'} />
          </TouchableOpacity>
          {hasFilter && (
            <View style={styles.filterChip}>
              <Text style={styles.filterChipText}>{filterLabel}</Text>

              <TouchableOpacity
                onPress={() => {
                  setSearch('');
                  setSelectedId(0);
                  setProducts([]);
                  setPage(0);
                  setHasMore(true);
                }}
                style={styles.filterChipClose}>
                <Text style={styles.filterChipCloseText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.headerRight}>
            <Text style={styles.headerText}>MIS PRODUCTOS</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.choiceContainer}>
          {categories.map((item, index) => {
            const isSelected = item.id === selectedId;
            return (
              <TouchableOpacity
                key={`${item.id}-${index}`}
                onPress={() => handleCategorySelect(item.id)}
                style={[
                  styles.choiceButton,
                  isSelected && styles.choiceButtonSelected,
                ]}>
                <Text
                  style={[
                    styles.choiceText,
                    isSelected && styles.choiceTextSelected,
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <FloatingSearchButton onSend={handleSend} />
        <BarcodeScanner onCodeScanned={handleBarcodeScanned} />
        <FlatList
          data={products}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          style={{marginBottom: 90, paddingHorizontal: 16}}
          contentContainerStyle={{paddingBottom: 220}}
          keyboardShouldPersistTaps="handled"
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.productCard}
              onPress={() => handleShowAnimatedText(item)}>
              <View style={styles.productInfo}>
                {/* 🔹 Fila superior: Nombre + Código */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}>
                  <Text
                    style={[styles.productName, {flex: 8}]}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {item.product.name}
                  </Text>

                  <View
                    style={{
                      flex: 2,
                      backgroundColor: '#325284',
                      borderRadius: 50,
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      marginLeft: 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      {item.product.code}
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                    Categoría:
                  </Text>
                  <View style={{paddingHorizontal: 8}}>
                    <Text style={styles.categoryInfo}>
                      {item.product.category.name}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 0,
                  }}>
                  <Text
                    style={{fontFamily: 'Poppins-SemiBold', marginRight: 8}}>
                    Precio:
                  </Text>

                  {onlyUnitMeasurement ? (
                    item.product?.listProductRate
                      ?.filter(
                        rateItem =>
                          Number(rateItem.rateId) === Number(currentRate?.id),
                      )
                      .map((rateItem, index) => (
                        <View
                          key={rateItem.id ?? index}
                          style={{
                            borderRadius: 8,
                            paddingVertical: 4,
                            paddingHorizontal: 10,
                            marginRight: 6,
                          }}>
                          <Text
                            style={{
                              color: '#2f2f2fff',
                              fontFamily: 'Poppins-Bold',
                              fontSize: 13,
                            }}>
                            Bs {rateItem.price?.toFixed(2)}
                          </Text>
                        </View>
                      ))
                  ) : (
                    <Text
                      style={{
                        color: '#2f2f2fff',
                        fontFamily: 'Poppins-Bold',
                        fontSize: 13,
                      }}>
                      Bs {item.suggestedPrice?.toFixed(2)}
                    </Text>
                  )}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                      Cantidad:
                    </Text>
                    <View
                      style={{
                        backgroundColor: 'orange',
                        borderRadius: 50,
                        paddingHorizontal: 8,
                        marginLeft: 6,
                      }}>
                      <Text style={{color: '#fff', fontWeight: 'bold'}}>
                        {item.amount}
                      </Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                      Unidad M.:
                    </Text>
                    <View
                      style={{
                        backgroundColor: '#71a7a0ff',
                        borderRadius: 50,
                        paddingHorizontal: 8,
                        marginLeft: 6,
                      }}>
                      <Text style={{color: '#fff', fontWeight: 'bold'}}>
                        {item.unitMeasurement?.name}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading && !loadingInitial ? (
              <ActivityIndicator size="large" color="#4285F4" />
            ) : null
          }
          ListEmptyComponent={
            !loadingInitial ? (
              <Text style={{textAlign: 'center', marginTop: 20}}>
                No hay productos para mostrar.
              </Text>
            ) : null
          }
        />
      </View>
      <BottomBarFloating count={selectedCount} />
    </View>
  );
}
