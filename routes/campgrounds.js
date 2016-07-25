var express = require("express"),
 Campground= require("../models/campground"),
    router=  express.Router(),
    middleware = require("../middleware");

router.get("/", function(req,res){
    Campground.find({}, function(err,allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds : allCampgrounds});
        }
    });
    // 
});

router.get("/new" ,middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

router.post("/",middleware.isLoggedIn ,function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  var newCampground = {name : name , image : image , description: desc, author : author};
    //   campgrounds.push(newCampground);
    Campground.create(newCampground, function(err,newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds"); //redirect to 
        }
    });
    
//   res.send("You hit the POST route!"); 


});


router.get("/:id" , function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show" , {campground : foundCampground});
        }
    });
   
});


//EDIT
router.get("/:id/edit", middleware.checkCamgroundOwnership ,function(req,res){
        Campground.findById(req.params.id, function(err, foundCampground) {
             res.render("campgrounds/edit" , {campground : foundCampground} );   
        });
     });
   
//UPDATE
router.put("/:id",middleware.checkCamgroundOwnership,function(req,res){
 Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
     if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
 });
    });

//DELETE
router.delete("/:id",middleware.checkCamgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
             res.redirect("/campgrounds");
        }
    });
    
});



module.exports = router;