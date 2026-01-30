import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

// Iconos e Imagenes
import EyeClose from '../../../../assets/icons/tabler/svg/outline/circle-x.svg'; // Asegúrate de que la ruta sea correcta
import { saleService } from '../services/SaleService'; 

export default function SaleDetailScreen({ route, navigation }: any) {
  const { saleId } = route.params;
  const [loading, setLoading] = useState(true);
  const [sale, setSale] = useState<any>(null);

  useEffect(() => {
    const fetchSaleDetail = async () => {
      try {
        setLoading(true);
        const response = await saleService.GetSaleById(saleId);
        if (response && response.data) {
          setSale(response.data);
        }
      } catch (error) {
        console.error("Error cargando detalle:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSaleDetail();
  }, [saleId]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#325284" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* ============================================================
          ENCABEZADO PERSONALIZADO (TU ESTILO)
      ============================================================ */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* Usando EyeClose como botón de cerrar */}
          <EyeClose width={40} height={40} color={'#325284'} />
        </TouchableOpacity>
        
        <View style={styles.headerRight}>
          <Text style={styles.headerText}>DETALLE DE VENTA</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* TARJETA DE TICKET */}
        <View style={styles.ticketCard}>
          <Text style={styles.orderNumber}>Comprobante de Orden #{sale?.order}</Text>
          <Text style={styles.clientName}>
            {sale?.client?.firstName} {sale?.client?.lastName}
          </Text>
          
          <View style={styles.divider} />

          {/* LISTA DE PRODUCTOS */}
          {sale?.details?.map((item: any) => (
            <View key={item.id} style={styles.productRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.productName}>{item.product?.name}</Text>
                <Text style={styles.productQty}>
                    {Math.floor(item.amount)} {item.unitMeasurenment?.name || 'Uds'} x {item.price}
                </Text>
              </View>
              <Text style={styles.productSubtotal}>Bs {item.subTotal.toFixed(2)}</Text>
            </View>
          ))}

          <View style={styles.divider} />

          {/* TOTAL */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalAmount}>Bs {sale?.amountTotal.toFixed(2)}</Text>
          </View>

          {/* QR DINÁMICO */}
          {sale?.codeQrLink && (
            <View style={styles.qrContainer}>
                <Text style={styles.qrLabel}>Escanea para verificar</Text>
                <Image 
                  source={{ uri: `data:image/png;base64,${sale.codeQrLink}` }} 
                  style={styles.qrImage}
                  resizeMode="contain"
                />
            </View>
          )}
        </View>

        <TouchableOpacity 
          style={styles.btnBack}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnBackText}>VOLVER AL LISTADO</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  // Tus clases de Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 45, // Ajusta según el notch de tu cel
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#325284',
  },
  // Clases del Ticket
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  ticketCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  orderNumber: { fontSize: 12, color: '#888', textAlign: 'center' },
  clientName: { fontSize: 20, fontWeight: 'bold', color: '#325284', textAlign: 'center', marginVertical: 10 },
  divider: { height: 1, backgroundColor: '#ddd', marginVertical: 15 },
  productRow: { flexDirection: 'row', marginBottom: 10 },
  productName: { fontSize: 14, color: '#333', fontWeight: 'bold' },
  productQty: { fontSize: 12, color: '#666' },
  productSubtotal: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: '#325284' },
  totalAmount: { fontSize: 18, fontWeight: 'bold', color: '#325284' },
  qrContainer: { alignItems: 'center', marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#eee' },
  qrLabel: { fontSize: 10, color: '#aaa', marginBottom: 10 },
  qrImage: { width: 200, height: 200 },
  btnBack: {
    backgroundColor: '#325284',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  btnBackText: { color: 'white', fontWeight: 'bold' }
});