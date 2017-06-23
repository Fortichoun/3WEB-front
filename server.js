const express = require('express');
// const cors = require('cors');
const http = require('http');
const config = require('./services/config.js');
// const bodyParser = require('body-parser');

const app = express();
// const server = new http.Server(app);

// app.use(cors());
// app.options('*', cors());
app.listen(config.get('port'));
app.use(express.static('./public'));
app.use('*', require('./routes/routes.js'));
