// config
require('custom-env').env(process.env.ENV_TAG);
const secrets = require('./config/secrets.js');
const port = process.env.PORT || 80;

// helpers
const path = require('path');
const jwt = require('jsonwebtoken');

// server tools
const express = require('express');
const mongoose = require('mongoose');

// express middleware
const bodyParser = require('body-parser');
const logger = require('morgan');

// routes
const apiRoutes = require("./routes/api");
const userRoutes = require('./routes/user');

// express set up
const app = express();

app.set('jwtSecretKey', secrets.jwtSecretKey);
app.use(logger('dev'));

// handle urlencoded and json post requests
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// handle errors
app.use(function(err, req, res, next) {
  if(err.status === 404)
  res.status(404).json({message: "Not found"});
  else 
    res.status(500).json({ok: false, error: err.message});
});

// connect to mongoDB
mongoose.connect(`mongodb://${secrets.mongoUsername}:${secrets.mongoPassword}@${secrets.mongoUrl}/${secrets.mongoDbs}`, {
	useNewUrlParser: true,
	connectTimeoutMS: 1000
}).catch((err) => {
	console.log('unable to connect to mongoDB.');
	console.error(err);
});;

var db = mongoose.connection;

mongoose.connection.on('open', function (ref) {
	console.log('Connected to mongo server.');
});

db.once('open', function() {
	console.log("Connected function...");
});

app.use('/', function (req, res, next) {
  console.log('sample middleware');
  next();
});

app.use(function(req, res, next) {
  console.log('sample middleware 2');
  next();
})

// routing
app.get('/', function (req, res) {
	res.json({
		message: `API is working.`
	});
});


// public routes
app.use('/users', userRoutes);

// private routes
function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('jwtSecretKey'), function(err, decoded) {

    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      req.body.email = decoded.email;
      next();
    }
  });
}

app.use('/api', validateUser, apiRoutes);

app.listen(port, () => console.log(`Listening on port ${port}...`));