const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)
  config.resolve.alias['../Utilities/Platform'] =
    'react-native-web/dist/exports/Platform';
  config.resolve.alias['../../Utilities/Platform'] =
    'react-native-web/dist/exports/Platform';
  config.resolve.alias['./Platform'] =
    'react-native-web/dist/exports/Platform';
  config.resolve.alias["./RCTAlertManager"] =
    "react-native-web/dist/exports/Alert";
  config.resolve.alias["./RCTNetworking"] =
    "identity-obj-proxy";
  config.resolve.alias["../../Image/Image"] =
    'react-native-web/dist/exports/Image';
  config.resolve.alias['../../StyleSheet/PlatformColorValueTypes'] =
    'identity-obj-proxy';
  config.resolve.alias['./PlatformColorValueTypes'] =
    'identity-obj-proxy';
  config.resolve.alias['../Utilities/BackHandler"'] =
    "react-native-web/dist/exports/BackHandler";
  config.resolve.alias['../Components/AccessibilityInfo/legacySendAccessibilityEvent'] =
    "identity-obj-proxy";
  config.resolve.alias['./BaseViewConfig'] =
    "identity-obj-proxy";
  config.resolve.alias['../DevToolsSettings/DevToolsSettingsManager'] =
    "identity-obj-proxy";
  config.resolve.alias['../Utilities/BackHandler'] =
    "react-native-web/dist/exports/BackHandler";
  return config
}
