const express = require('express');
const config = require('./services/config.js');

const app = express();

app.listen(config.get('port'));
app.use(express.static('./public'));
app.use('*', require('./routes/routes.js'));
