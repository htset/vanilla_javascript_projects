const path = require('path');

module.exports = {
  "mode": "none",
  "entry": "./src/ui.js",
  "output": {
    "path": __dirname + '/dist',
    "filename": "bundle.js"
  },
  "devServer": {
    "static": path.join(__dirname, 'public/'),
    "devMiddleware": {
      "publicPath": '/dist/'
    },
    "port": 3000,
    "hot": "only"
  },
  "module": {
    "rules": [
      {
        "test": /\.js$/,
        "exclude": /node_modules/,
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": ["@babel/preset-env",]
          }
        }
      },
    ]
  }
};
