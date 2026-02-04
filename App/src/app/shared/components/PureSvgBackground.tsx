import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Rect, RadialGradient } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

interface AuthBackgroundProps {
  baseColors: string[];     // Ej: ['#E6F0FF', '#FFFFFF'] o ['#0B1525', '#040810']
  waveColors: string[];     // Ej: ['#3B82F6', 'transparent'] o ['#FFFFFF', 'transparent']
}

export const PureSvgBackground = ({ baseColors, waveColors }: AuthBackgroundProps) => {
  const accent = waveColors[0];

  return (
    <View style={[StyleSheet.absoluteFill, { zIndex: -1 }]}>
      <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <Defs>
          {/* Fondo Base */}
          <LinearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={baseColors[0]} />
            <Stop offset="1" stopColor={baseColors[1]} />
          </LinearGradient>

          {/* Glow radial detrás */}
          <RadialGradient id="glow" cx="90%" cy="10%" rx="60%" ry="40%" fx="90%" fy="10%">
            <Stop offset="0" stopColor={accent} stopOpacity={0.2} />
            <Stop offset="1" stopColor={accent} stopOpacity="0" />
          </RadialGradient>

          {/* Relleno de la curva */}
          <LinearGradient id="curveFill" x1="1" y1="0" x2="0" y2="0.5">
            <Stop offset="0" stopColor={accent} stopOpacity={0.15} />
            <Stop offset="1" stopColor={accent} stopOpacity="0" />
          </LinearGradient>

          {/* Línea diagonal suave */}
          <LinearGradient id="diagonalLine" x1="1" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={accent} stopOpacity="0.3" />
            <Stop offset="1" stopColor={accent} stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* Capa 1: Fondo */}
        <Rect x="0" y="0" width={width} height={height} fill="url(#bg)" />

        {/* Capa 2: Glow radial */}
        <Rect x="0" y="0" width={width} height={height} fill="url(#glow)" />

        {/* Capa 3: Curva inferior */}
        <Path
          d={`M${width} 0 
              V${height * 0.1} 
              C ${width * 0.8} ${height * 0.1}, ${width * 0.4} ${height * 0.4}, 0 ${height * 0.35} 
              V0 
              H${width} Z`}
          fill="url(#curveFill)"
        />

        {/* Capa 4: Filo de luz de la curva */}
        <Path
          d={`M${width} ${height * 0.1} C ${width * 0.8} ${height * 0.1}, ${width * 0.4} ${height * 0.4}, 0 ${height * 0.35}`}
          fill="none"
          stroke={accent}
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Capa 5: Línea diagonal suave */}
        <Path
          d={`M${width} 0 L0 ${height * 0.3}`}
          stroke="url(#diagonalLine)"
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
};
