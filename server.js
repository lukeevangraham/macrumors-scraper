var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require('body-parser')

var PORT = process.env.PORT || 3000;

var app = express();

var router = express.Router();

// Require our routes file pass our router object
require("./config/routes")(router);

// Make public a static folder
app.use(express.static("public"));

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: false,
}));

app.use(router);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(db), function(error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("mongoose connection is successful");
    }
};

app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
})

// Requiring the `mongoHeadlines` model for accessing the `mongoHeadline` collection
// var Example = require("./mongoHeadlines.js");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
// var axios = require("axios");
// var cheerio = require("cheerio");

// Require all models
// var db = require("./models");

 

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());






