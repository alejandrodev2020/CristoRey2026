import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StatusBar} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OrdersStackParamList } from '../routes/OrdersStackRoutes';
import { ordersService } from '../services/OrdersService';
import LinearGradient from 'react-native-linear-gradient';

type Props = NativeStackScreenProps<
  OrdersStackParamList,
  'OverviewOrdersById'
>;

export default function OverviewOrdersByIdScreen({ route }: Props) {
  const { orderId } = route.params;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const response = await ordersService.getOrderById(orderId);
        setOrder(response?.data ?? null);
      } catch (error) {
        console.error('Error cargando pedido:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#325284" />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={{ padding: 20 }}>
        <Text>No se pudo cargar la nota.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f6f8' }}>
      <StatusBar backgroundColor="#00317a" barStyle="light-content" />

      {/* ===== HEADER ===== */}
      <LinearGradient
        colors={['#325284', '#00317a']}
        style={{
          paddingTop: 50,
          paddingBottom: 30,
          paddingHorizontal: 20,
        }}>
        <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700' }}>
          Pedido #{order.id}
        </Text>
        <Text style={{ color: '#dfe6f1', marginTop: 4 }}>
          {new Date(order.quotationDate).toLocaleString('es-BO')}
        </Text>
      </LinearGradient>

      {/* ===== BODY ===== */}
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* INFO GENERAL */}
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 14,
            padding: 16,
            marginBottom: 16,
          }}>
          <Text style={{ fontWeight: '700', marginBottom: 6 }}>Cliente:</Text>
          <Text>
            {order.client?.firstName} {order.client?.lastName}
          </Text>

          <Text style={{ fontWeight: '700', marginTop: 10 }}>Vendedor:</Text>
          <Text>
            {order.user?.firstName} {order.user?.lastName}
          </Text>

          <Text style={{ fontWeight: '700', marginTop: 10 }}>
            Estado:
            </Text>

            <Text>
            {order?.quotationStatus?.id === 1 && 'Pendiente'}
            {order?.quotationStatus?.id === 2 && 'Vendido'}
          </Text>

          <Text style={{ fontWeight: '700', marginTop: 10 }}>Total:</Text>
          <Text>Bs {order.totalFinish?.toFixed(2)}</Text>
        </View>

        {/* PRODUCTOS */}
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 14,
            padding: 16,
          }}>
          <Text
            style={{
              fontWeight: '700',
              marginBottom: 10,
              fontSize: 16,
            }}>
            Productos
          </Text>

          {order.details?.map((item: any, index: number) => (
            <View
              key={index}
              style={{
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: '#eee',
              }}>
              <Text style={{ fontWeight: '600' }}>
                {item.product?.name}
              </Text>

              <Text style={{ color: '#555', fontSize: 13 }}>
                {item.amount}{' '}
                {item.unitMeasurenment?.name}{' '}
                × Bs {item.price?.toFixed(2)}
              </Text>

              <Text style={{ color: '#888', fontSize: 12 }}>
                Subtotal: Bs {item.subTotal?.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
