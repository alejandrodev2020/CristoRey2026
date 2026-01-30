import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, StatusBar, Dimensions, Image} from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../../MainRoutes';
// import { saleService } from '../services/SaleService';
import BottomBar from '../../../shared/components/BottomBar';
// import QuestionPrintModal, { QuestionPrintModalHandle } from '../components/QuestionsPrint';
import LinearGradient from 'react-native-linear-gradient';
import IconList from '../../../../assets/icons/tabler/svg/outline/align-justified.svg';
import IconFilter from '../../../../assets/icons/tabler/svg/outline/filter-2-search.svg';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {styles} from './OrdersListScreenStyle';
import Svg, { Path, Rect } from 'react-native-svg';
import Images from '../../../../assets/images/images';
import { ordersService } from '../services/OrdersService';
import QuestionPrintModal, { QuestionPrintModalHandle } from '../../sale/components/QuestionsPrint';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OrdersStackParamList } from '../routes/OrdersStackRoutes';


// type Props = DrawerScreenProps<DrawerParamList, 'OrdersList'>;
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
export default function OrdersListScreen() {
  const navigation =  useNavigation<NativeStackNavigationProp<OrdersStackParamList>>();
  const [items, setItems] = useState<any[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
   const printSendModalRef = useRef<QuestionPrintModalHandle>(null);
  const LIMIT = 5;

const getPaymentIcon = (paymentTypeId: number) => {
  switch (paymentTypeId) {
    case 1:
      return Images.ui.icon_cash;     // Efectivo
    case 2:
      return Images.ui.icon_qr;       // QR
    case 3:
      return Images.ui.icon_card;     // Tarjeta
    case 4:
      return Images.ui.icon_mixto;    // Pago mixto
    default:
      return Images.ui.icon_cash;     // fallback
  }
};

  useEffect(() => {
    loadItems(); // Carga inicial
  }, []);

    const WaveDivider = () => (
      <Svg
        viewBox="0 0 900 600"
        style={{position: 'absolute', top: screenHeight * 0.09}}
        width="100%"
        height={100}
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
      const query = `?ModeId=2&Limit=${LIMIT}&Page=${page}`;
      const response = await ordersService.getOrdersSale(query);
      const newItems = response.data.listQuotation || [];
                           
      const total = response.total || 0;
      setItems((prev) => [...prev, ...newItems]);
      setPage((prev) => {
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

  const openQuestion = (data: any)=>{
      console.log(data,"MI DATA");
      printSendModalRef.current?.open(data.id); 
  }


    const handleFinalize = () =>{
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{name: 'SaleList'}],
      //   }),
      // );
    }

const renderItem = ({ item }: { item: any }) => (
  <View style={styles.cardContainer}>

    {/* ================= HEADER ================= */}
    <View style={styles.cardHeader}>
      <Text style={styles.orderNumber}>Pedido #{item.id}</Text>
      <Text style={styles.saleDate}>
        {new Date(item.quotationDate).toLocaleString('es-BO', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })}
      </Text>
    </View>

    {/* ================= INFO ================= */}
    <View style={{ width: '100%', marginTop: 8 }}>
      <Text style={styles.clientInfo}>
        <Text style={styles.label}>Cliente:</Text>{' '}
        {item.client?.firstName} {item.client?.lastName}
      </Text>

      <Text style={styles.sellerInfo}>
        <Text style={styles.label}>Vendedor:</Text>{' '}
        {item.user?.firstName} {item.user?.lastName}
      </Text>

      <Text style={styles.sellerInfo}>
        <Text style={styles.label}>Monto:</Text>{' '}
        Bs {item?.totalFinish?.toFixed(2) ?? '0.00'}
      </Text>
    </View>

    {/* ================= FOOTER ================= */}
    <View style={styles.cardFooter}>

      {/* Estado */}
      <View style={getStatusStyle(item.quotationStatus?.name)}>
        <Text style={styles.statusText}>
          {item.quotationStatus?.name}
        </Text>
      </View>

      {/* Acciones */}
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          flexWrap: 'wrap',
        }}>

        {/* VER */}
<TouchableOpacity
  onPress={() =>
    navigation.navigate('OverviewOrdersById', {
      orderId: item.id,
    })
  }
  style={{
    backgroundColor: '#f2f0ff',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  }}>
  <Text
    style={{
      color: '#325284',
      fontWeight: '600',
      fontSize: 13,
    }}>
    Ver
  </Text>
</TouchableOpacity>

        {/* OPERAR (principal) */}
        <TouchableOpacity
          onPress={() => openQuestion(item)}
          style={{
            backgroundColor: '#eaf2ff', // azul pastel
            paddingHorizontal: 14,
            paddingVertical: 6,
            borderRadius: 20,
          }}>
          <Text
            style={{
              color: '#325284',
              fontWeight: '700',
              fontSize: 13,
            }}>
            Operar
          </Text>
        </TouchableOpacity>

        {/* CANCELAR (delicado, NO agresivo) */}
        <TouchableOpacity
          onPress={() => console.log('CANCELAR', item.id)}
          style={{
            backgroundColor: '#fdecec', // rosado bajito
            paddingHorizontal: 14,
            paddingVertical: 6,
            borderRadius: 20,
          }}>
          <Text
            style={{
              color: '#8a2c2c',
              fontWeight: '600',
              fontSize: 13,
            }}>
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>
    </View>

    {/* ================= DIVIDER INFERIOR ================= */}
    <View
      style={{
        marginTop: 12,
        height: 1,
        backgroundColor: '#e6e6e6',
      }}
    />
  </View>
);


  return (
    <>
     <StatusBar backgroundColor="#325284" barStyle="light-content" />
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
            <Text style={styles.header}>
              {/* Listado de Ventas  */}
              Mis Pedidos
            </Text>
            <Text style={{fontSize:12,color:'#fff'}}> Ultimas</Text>
          </View>
          <TouchableOpacity onPress={() => console.log('Perfil')}>
            <IconFilter width={30} height={30} color={'#ffffff'} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <WaveDivider />

    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={items}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={renderItem}
        onEndReached={loadItems}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          loadingMore ? (
            <ActivityIndicator size="large" color="#4285F4" style={{ marginVertical: 16 }} />
          ) : null
        }
      />
      <BottomBar />
       <QuestionPrintModal
            ref={printSendModalRef} // <--- ¡Asegúrate que el 'ref' esté aquí!
            onPrint={(id) => { console.log(`Imprimiendo venta: ${id}`) }}
            onSend={(id) => { console.log(`Enviando venta: ${id}`) }}
            onFinalize={handleFinalize}
         />
    </View>
    </>
  );
}
