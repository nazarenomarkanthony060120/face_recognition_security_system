const { withNativeWind } = require('nativewind/metro')
const {
  getSentryExpoConfig
} = require("@sentry/react-native/metro");

const config = getSentryExpoConfig(__dirname)
config.resolver.sourceExts.push('cjs')
module.exports = withNativeWind(config, { input: './global.css' })