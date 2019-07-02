var express = require("express");
var mongoose = require("mongoose");

var expressHandlebars = require("express-handlebars");

// Requiring the `mongoHeadlines` model for accessing the `mongoHeadline` collection
var Example = require("./mongoHeadlines.js");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();
 
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('home');
});
 

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);



app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });