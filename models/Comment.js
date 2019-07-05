var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;


// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var commentSchema = new Schema({
    // `title` is required and of type String
    _articleId : {
        type: Schema.Types.ObjectId,
        ref: "Article"
    },
    // `link` is required and of type String
    date: String,
    commentText: String
});

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model("Comment", commentSchema);

// Export the Article model
module.exports = Comment;
