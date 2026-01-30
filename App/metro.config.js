const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

// 🔧 Modifica los assets y sourceExts
defaultConfig.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg');
defaultConfig.resolver.sourceExts = [...defaultConfig.resolver.sourceExts, 'svg'];

// Puedes seguir usando wrapWithReanimatedMetroConfig si lo necesitas
module.exports = mergeConfig(
  wrapWithReanimatedMetroConfig(defaultConfig),
  {
    resetCache: true,
  }
);
