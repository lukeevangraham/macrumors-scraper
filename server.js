var express = require("express");
var mongoose = require("mongoose");

var expressHandlebars = require("express-handlebars");

// Requiring the `mongoHeadlines` model for accessing the `mongoHeadline` collection
// var Example = require("./mongoHeadlines.js");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

// Make public a static folder
app.use(express.static("public"));

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');



// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// Routes

app.get('/', function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            // console.log(dbArticle);
            res.render('home', { article: dbArticle })
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

app.get("/scrape", function (req, res) {
    axios.get("https://www.macrumors.com/").then(function (response) {
        var $ = cheerio.load(response.data);
        let scrapeCount = 0

        var result = {};

        $(".article").each(function (i, element) {

            let str = $(this).children(".content").children(".content_inner").text()

            let newTrimmedString = str.split('.')[0] + ".";

            result.title = $(this)
                .children("h2.title").children("a")
                .text();
            result.link = $(this)
                .children("h2.title").children("a")
                .attr("href");
            result.summary = newTrimmedString

            db.Article.create(result)
                .then(function (dbArticle) {
                    // console.log(dbArticle);
                })
                .catch(function (err) {
                });

            scrapeCount++;
        })

        // make popup with how many articles were added

        res.send("Added " + scrapeCount + " new articles!");
        // res(home);

    })
})

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});




app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
})