$(document).ready(function () {
    let articleContainer = $(".article-container");
    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.comments", handleArticleComments);
    $(document).on("click", ".btn.comment", handleSaveComment);
    $(document).on("click", ".btn.comment-delete", handleCommentDelete);

    initPage();

    function initPage() {
        articleContainer.empty();
        $.get("/api/articles?commented=true").then(function (data) {
            if (data && data.length) {
                renderArticles(data);
            }
            else {
                renderEmpty();
            }
        })
    }

    function createPanel(article) {
        // This function takes in a single JSON object for an article
        // It construction a jQuery element containing all of the formatted HTML for the
        // article panel
        let panel =
            $(["<div class='panel panel-default rounded p-2 mt-5'>",
                "<div class='row'>",
                // "<div class='col-5>",
                "<div class='col-9 panel-heading'>",
                "<h3><a target='blank' class='text-dark' href='",article.link,"'>",
                article.article,
                "</a></h3>",
                // "</div>",

                "<div class='panel-body'>",
                article.summary,
                "</div>",

                "</div>",
                "<div class='col-3'>",
                "<a class='btn btn-warning float-right delete mb-2'>",
                "Unsave",
                "</a>",
                "<a class='btn btn-secondary float-right comments'>Article Comments</a>",
                "</div>",
                "</div>",
                // "<div class='panel-body'>",
                // article.summary,
                // "</div>",
                "</div>",
            ].join(""));
        // We attach the article's id to the jQuery element
        // We will use this when trying to figure out which article the user wants to comment
        panel.data("_id", article._id);
        // return the constructed panel jQuery element
        return panel;
    }

    function renderArticles(articles) {
        let articlePanels = [];
        for (let i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        articleContainer.append(articlePanels)
    }

    function renderEmpty() {
        // This function renders some HTML to the page explaining we don't have any articles to view
        // Using a joined array of HTML string data because it's easier to read/change than a 
        // concatenated string
        let emptyAlert =
            $(["<div class='alert alert-warning text-center'>",
                "<h4>Uh Oh.  Looks like we don't have any commented articles.</h4>",
                "</div>",
                "<div class='panel panel-default'>",
                "<div class='panel-heading text-center'>",
                "<h3>Would You Like to Browse Available Articles?</h3>",
                "</div>",
                "<div class='panel-body text=center'>",
                // "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
                "<h4><a href='/'>Browse Articles</a></h4>",
                "</div>",
                "</div>",
            ].join(""));
        // Appending this data to the page
        articleContainer.append(emptyAlert);
    }

    function handleArticleDelete() {
        var articleToDelete = $(this).parents(".panel").data();
        $.ajax({
            method: "DELETE",
            url: "/api/articles/" + articleToDelete._id
        }).then(function (data) {
            if (data.ok) {
                initPage();
            }
        })
    }

    function handleArticleComments() {
        let currentArticle = $(this).parents(".panel").data();
        $.get("/api/comments/" + currentArticle._id).then(function (data) {
            var modalText = [
                "<div class='container-fluid text-center'>",
                "<h4>Comments For Article: ",
                currentArticle._id,
                "</h4>",
                "<hr />",
                "<ul class='list-group comment-container'>",
                "</ul>",
                "<textarea placeholder='New Comment' rows='4' cols='50'></textarea>",
                "<button class='btn btn-secondary comment'>Post Comment</button>",
                "</div>"
            ].join("");
            bootbox.dialog({
                message: modalText,
                closeButton: true
            })
            var commentData = {
                _id: currentArticle._id,
                comments: data || []
            };
            $(".btn.comment").data("article", commentData);
            renderCommentsList(commentData);
        })
    }

    function renderCommentsList(data) {
        let commentsToRender = []
        let currentComment;
        if (!data.comments.length) {
            currentComment = [
                "<li class='list-group-item'>",
                "No comments for this article yet.",
                "</li>"
            ].join("")
            commentsToRender.push(currentComment)
        }
        else {
            for (let i = 0; i < data.comments.length; i++) {
                currentComment = $([
                    "<li class='list-group-item comment'>",
                    data.comments[i].commentText,
                    "<button class='btn btn-danger comment-delete'>x</button>",
                    "</li>"
                ].join(""));
                currentComment.children("button").data("_id", data.comments[i]._id);
                commentsToRender.push(currentComment)
            }
        }
        $(".comment-container").append(commentsToRender)
    }

    function handleSaveComment() {
        let commentData
        let newComment = $(".bootbox-body textarea").val().trim();
        if (newComment) {
            commentData = {
                _id: $(this).data("article")._id,
                commentText: newComment
            }
            $.post("/api/comments", commentData).then(function () {
                bootbox.hideAll();
            })
        }
    }

    function handleCommentDelete() {
        let commentToDelete = $(this).data("_id");
        $.ajax({
            url: "/api/comments/" + commentToDelete,
            method: "DELETE"
        }).then(function () {
            bootbox.hideAll()
        })

    }
})