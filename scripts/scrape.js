// scrape script

var axios = require("axios");
var cheerio = require("cheerio");

let scrape = function (cb) {
    console.log("scrape initiated!")

    axios.get("https://www.macrumors.com/").then(function(response) {
        let $ = cheerio.load(response.data);

        // console.log("LOOK HERE: ", $)

        // console.log("THIS ONE: ", response.data)
        
        let scrapeCount = 0
        
        // var result = {};
        let result = [];
        
        $(".js-article").each(function (i, element) {
            
            let str = $(this).children(".js-content").find(".js-contentInner").text()
            
            let newTrimmedString = str.split('.')[0] + ".";

            let img = $(this).children(".js-content").find(".js-contentInner").find("img").attr('data-src');

            // console.log("IMG: ", img)

            // let byline = $(this).find("div[class^='byline-']").text()

            // console.log("LOOK HERE: ", byline)
            
            let dataToAdd = {
                article : $(this).find("h1").children("a").text(),
                link : $(this).find("h1").children("a").attr("href"),
                summary : newTrimmedString,
                byline : $(this).find("div[class^='byline-']").text(),
                image: img
            };
            // console.log("HERE: ", dataToAdd)

            result.push(dataToAdd);
            scrapeCount++;
        })
        // console.log("RESULT: ", result)
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