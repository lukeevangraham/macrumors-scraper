module.exports = function(router) {
    // render the home page
    router.get("/", function(req, res) {
        res.render("home");
    })

    //render the commented page
    router.get("/commented", function(req, res) {
        res.render("saved");
    })
}