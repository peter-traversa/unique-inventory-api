require('custom-env').env(process.env.ENV_TAG);
const secrets = require('./config/secrets.js');

const express = require('express');
const path = require('path');

let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let apiRoutes = require("./routes/api");

const app = express();
const port = process.env.PORT || 80;

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(bodyParser.json());

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

// Use Api routes in the App
app.use('/api', apiRoutes);

app.listen(port, () => console.log(`Listening on port ${port}...`));