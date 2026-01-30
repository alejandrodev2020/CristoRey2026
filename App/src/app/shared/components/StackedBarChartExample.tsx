// StackedBarChartExample.tsx

import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { StackedBarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const StackedBarChartExample = () => {
  const data = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    legend: ['Producto A', 'Producto B', 'Producto C'],
    data: [
      [60, 60, 60],
      [30, 30, 60],
      [40, 20, 60],
      [70, 20, 30],
      [50, 20, 20],
      [20, 60, 30],
    ],
    barColors: ['#dfe4ea', '#70a1ff', '#5352ed'],
  };

  const chartConfig = {
    backgroundGradientFrom: '#1e90ff',
    backgroundGradientTo: '#3742fa',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    decimalPlaces: 0,
  };

  return (
    <ScrollView>
      <View style={{ marginVertical: 20, paddingHorizontal: 16 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: 10,
            color: '#fff',
            textAlign: 'center',
          }}
        >
          Ventas por producto
        </Text>
        <StackedBarChart
          data={data}
          width={screenWidth - 32}
          height={250}
          chartConfig={chartConfig}
          style={{
            borderRadius: 16,
          }}
          hideLegend={false}
        />
      </View>
    </ScrollView>
  );
};

export default StackedBarChartExample;
