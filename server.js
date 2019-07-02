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
var MONGODB_URI = process.env.MONGODB || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// Routes

app.get('/', function (req, res) {
    res.render('home');
});

app.get("/scrape", function(req, res) {
    console.log("begin scrape")
    axios.get("https://www.sandiegouniontribune.com/").then(function(response) {
        var $ = cheerio.load(response.data);

        
        $("div.PromoMedium-title").each(function(i, element) {
            var result = {};

            result.title = $(this)
            .children("a")
            .text();
            result.link = $(this)
            .children("a")
            .attr("href");

            db.Article.create(result)
            .then(function(dbArticle) {
                console.log(dbArticle);
            })
            .catch(function(err) {
                console.log(err);
            });

            // var title = $(element).children().text();
            // var link = $(element).find("a").attr("href");
            
            // results.push({
                // title: title,
                // link: link
            // });
            // console.log("look here", results)
            // db.scrapedData.insert(results)
        })

        res.send("Scrape Complete");
    })
})




app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });