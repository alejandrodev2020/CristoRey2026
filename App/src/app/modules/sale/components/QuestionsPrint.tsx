import React, {
  useImperativeHandle,
  forwardRef,
  useRef,
  useState,
  useEffect,
} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {Modalize} from 'react-native-modalize';
import ButtonGeneric from '../../../shared/components/ButtonGeneric';
// Importa IconPrinter (o el que uses para Imprimir)
import IconPrinter from '../../../../assets/icons/tabler/svg/outline/printer.svg';
// Mantenemos IconSend para Enviar (o podrías usar IconMail si lo tienes)
import IconSend from '../../../../assets/icons/tabler/svg/outline/send.svg';
import {useTheme} from '../../../core/themes/useTheme';
import {saleService} from '../services/SaleService';
import {BluetoothDevice} from 'react-native-bluetooth-classic';
import {useBluetoothPrinter} from '../../../shared/hooks/BluetoothPrinterContext';

export type QuestionPrintModalHandle = {
  open: (saleId: number) => void;
  close: () => void;
};

type QuestionPrintModalProps = {
  onPrint: (saleId: number) => void;
  onSend: (saleId: number) => void;
  onFinalize: () => void;
};

const QuestionPrintModal = forwardRef<
  QuestionPrintModalHandle,
  QuestionPrintModalProps
