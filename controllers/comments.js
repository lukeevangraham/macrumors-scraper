let Comment = require("../models/Comment")
let makeDate = require("../scripts/date")

module.exports = {
    get: function(data, cb) {
        Comment.find({
            _articleId: data._id
        }, cb)
    },
    comment: function(data, cb) {
        let newComment = {
            _articleId: data._id,
            date: makeDate(),
            commentText: data.commentText
        };

        Comment.create(newComment, function(err, doc) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(doc);
                cb(doc);
            }
        })
    },
    delete: function(data, cb) {
        Comment.remove({
            _id: data._id
        }, cb);
    }
}