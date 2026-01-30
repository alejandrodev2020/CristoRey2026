import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { saleService } from '../../services/SaleService';

interface Props {
  visible: boolean;
  data: any;
  onClose: () => void;
}

const SalePreviewIAScreen: React.FC<Props> = ({ visible, data, onClose }) => {
  const [operationType, setOperationType] = useState<number | null>(null);


  useEffect(() => {
    if (data?.type) {
      setOperationType(data.type);
    }
  }, [data]);



  const buildVentaPayload = () => {
  const clientId = data?.data?.client?.id;
  const details = data?.data?.details || [];

  const detailMapped = details.map((item: any) => {
    const amount = item.amountRequested;
    const firstRate = item?.listProductRate?.find((x: any) => x.price != null);
    const price = firstRate?.price ?? 0;

    return {
      productId: item.id,
      amount: amount,
      price: price,
      discount: 0,
      subTotal: amount * price,
      unitMeasurenmentSelectId: item.unitMeasurementId,
      updatePrice: false
    };
  });

  const amountMain = detailMapped.reduce(
    (sum: number, d: any) => sum + d.subTotal,
    0
  );

  // ⚡ RETORNAMOS EL OBJETO EXACTO PARA EL BACKEND
  return {
    amountTotal: {
      amountMain: amountMain
    },
    saleTypeId: 1,              // 1 = venta directa
    pettyCashId: 75,            // ⚠️ DEBES PONER TU pettyCashId REAL
    warehouseId: 1,             
    note: "",
    clientId: clientId,
    paymentTypeId: 1,           // contado/cash
    amountOfDebt: 0,
    amountRecived: 0,
    amountDiscountAditional: 0,
    DiscountPercentage: 0,
    paymentDelivered: {
      amountMain: 0,
      amountCash: 0,
      amountQr: 0,
      amountCard: 0
    },
    detail: detailMapped
  };
};

const handleSendSale = async () => {
  try {
    const payload = buildVentaPayload();
    const response = await saleService.store(payload);

    showMessage({
      message: "Venta registrada",
      description: "La venta fue guardada correctamente",
      type: "success",
    });

    onClose();

  } catch (error: any) {
    const message =
      error?.response?.data?.message ?? "No se pudo registrar la venta";

    showMessage({
      message: "Error",
      description: message,
      type: "danger",
    });
  }
};


const buildCotizacionPayload = () => {
  const clientId = data?.data?.client?.id;

  const details = data?.data?.details || [];

  const detailMapped = details.map((item: any) => {
    const amount = item.amountRequested;
    const firstRate = item?.listProductRate?.find((x: any) => x.price != null);
    const price = firstRate?.price ?? 0;

    return {
      productId: item.id,
      amount: amount,
      price: price,
      discount: 0,
      subTotal: amount * price,
      unitMeasurenmentSelectId: item.unitMeasurementId,
      updatePrice: false,
      updateDiscount: false
    };
  });

  // 🔥 FIX del reduce con tipado
  const amountMain = detailMapped.reduce(
    (sum: number, d: any) => sum + d.subTotal,
    0
  );

  const objData = {
    amountTotal: {
      amountMain: amountMain,
      amountCash: 0,
      amountQr: 0,
      amountCard: 0
    },
    amountDiscountAditional: 0,
    warehouseId: 1,
    note: "",
    clientId: clientId,
    rateSelectId: 1,
    discountPercentage: 0,
    detail: detailMapped
  };
  return objData;
};


    const handleSendQuotation = async () => {
      try {
        const payload = buildCotizacionPayload();
        console.log(payload,"MI PAYLOAD ARMADO");  
        if (!payload) return;

        const response = await saleService.storeQuotation(payload);

        // SI QUIERES MOSTRAR MENSAJE
        showMessage({
          message: "Cotización guardada",
          description: "La cotización fue registrada correctamente",
          type: "success",
        });

        onClose(); // Cerrar modal

      } catch (error: any) {
        const message =
          error?.response?.data?.message ?? "No se pudo registrar la cotización";

        showMessage({
          message: "Error",
          description: message,
          type: "danger",
        });
      }
    };

  if (!data) return null;

  const client = data?.data?.client;
  const details = data?.data?.details || [];
  const titleText =
    operationType === 2
      ? "PRE VISUALIZACIÓN DE COTIZACIÓN"
      : "PRE VISUALIZACIÓN DE VENTA";
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
            <Text style={styles.title}>{titleText}</Text>

          {/* CLIENTE */}
          <Text style={styles.label}>
            Cliente:
            <Text style={styles.value}>
              {" "} {client?.firstName} {client?.lastName}
            </Text>
          </Text>

          {/* DETALLES */}
          <Text style={[styles.label, { marginTop: 10 }]}>DETALLES:</Text>

          <ScrollView style={{ maxHeight: 250 }}>
            
            {details.map((item: any, index: number) => {

              const code = item?.code;
              const name = item?.name;
              const amount = item?.amountRequested;
              const priceList = item?.listProductRate;

              // 🔥 SIEMPRE TOMAR EL PRIMER RATE
              const firstRate = priceList && priceList.length > 0 ? priceList[0] : null;
              const price = firstRate?.price ?? 0;

              // 🔥 SUBTOTAL
              const subtotal = price * amount;

              return (
                <View key={index} style={styles.itemBox}>
                  <Text style={styles.itemText}>COD: {code}</Text>
                  <Text style={styles.itemText}>Nombre: {name}</Text>
                  <Text style={styles.itemText}>Cantidad: {amount}</Text>

                  <Text style={styles.itemText}>
                    Precio (Primer rate):{" "}
                    <Text style={{ fontWeight: "bold" }}>
                      {price}
                    </Text>
                  </Text>

                  <Text style={styles.itemText}>
                    Subtotal:{" "}
                    <Text style={{ fontWeight: "bold" }}>
                      {subtotal}
                    </Text>
                  </Text>
                </View>
              );
            })}

          </ScrollView>

       

          {operationType === 2 && (
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "green", marginTop: 10 }]}
              onPress={handleSendQuotation}
            >
              <Text style={styles.btnText}>Cotizar</Text>
            </TouchableOpacity>
          )}

          {operationType === 1 && (
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#E67E22", marginTop: 10 }]}
              onPress={handleSendSale}
            >
              <Text style={styles.btnText}>Vender</Text>
            </TouchableOpacity>
          )}


    
            <TouchableOpacity style={styles.btn} onPress={onClose}>
              <Text style={styles.btnText}>Cerrar</Text>
            </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default SalePreviewIAScreen;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center"
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 5,
  },

  value: {
    fontWeight: "400",
  },

  itemBox: {
    backgroundColor: "#f4f4f4",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  itemText: {
    fontSize: 14,
    marginBottom: 3,
  },

  btn: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});
