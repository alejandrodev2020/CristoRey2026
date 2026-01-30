import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {saleService} from '../services/SaleService';
import BottomBar from '../../../shared/components/BottomBar';
import QuestionPrintModal, {
  QuestionPrintModalHandle,
} from '../components/QuestionsPrint';
import LinearGradient from 'react-native-linear-gradient';
import IconList from '../../../../assets/icons/tabler/svg/outline/align-justified.svg';
import IconFilter from '../../../../assets/icons/tabler/svg/outline/filter-2-search.svg';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {styles} from './SaleListScreenStyle';
import Svg, {Path, Rect} from 'react-native-svg';
import Images from '../../../../assets/images/images';
import {SaleStackParamList} from '../routes/SaleStackRoutes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import EyeClose from '../../../../assets/icons/tabler/svg/filled/circle-chevron-left.svg';

type Props = NativeStackScreenProps<SaleStackParamList, 'SaleList'>;
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
export default function SaleListScreen({navigation}: Props) {
  const [items, setItems] = useState<any[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const printSendModalRef = useRef<QuestionPrintModalHandle>(null);
  const LIMIT = 5;

  const getPaymentIcon = (paymentTypeId: number) => {
    switch (paymentTypeId) {
      case 1:
        return Images.ui.icon_cash; // Efectivo
      case 2:
        return Images.ui.icon_qr; // QR
      case 3:
        return Images.ui.icon_card; // Tarjeta
      case 4:
        return Images.ui.icon_mixto; // Pago mixto
      default:
        return Images.ui.icon_cash; // fallback
    }
  };

  useEffect(() => {
    loadItems(); // Carga inicial
  }, []);

  const WaveDivider = () => (
    <Svg
      viewBox="0 0 900 600"
      style={{position: 'absolute', top: screenHeight * 0.106}}
      width="100%"
      height={95}
      preserveAspectRatio="none">
      <Rect x="0" y="0" width="900" height="600" fill="#ffffffff" />
      <Path
        d="M0 93L15 101.2C30 109.3 60 125.7 90 129.8C120 134 150 126 180 139.7C210 153.3 240 188.7 270 194C300 199.3 330 174.7 360 171.5C390 168.3 420 186.7 450 178.3C480 170 510 135 540 129C570 123 600 146 630 153.5C660 161 690 153 720 134.3C750 115.7 780 86.3 810 92C840 97.7 870 138.3 885 158.7L900 179L900 0L885 0C870 0 840 0 810 0C780 0 750 0 720 0C690 0 660 0 630 0C600 0 570 0 540 0C510 0 480 0 450 0C420 0 390 0 360 0C330 0 300 0 270 0C240 0 210 0 180 0C150 0 120 0 90 0C60 0 30 0 15 0L0 0Z"
        fill="#00317aff"
      />
    </Svg>
  );

  const loadItems = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);

    try {
      const query = `?Limit=${LIMIT}&Page=${page}`;
      const response = await saleService.getListSale(query);
      const newItems = response?.listSale || [];
      const total = response.total || 0;
      setItems(prev => [...prev, ...newItems]);
      setPage(prev => {
        const nextPage = prev + 1;
        console.log('Siguiente página (desde callback):', nextPage);
        return nextPage;
      });

      if ((page + 1) * LIMIT >= total) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error cargando ventas:', error);
    }

    setLoadingMore(false);
  };
  const getStatusStyle = (statusName: string) => {
    switch (statusName?.toLowerCase()) {
      case 'completado':
        return styles.statusCompleted;
      case 'anulado':
        return styles.statusCanceled;
      case 'pendiente':
        return styles.statusPending;
      default:
        return styles.statusDefault;
    }
  };

  const openQuestion = (data: any) => {
    console.log(data, 'MI DATA');
    printSendModalRef.current?.open(data.id);
  };

  const handleFinalize = () => {
    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{name: 'SaleList'}],
    //   }),
    // );
  };

  // const renderItem = ({item}: {item: any}) => (
  //   <View style={styles.cardContainer}>
  //     <View style={styles.cardHeader}>
  //       <Text style={styles.orderNumber}>Venta #{item.id}</Text>
  //       <Text style={styles.saleDate}>
  //         {new Date(item.saleDate).toLocaleString('es-BO', {
  //           day: '2-digit',
  //           month: '2-digit',
  //           year: 'numeric',
  //           hour: '2-digit',
  //           minute: '2-digit',
  //           second: '2-digit',
  //           hour12: false, // ← IMPORTANTE: desactiva el AM/PM
  //         })}
  //       </Text>
  //     </View>

  //     <View style={{width: '100%', marginTop: 8}}>
  //       {/* 🔹 Fila 1 (tres columnas) */}
  //       <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
  //         {/* Cliente */}
  //         <View style={{width: '80%'}}>
  //           <Text style={styles.clientInfo}>
  //             <Text style={styles.label}>Cliente:</Text>{' '}
  //             {item.client?.firstName} {item.client?.lastName}
  //           </Text>
  //           <Text style={styles.sellerInfo}>
  //             <Text style={styles.label}>Vendedor:</Text> {item.user?.firstName}{' '}
  //             {item.user?.lastName}
  //           </Text>
  //           <Text style={styles.sellerInfo}>
  //             <Text style={styles.label}>Monto:</Text>{' '}
  //             {item?.totalFinish?.toFixed(2) ?? '0.00'}
  //           </Text>
  //         </View>

  //         <View style={{width: '20%', alignItems: 'center'}}>
  //           <Text style={styles.sellerInfo}>
  //             <Text style={styles.label}>Pago</Text>
  //           </Text>

  //           <Image
  //             source={getPaymentIcon(item.paymentTypeId)}
  //             style={{width: 35, height: 35, marginTop: 4}}
  //             resizeMode="contain"
  //           />
  //         </View>
  //       </View>
  //     </View>

  //     <View style={styles.cardFooter}>
  //       <View style={getStatusStyle(item.saleStatus?.name)}>
  //         <Text style={styles.statusText}>{item.saleStatus?.name}</Text>
  //       </View>
  //       <TouchableOpacity onPress={() => openQuestion(item)}>
  //         <Text>Operar</Text>
  //       </TouchableOpacity>
  //       <Text style={styles.paymentInfo}>
  //         <Text style={styles.label}>Monto:</Text> Bs{' '}
  //         {item?.totalFinish?.toFixed(2) ?? '0.00'}
  //       </Text>
  //     </View>
  //   </View>
  // );

  const renderItem = ({item}: {item: any}) => (
  <View style={styles.cardContainer}>
    {/* CABECERA */}
    <View style={styles.cardHeader}>
      <Text style={styles.orderNumber}>Venta #{item.id}</Text>
      <Text style={styles.saleDate}>
        {new Date(item.saleDate).toLocaleString('es-BO', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit', second: '2-digit',
          hour12: false,
        })}
      </Text>
    </View>

    {/* CUERPO CENTRAL */}
    <View style={{width: '100%', marginTop: 8}}>
      <View style={{flexDirection: 'row'}}>
        {/* Info Cliente/Vendedor */}
        <View style={{width: '80%'}}>
          <Text style={styles.clientInfo}>
            <Text style={styles.label}>Cliente:</Text> {item.client?.firstName} {item.client?.lastName}
          </Text>
          <Text style={styles.sellerInfo}>
            <Text style={styles.label}>Vendedor:</Text> {item.user?.firstName} {item.user?.lastName}
          </Text>
        </View>

        {/* Icono de Pago */}
        <View style={{width: '20%', alignItems: 'center'}}>
          <Text style={[styles.label, {fontSize: 10}]}>Pago</Text>
          <Image
            source={getPaymentIcon(item.paymentTypeId)}
            style={{width: 30, height: 30, marginTop: 4}}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>

    {/* PIE DE TARJETA CON BOTONES DE ACCIÓN */}
    <View style={styles.cardFooter}>
      {/* Estado a la izquierda */}
      <View style={getStatusStyle(item.saleStatus?.name)}>
        <Text style={styles.statusText}>{item.saleStatus?.name}</Text>
      </View>

      {/* Acciones al centro/derecha */}
      <View style={styles.actionsContainer}>
        {/* BOTÓN VER DETALLE */}
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => navigation.navigate('SaleDetail', { saleId: item.id })}
        >
          <EyeClose width={22} height={22} color="#23305F" />
        </TouchableOpacity>

        {/* BOTÓN CANCELAR / ELIMINAR */}
        {/* Solo mostramos eliminar si la venta no está ya cancelada */}
        {item.saleStatus?.name !== 'Cancelado' && (
          <TouchableOpacity 
            style={[styles.actionButton, {marginLeft: 10}]} 
            onPress={() => openQuestion(item)}
          >
            <EyeClose width={22} height={22} color="#e74c3c" />
          </TouchableOpacity>
        )}
      </View>

      {/* Monto a la derecha */}
      <Text style={styles.paymentInfo}>
        <Text style={styles.label}>Total: </Text>
        Bs {item?.totalFinish?.toFixed(2) ?? '0.00'}
      </Text>
    </View>
  </View>
);

  return (
    <>
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#325284'}}
        edges={['top', 'left', 'right']}>
        {/* <StatusBar backgroundColor="#325284" barStyle="light-content" /> */}
        <LinearGradient
          colors={['#325284', '#00317aff']}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradientContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <IconList width={30} height={30} color={'#ffffff'} />
            </TouchableOpacity>
            <View style={styles.centerSection}>
              <Text style={styles.header}>Listado de Ventas</Text>
              <Text style={{fontSize: 12, color: '#fff'}}> Ultimas</Text>
            </View>
            <TouchableOpacity onPress={() => console.log('Perfil')}>
              <IconFilter width={30} height={30} color={'#ffffff'} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <WaveDivider />

        <View style={styles.header2}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EyeClose width={50} height={50} color={'#325284'} />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <Text style={styles.headerText}>VENTAS</Text>
          </View>
        </View>

        <View style={styles.container}>
          <FlatList
            style={{flex: 1,paddingHorizontal:5}}
            data={items}
            keyExtractor={(item, index) =>
              item.id?.toString() || index.toString()
            }
            renderItem={renderItem}
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
          <BottomBar />
          <QuestionPrintModal
            ref={printSendModalRef} // <--- ¡Asegúrate que el 'ref' esté aquí!
            onPrint={id => {
              console.log(`Imprimiendo venta: ${id}`);
            }}
            onSend={id => {
              console.log(`Enviando venta: ${id}`);
            }}
            onFinalize={handleFinalize}
          />
        </View>

      </SafeAreaView>
    </>
  );
}
