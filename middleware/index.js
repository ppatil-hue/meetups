//middleware goes here
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCamgroundOwnership= function(req,res,next){
     //do user logged in ?
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Campground not found");
          res.redirect("back");
        } else {
            //does user own it , if so it can edit else not
            if(foundCampground.author.id.equals(req.user._id)){
               //res.render("campgrounds/edit" , {campground : foundCampground});  
               next();
            }else{
               // res.send("You dont have permissioon to edit");
                req.flash("error", "You dont have permission to edit");
              res.redirect("back");
                
            }
        }
    }); 
    } else {
       // res.send("You need to Logged in !");
       req.flash("error", "You need to logged in to do that !");
       res.redirect("back");
    }
 }


middlewareObj.checkCommentOwnership = function(req,res,next){
     //do user logged in ?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            req.flash("error", "Comment not found");
          res.redirect("back");
        } else {
            //does user own it , if so it can edit else not
            if(foundComment.author.id.equals(req.user._id)){
               //res.render("campgrounds/edit" , {campground : foundCampground});  
               next();
            }else{
               // res.send("You dont have permissioon to edit");
                 req.flash("error","You dont have permission to edit");
              res.redirect("back");
                
            }
        }
    }); 
    } else {
       // res.send("You need to Logged in !");
       req.flash("error", "You need to Logged in !");
       res.redirect("back");
    }
 }

middlewareObj.isLoggedIn =  function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to login in to do that !")
    res.redirect("/login");
};


module.exports = middlewareObj