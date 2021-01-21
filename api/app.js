const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./src/routes/user');
const addressRoutes = require('./src/routes/address');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/user', userRoutes);
app.use('/address', addressRoutes);

var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log('Servidor ON', port);
});