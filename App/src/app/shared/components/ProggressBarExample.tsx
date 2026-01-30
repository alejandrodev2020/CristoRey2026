import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const ProgressBarExample = ({ progress }: { progress: number }) => {
const data = {
    labels: ['40%'], // Etiquetas (opcional)
    data: [0.4],         // Valores (de 0 a 1)
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 8,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 10,
          marginVertical: 0,
          fontWeight: 'bold',
        }}
      >
        Efectivo
      </Text>
      <ProgressChart
        data={data}
        width={screenWidth}
        height={120}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />
  
    </View>
  );
};

export default ProgressBarExample;
