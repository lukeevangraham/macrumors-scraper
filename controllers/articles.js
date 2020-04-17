let scrape = require("../scripts/scrape");
let makeDate = require("../scripts/date");

let Article = require("../models/Article");

module.exports = {
    fetch: function(cb) {
        scrape(function(data) {
            let headlines = data;
            for (let i = 0; i < headlines.length; i++) {
                headlines[i].date = makeDate();
                headlines[i].commented = false;
            }

            Article.collection.insertMany(headlines, {ordered:false}, function(err, docs) {
                // console.log("DB DOCS: ", docs)
                // console.log("ERR: ", err.result.nInserted)
                cb(err, docs);
            })
        })
    },
    delete: function(query, cb) {
        Article.remove(query, cb)
    },
    get: function(query, cb) {
        Article.find(query)
        .sort({
            _id: -1
        })
        .exec(function(err, doc) {
            cb(doc);
        })
    },
    update: function(query, cb) {
        Article.update({_id: query._id}, {
            $set: query
        }, {}, cb);
    }
}