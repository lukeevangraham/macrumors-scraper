



// Route for getting all Articles from the db
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

// A GET route for scraping the Macrumors website
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

app.post("/articles/:id", function (req, res) {
    console.log("REQUEST: ", req.body)
    db.Comment.create(req.body)
    .then(function (dbComment) {
        // If a Comment was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Comment
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { post: dbComment._id }, { new: true });
    })
    .then(function (dbArticle) {
        // console.log("dbArticle is: ", dbArticle)
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
    })
    .catch(function (err) {
        res.json(err);
    });
})

// Route for getting all Articles from the db as an object
app.get("/articles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
    .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
    })
    .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
    });
});





