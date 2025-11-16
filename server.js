const express = require('express');
const path = require('node:path');
const routes = require('./routes/main');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use('/', routes);

app.listen(4000, () => console.log('Example app listening on port 4000!'));