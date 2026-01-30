import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const { height: screenHeight } = Dimensions.get('window');

type Props = {
  top?: number;
  height?: number;
  color?: string;
};

const WaveDividerOne = ({
  top = 0,
  height = 200,
  color = '#23305F',
}: Props) => {
  return (
    <Svg
      viewBox="0 0 900 600"
      style={{ position: 'absolute', top }}
      width="100%"
      height={height}
      preserveAspectRatio="none"
    >
      <Rect x="0" y="0" width="900" height="600" fill="#ffffffff" />
      <Path
        d="M0 93L15 101.2C30 109.3 60 125.7 90 129.8C120 134 150 126 180 139.7C210 153.3 240 188.7 270 194C300 199.3 330 174.7 360 171.5C390 168.3 420 186.7 450 178.3C480 170 510 135 540 129C570 123 600 146 630 153.5C660 161 690 153 720 134.3C750 115.7 780 86.3 810 92C840 97.7 870 138.3 885 158.7L900 179L900 0L885 0C870 0 840 0 810 0C780 0 750 0 720 0C690 0 660 0 630 0C600 0 570 0 540 0C510 0 480 0 450 0C420 0 390 0 360 0C330 0 300 0 270 0C240 0 210 0 180 0C150 0 120 0 90 0C60 0 30 0 15 0L0 0Z"
        fill={color}
      />
    </Svg>
  );
};

export default WaveDividerOne;
