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
    background: '#0f172a', // fallback SOLO si no hay gradient
    text: '#e5e7eb',
    primary: '#0f172a',
    secondary: '#1e293b',
    gradient: ['#0f172a', '#1e293b'], // 👈 ESTE ES EL FONDO REAL
    button: {
      background: '#1e40af',
      color: '#ffffff',
    },
    card: {
      background: 'rgba(255,255,255,0.08)',
      border: 'rgba(255,255,255,0.12)',
      text: '#ffffff',
      productName: {
        color: '#ffffff',
      },
    },
  },
};