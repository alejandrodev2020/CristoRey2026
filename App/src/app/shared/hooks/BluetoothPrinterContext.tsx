// context/BluetoothPrinterContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { BluetoothDevice } from 'react-native-bluetooth-classic';

type BluetoothPrinterContextType = {
  connectedDevice: BluetoothDevice | null;
  setConnectedDevice: (device: BluetoothDevice | null) => void;
};

const BluetoothPrinterContext = createContext<BluetoothPrinterContextType | undefined>(undefined);

export const BluetoothPrinterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);

  return (
    <BluetoothPrinterContext.Provider value={{ connectedDevice, setConnectedDevice }}>
      {children}
    </BluetoothPrinterContext.Provider>
  );
};

export const useBluetoothPrinter = () => {
  const context = useContext(BluetoothPrinterContext);
  if (!context) {
    throw new Error('useBluetoothPrinter must be used within a BluetoothPrinterProvider');
  }
  return context;
};
