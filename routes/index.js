var express = require("express"),
    router=  express.Router(),
    passport = require("passport"),
     User = require("../models/user");

router.get("/", function(req, res){
    // res.send("this will be landing page");
    
    res.render("landing");
});



//PASSPORT AUTH ROUTES
router.get("/register", function(req, res) {
    res.render("register");
});


router.post("/register", function(req, res) {
    var newUser= new User({
        username : req.body.username
    });
    User.register(newUser, req.body.password , function(err, user){
        if(err){
            // console.log(err);
            req.flash("error", err.message);
            return res.render("register")
        } else {
            passport.authenticate("local")(req,res, function(){
             
               res.redirect("/campgrounds"); 
                  req.flash("success", "Welcome " + user.username);
            });
        }
    });
});

//login 
router.get("/login", function(req, res) {
    
    res.render("login");
});

//app.post("/login", middleware, callback)
router.post("/login" , passport.authenticate("local", 
  {
      successRedirect: "/campgrounds",
      failureRedirect:"/login"
  }) , function(req, res) {
  });

//logout
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});


module.exports = router;