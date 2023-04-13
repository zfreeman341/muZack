const { override, addWebpackPlugin } = require('customize-cra');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = override(
  // Replace main CSS file with output.css
  config => {
    config.plugins.forEach(plugin => {
      if (plugin instanceof MiniCssExtractPlugin) {
        plugin.options.filename = 'static/css/output.css';
      }
    });
    return config;
  },
  addWebpackPlugin(new MiniCssExtractPlugin({
    filename: 'static/css/output.css'
  }))
);
