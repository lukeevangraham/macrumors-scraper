// scrape script

var axios = require("axios");
var cheerio = require("cheerio");

let scrape = function (cb) {
    axios.get("https://www.macrumors.com/").then(function (response) {
        let $ = cheerio.load(response.data);
        
        let scrapeCount = 0
        
        // var result = {};
        let result = [];
        
        $(".article").each(function (i, element) {
            
            let str = $(this).children(".content").children(".content_inner").text()
            
            let newTrimmedString = str.split('.')[0] + ".";
            
            let dataToAdd = {
                article = $(this).children("h2.title").children("a").text(),
                link = $(this).children("h2.title").children("a").attr("href"),
                summary = newTrimmedString
            };

            result.push(dataToAdd);
        })
        cb(result)
    });
        //     db.Article.create(result)
        //     .then(function (dbArticle) {
        //         // console.log(dbArticle);
        //     })
        //     .catch(function (err) {
        //     });
            
        //     scrapeCount++;
        // })
        
        // // make popup with how many articles were added
        
        // res.send("Added " + scrapeCount + " new articles!");
        // // res(home);
}

module.exports = scrape;