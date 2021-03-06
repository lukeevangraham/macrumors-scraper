let scrape = require("../scripts/scrape");

let articlesController = require("../controllers/articles");
let commentsController = require("../controllers/comments");

module.exports = function (router) {
  // render the home page
  router.get("/", function (req, res) {
    let hbsObject = {
      home: true,
    };
    res.render("home", hbsObject);
  });

  //render the commented page
  router.get("/commented", function (req, res) {
    let hbsObject = {
      commented: true,
    };
    res.render("commented", hbsObject);
  });

  router.get("/api/fetch", function (req, res) {
    articlesController.fetch(function (err, docs) {
      // console.log("ERR: ", err.result.nInserted);
      if (err) {
        nInserted = err.result.nInserted;
        if (nInserted > 0) {
          res.json({
            message: "Added " + err.result.nInserted + " new articles!",
          });
        } else if (nInserted === 0) {
          res.json({
            message: "No new articles today.  Check back tomorrow!",
          });    
        }
        
      }
      // IF ALL 18 ARTICLES ARE IMPORTED:
      else if (docs) {
        res.json({
          message: "Added " + docs.insertedCount + " new articles!",
        });
        
      }
    });
  });

  router.get("/api/articles", function (req, res) {
    let query = {};
    if (req.query.commented) {
      query = req.query;
    }

    articlesController.get(query, function (data) {
      res.json(data);
    });
  });

  router.delete("/api/articles/:id", function (req, res) {
    let query = {};
    query._id = req.params.id;
    articlesController.delete(query, function (err, data) {
      res.json(data);
    });
  });

  router.patch("/api/articles", function (req, res) {
    articlesController.update(req.body, function (err, data) {
      res.json(data);
    });
  });

  router.get("/api/comments/:article_id?", function (req, res) {
    let query = {};
    if (req.params.article_id) {
      query._id = req.params.article_id;
    }

    commentsController.get(query, function (err, data) {
      res.json(data);
    });
  });

  router.delete("/api/comments/:id", function (req, res) {
    // console.log(req)
    let query = {};
    query._id = req.params.id;
    console.log(query);
    commentsController.delete(query, function (err, data) {
      res.json(data);
    });
  });

  router.post("/api/comments", function (req, res) {
    console.log("save comment routed");
    commentsController.comment(req.body, function (data) {
      res.json(data);
    });
  });
};
