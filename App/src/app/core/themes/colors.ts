export type ThemeColors = {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  gradient: string[];
  button: {
    background: string;
    color: string;
  };
  card: {
    background: string;
    border?: string;
    text?: string;
      productName: {
        color?: string
      }
  };
};

export type AppTheme = {
  mode: 'light' | 'dark';
  colors: ThemeColors;
};

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: {
    background: '#FFFFFF',
    text: '#000000',
    primary: '#2980b9',
    secondary: '#e2e8f0',
    gradient: ['#84DFFF', '#4696FB'],
    button: {
      background: '#2980b9',
      color: '#ffffff', // ✅ Corregido
    },
    card: {
      background: '#eeeeee',
      border: '#e5e7eb',
      text: '#000000',
      productName:{
        color:'#000'
      }
    },
  },
};

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: {
    background: '#6b6b6bff',
    text: '#aaaaaa',
    primary: '#000000',
    secondary: '#03DAC6',
    gradient: ['#1e3c72', '#2a5298'],
    button: {
      background: '#2980b9',
      color: '#ffffff', // ✅ Corregido
    },
    card: {
      background: '#b5b7bbff',
      border: '#2d2d2d',
      text: '#ffffff',
      productName:{
        color:'#ffffff'
      }
    },
  },
};