>(({onPrint, onSend, onFinalize}, ref) => {
  const modalizeRef = useRef<Modalize>(null);
  const theme = useTheme();
  const [currentSaleId, setCurrentSaleId] = useState<number | null>(null);
  // const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
  const {connectedDevice} = useBluetoothPrinter();
  useEffect(() => {
    return () => {
      if (connectedDevice) {
        connectedDevice.disconnect();
      }
    };
  }, [connectedDevice]);

  useImperativeHandle(ref, () => ({
    open: (saleId: number) => {
      setCurrentSaleId(saleId); // Guardamos el ID de la venta
      modalizeRef.current?.open();
      //    onFinalize();
    },
    close: () => {
      setCurrentSaleId(null);
      modalizeRef.current?.close();
      onFinalize();
    },
  }));

  const sendDataImagenNew = async (data: any) => {
    if (!connectedDevice) {
      Alert.alert(
        'No hay dispositivo',
        'Por favor, conecta una impresora primero.',
      );
      return;
    }
try {
  const objData = data.data;

  const notaId: string = objData?.id?.toString() || '---';
  const clienteNombre: string = `${objData?.client?.firstName || ''} ${objData?.client?.lastName || ''}`.trim();
  const fecha: string = objData?.saleDate?.split('T')[0] || '---';
  const vendedorNombre: string = `${objData?.user?.firstName || ''} ${objData?.user?.lastName || ''}`.trim();
  const tipoPago: string = `${objData?.paymentType?.name || ''}`.trim();

  const detalles: any[] = objData?.details || [];

  const lineHeight: number = 35;
  const spacing: number = 10;
  const baseHeight: number = 380;
  const dynamicHeight: number = detalles.length * (lineHeight * 4 + spacing * 2);
  const extraTotalsHeight: number = lineHeight * 4; // 3 líneas + margen
  const totalHeight: number = baseHeight + dynamicHeight + extraTotalsHeight;

  let cpclCommand: string =
    `! 0 200 200 ${totalHeight} 1\n` +
    `PW 576\n` +
    `TEXT 4 0 30 0 NOTA DE VENTA #${notaId} \n` +
    `TEXT 7 2 10 80 Cliente:\n` +
    `TEXT 7 4 120 80 ${clienteNombre}\n` +
    `TEXT 7 2 10 120 Fecha:\n` +
    `TEXT 7 2 120 120 ${fecha}\n` +
    `TEXT 7 2 10 160 Vendedor:\n` +
    `TEXT 7 4 120 160 ${vendedorNombre}\n` +
    `TEXT 7 2 10 200 Tipo Pago:\n` +
    `TEXT 7 4 125 200 ${tipoPago}\n`;

  let y: number = 270;
  cpclCommand += `TEXT 7 2 10 ${y} Detalles:\n`;
  y += lineHeight;

  detalles.forEach((item: any, index: number) => {
    y += spacing;

    const nombreProducto: string = item?.product?.name || '---';
    const cantidad: string = item?.amount?.toString() || '0';
    const precio: string = item?.price?.toFixed(2) || '0.00';
    const descuento: string = item?.discount?.toFixed(2) || '0.00';
    const subTotal: string = item?.subTotal?.toFixed(2) || '0.00';
    const precioFinal: string = (item?.subTotal - item?.discount).toFixed(2);

    cpclCommand += `TEXT 7 4 30 ${y} ${index + 1}. ${nombreProducto}\n`;
    y += lineHeight;
    cpclCommand += `TEXT 7 2 50 ${y} Cant: ${cantidad}  P.Unit: ${precio}\n`;
    y += lineHeight;
    cpclCommand += `TEXT 7 2 50 ${y} Subtotal: ${subTotal}  Desc: ${descuento}\n`;
    y += lineHeight;
    cpclCommand += `TEXT 7 2 50 ${y} Total Item: ${precioFinal}\n`;
    y += lineHeight;

    y += spacing;
  });

  y += spacing;

  const subTotalVenta: string = objData?.amountTotal?.toFixed(2) || '0.00';
  const descuentoAdicional: string = objData?.amountDiscountAditional?.toFixed(2) || '0.00';
  const totalFinal: string = objData?.totalFinish?.toFixed(2) || '0.00';

  cpclCommand += `TEXT 7 2 10 ${y} -----------------------------\n`;
  y += lineHeight;
  cpclCommand += `TEXT 7 2 30 ${y} Sub Total:       Bs ${subTotalVenta}\n`;
  y += lineHeight;
  cpclCommand += `TEXT 7 2 30 ${y} Des. Adicional:  Bs ${descuentoAdicional}\n`;
  y += lineHeight;
  cpclCommand += `TEXT 4 0 30 ${y} TOTAL:           Bs ${totalFinal}\n`;
  y += lineHeight;

  cpclCommand += `SET-TOF\nFORM\nPRINT\n`;

  await connectedDevice.write(cpclCommand, 'latin1');

  Alert.alert('Éxito', 'Nota de venta enviada a la impresora.');
}
 catch (error) {
      console.error('Error al enviar datos a la impresora:', error);
      Alert.alert('Error', 'No se pudo imprimir la nota de venta.');
    }
  };

  const handlePrintPress = async () => {
    if (currentSaleId) {
      console.log(currentSaleId, 'MI CURRENT SALE FOR PRINT');
      const response = await saleService.getSaleById(currentSaleId);
      sendDataImagenNew(response);
    }
  };

  const handleSendPress = () => {
    if (currentSaleId) {
      //   props.onSend(currentSaleId);
      onFinalize();
      console.log(currentSaleId, 'MI CURRENT SALE FOR SEND W');
      modalizeRef.current?.close();
    }
  };

  const moreLetter = () => {
    onFinalize();
    modalizeRef.current?.close();
  };

  return (
    <Modalize
      ref={modalizeRef}
      withHandle
      adjustToContentHeight
      panGestureEnabled>
      <View style={styles.container}>
        <Text style={styles.title}>Venta completada ✅</Text>

        <Text style={styles.subtitle}>
          ¿Qué deseas hacer con el comprobante de la Venta #
          {currentSaleId ?? '...'}?
        </Text>

        {/* Botón de Imprimir - Ahora con IconPrinter */}
        <ButtonGeneric
          title="Imprimir Comprobante"
          shadow={true}
          icon={<IconPrinter width={30} height={30} fill={'#fff'} />} // Icono de impresora
          iconPosition="left"
          onPress={handlePrintPress}
          style={styles.button}
        />

        {/* Botón de Enviar - Mantenemos IconSend */}
        <ButtonGeneric
          title="Enviar por Correo/WhatsApp"
          shadow={true}
          icon={<IconSend width={30} height={30} fill={'#fff'} />} // Icono de envío
          iconPosition="left"
          onPress={handleSendPress}
          style={[styles.button, {backgroundColor: theme.colors.secondary}]}
        />

        {/* Opción para cerrar/hacer luego */}
        <TouchableOpacity onPress={moreLetter} style={styles.laterButton}>
          <Text style={styles.laterButtonText}>Hacer más tarde</Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  button: {
    width: '100%',
    marginBottom: 15,
  },
  laterButton: {
    marginTop: 15,
    paddingVertical: 10,
  },
  laterButtonText: {
    fontSize: 16,
    color: '#A9A9A9',
  },
});

export default QuestionPrintModal;
