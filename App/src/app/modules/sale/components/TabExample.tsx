import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function App() {
  const sheetRef = useRef(null);

  const renderContent = () => (
    <View style={styles.bottomSheetContent}>
      <Text>Contenido del Bottom Sheet</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[250, 0]}  // Altura del Bottom Sheet y altura colapsada
        borderRadius={10}
        renderContent={renderContent}
      />
      <Text>Pantalla principal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 16,
    height: 250,
    alignItems: 'center',
  },
});
