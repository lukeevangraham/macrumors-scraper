var axios = require("axios");
var cheerio = require("cheerio");

let scrape = function (cb) {
    axios.get("https://www.macrumors.com/").then(function (response) {
        var $ = cheerio.load(response.data);
        let scrapeCount = 0



        var result = {};

        $(".article").each(function (i, element) {

            let str = $(this).children(".content").children(".content_inner").text()
            let maxLength = 135

            var trimmedString = str.substr(0, maxLength)
            trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))

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
                    // console.log(err);
                });

            scrapeCount++;
        })

        // make popup with how many articles were added

        res(home);
    })
}

module.exports = scrape;