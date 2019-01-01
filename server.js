const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`App is listening on port ${port}`) });

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

fs.readdirSync("controllers").forEach(function (file) {
  if(file.substr(-3) == '.js') {
    const route = require('./controllers/' + file);
    route.controller(app);
  }
})

app.get('/list_user', function (req, res) {
  console.log("Got a GET request for /list_user");
  res.send('Page Listing');
})

let compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
   noInfo: true, publicPath: webpackConfig.output.publicPath, stats:    { colors: true }
}));
app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.resolve(__dirname, 'dist')));