const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const config = require('./services/config.js');
const bodyParser = require('body-parser');

const app = express();
const server = new http.Server(app);

app.use(cors());
app.options('*', cors());

function listen() {
  server.listen(config.get('port'));
  console.log(`Server listening on port ${config.get('port')}`);
}

// Database connection
function connect() {
  return mongoose.connect(config.get('mongodb:uri')).connection;
}
app.use(bodyParser.json({ type: ['json', 'application/vnd.api+json'] }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

app.use('*', require('./routes/routes.js'));
app.use('/api/articles', require('./routes/articles.js'));
// require('./app/routes.js')(app);


// app.use(methodOverride('X-HTTP-Method-Override'));

