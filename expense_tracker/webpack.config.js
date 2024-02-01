const path = require('path');

module.exports = {
  "mode": "none",
  "entry": "./src/app.js",
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
};
