import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment'; // para formatear fechas, instala con: npm install moment

const screenWidth = Dimensions.get('window').width;

type Sale = {
  id: number;
  amountTotal: number;
  saleDate: string;
  warehouseId: number;
};

type ChartExampleProps = {
  salesData: Sale[];
};

const ChartExample: React.FC<ChartExampleProps> = ({ salesData }) => {
  // Ordenar por fecha ascendente para que la gráfica tenga sentido


const safeSales = Array.isArray(salesData) ? salesData : [];

const sortedSales = [...safeSales].sort(
  (a, b) => new Date(a.saleDate).getTime() - new Date(b.saleDate).getTime()
);

// ⚠️ Filtro para asegurar que amountTotal es un número válido
const validSales = sortedSales.filter(
  (sale) => typeof sale.amountTotal === 'number' && !isNaN(sale.amountTotal)
);

const labels = validSales.map((sale) =>
  moment(sale.saleDate).format('DD/MM')
);
const dataPoints = validSales.map((sale) => sale.amountTotal);






  const data = {
    labels,
    datasets: [
      {
        data: dataPoints,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#1538a3ff',
    backgroundGradientTo: '#1173a0ff',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    decimalPlaces: 2,
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#09a2b0ff',
    },
  };

  return (
    <ScrollView>
      <View style={{ marginVertical: 0, alignItems: 'flex-end' }}>
        <Text
          style={{
            color: '#071458ff',
            fontSize: 12,
            marginBottom: 0,
            fontFamily: 'Poppins-Regular',
          }}
        >
          Ventas 
        </Text>
        <LineChart
          data={data}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{
            borderRadius: 16,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default ChartExample;
