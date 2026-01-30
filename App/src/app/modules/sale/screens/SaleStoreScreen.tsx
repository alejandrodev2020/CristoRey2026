import React, {useCallback, useEffect, useState} from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity, Dimensions,
} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerParamList} from '../../MainRoutes';
import BottomBar from '../../../shared/components/BottomBar';
import {warehouseService} from '../../warehouse/services/WarehouseService';
import Images from '../../../../assets/images/images';
import LinearGradient from 'react-native-linear-gradient';
import {saleStoreScreenStyle as style} from './SaleStoreScreenStyle';
import IconLeft from '../../../../assets/icons/tabler/svg/filled/circle-chevron-left.svg';
import {Warehouse} from '../../warehouse/models/warehouse';
import {saveSelectedWarehouse} from '../context/saveSelectedWarehouseStorage';
import {removeItemByKey} from '../context/saveSelectedClientStorage';
import {getWarehouseListFromStorage} from '../functions/pages/cacheWarehouseStorage';
import Svg, {Path, Rect} from 'react-native-svg';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { SaleStackParamList } from '../routes/SaleStackRoutes';

type Props = DrawerScreenProps<SaleStackParamList, 'SaleStoreMain'>;
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
export default function SaleStoreScreen({navigation}: Props) {
  const [listWarehouse, setListWarehouse] = useState<Warehouse[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 10;

  useFocusEffect(
    useCallback(() => {
      const init = async () => {
        await removeItemByKey('selectedWarehouse');

        const cachedList = await getWarehouseListFromStorage();

        if (cachedList && cachedList.length > 0) {
          setListWarehouse(cachedList);

          if (cachedList.length === 1) {
            await saveSelectedWarehouse(cachedList[0]);
            navigation.navigate('SelectClientSaleStore', {
              warehouseId: cachedList[0].id,
            });
          }

          return;
        }

        setPage(0);
        setHasMore(true);
        setListWarehouse([]);
        await loadItems();
      };

      init();
    }, []),
  );

  const loadItems = async () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    try {
      const query = `?Limit=${LIMIT}&Page=${page}`;
      const response = await warehouseService.getListWarehouse(query);
      const activeWarehouses = (response || []).filter(
        (item: any) => item.isActive,
      );

      if (activeWarehouses.length === 0) {
        console.warn('No hay almacenes activos disponibles.');
        setHasMore(false);
        return;
      }

      if (activeWarehouses.length === 1 && page === 0) {
        const warehouse = activeWarehouses[0];
        await saveSelectedWarehouse(warehouse);
        navigation.navigate('SelectClientSaleStore', {
          warehouseId: warehouse.id,
        });
        return;
      }

      // Si hay más de uno activo, los agregamos al estado
      setListWarehouse(prev => [...prev, ...activeWarehouses]);
      setPage(prev => prev + 1);

      if (activeWarehouses.length < LIMIT) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error cargando almacenes:', error);
    }

    setLoadingMore(false);
  };
  const WaveDivider = () => (
    <Svg
      viewBox="0 0 900 600"
      style={{position: 'absolute', top: screenHeight * 0}}
      width="100%"
      height={200}
      preserveAspectRatio="none">
      <Rect x="0" y="0" width="900" height="600" fill="#ffffffff" />
      <Path
        d="M0 93L15 101.2C30 109.3 60 125.7 90 129.8C120 134 150 126 180 139.7C210 153.3 240 188.7 270 194C300 199.3 330 174.7 360 171.5C390 168.3 420 186.7 450 178.3C480 170 510 135 540 129C570 123 600 146 630 153.5C660 161 690 153 720 134.3C750 115.7 780 86.3 810 92C840 97.7 870 138.3 885 158.7L900 179L900 0L885 0C870 0 840 0 810 0C780 0 750 0 720 0C690 0 660 0 630 0C600 0 570 0 540 0C510 0 480 0 450 0C420 0 390 0 360 0C330 0 300 0 270 0C240 0 210 0 180 0C150 0 120 0 90 0C60 0 30 0 15 0L0 0Z"
        fill="#23305F"
      />
    </Svg>
  );
  const goToClientSelection = async (warehouse: Warehouse) => {
    await saveSelectedWarehouse(warehouse);
    navigation.navigate('SelectClientSaleStore', {warehouseId: warehouse.id});
  };

  return (
    <>
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#23305F'}}
        edges={['top', 'left', 'right']}>
        <View style={style.container}>
          {/* <StatusBar backgroundColor={'#23305F'} barStyle="light-content" /> */}
          <WaveDivider />
          <View style={{top: 65, paddingHorizontal: 20}}>
            <View style={style.row}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <IconLeft
                  width={55}
                  height={55}
                  style={{margin: 0}}
                  color={'#9b9b9bff'}
                />
              </TouchableOpacity>
              <Text style={style.title}>Listado de Sucursales</Text>
            </View>
          </View>
          <View
            style={{
              top:65,
              height: 1,
              backgroundColor: 'black',
              marginTop: 10,
              marginHorizontal: 25,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.08,
              shadowRadius: 6,
              elevation: 6,
            }}
          />
          <FlatList
            style={{flex: 1, marginTop: 68, paddingHorizontal: 15}}
            data={listWarehouse}
            keyExtractor={(item, index) =>
              item.id?.toString() || index.toString()
            }
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => goToClientSelection(item)}>
                  <LinearGradient
                    style={style.cardBase}
                    colors={['#4c669f', '#3b5998', '#192f6a']}>
                    <View style={style.card}>
                      <Text style={style.cardTitle}>
                        Vista previa de Almacén
                      </Text>

                      <Image
                        source={Images.ui.icon_warehouse}
                        style={style.image}
                        resizeMode="contain"
                      />
                    </View>

                    <View style={style.footer}>
                      <View style={style.footerSection}>
                        <Text
                          style={{
                            fontFamily: 'Poppins-SemiBold',
                            color: '#000',
                          }}>
                          {item.name}
                        </Text>
                        <Text
                          style={{fontFamily: 'Poppins-Regular', fontSize: 12}}>
                          {item.description}
                        </Text>
                      </View>

                      <View style={style.divider} />

                      <View style={style.footerSection}>
                        <Text
                          style={{
                            fontFamily: 'Poppins-SemiBold',
                            color: '#000',
                          }}>
                          Código:
                        </Text>
                        <Text>Código: {item.code}</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            }}
            onEndReached={loadItems}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
              loadingMore ? (
                <ActivityIndicator
                  size="large"
                  color="#4285F4"
                  style={{marginVertical: 16}}
                />
              ) : null
            }
          />
          {/* <BottomBar /> */}
        </View>
      </SafeAreaView>
    </>
  );
}
