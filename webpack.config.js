// webpack.config.js
const path = require('path');

module.exports = {
  //... other configurations
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@utils": path.resolve(__dirname, "src/utils"),
          "@features": path.resolve(__dirname, "src/features"),
      '@pages': path.resolve(__dirname, 'src/pages'),

      // Add more aliases as needed
    },
  },
};