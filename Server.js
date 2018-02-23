/**
 * Created by indy-Ashish on 2/23/17.
 */
// calling packages
var express = require('express'); // express
var app = express(); // define express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var scraper = require('./helpers/scraper');

mongoose.connect('mongodb://ashish:ashish1234@ds143388.mlab.com:43388/scrapedgraph'); //mongodb://localhost/test; // connect to our database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to Database !!")
    scraper.scape();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 1337;


var router = express.Router();
require('./routes/routing')(app, router);
app.listen(port);

console.log('Server on port : ' + port);