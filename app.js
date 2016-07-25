var express = require("express"),
     app = express(),
     bodyParser = require("body-parser"),
     mongoose = require("mongoose"),
     Campground= require("./models/campground"),
     Comment= require("./models/comment"),
     User = require("./models/user"),
     passport = require("passport"),
     LocalStrategy = require("passport-local"),
     methodOverride = require("method-override"),
     seedDB = require("./seeds"),
     flash = require("connect-flash"),
     commentRoutes = require("./routes/comments"),
     campgroundRoutes = require("./routes/campgrounds"),
     indexRoutes = require("./routes/index");
     

mongoose.connect("mongodb://localhost/meet_ups");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// console.log(__dirname);
//seedDB(); //seed that db

//PASSPORT AUTH
app.use(require("express-session")({
    secret: "Once again Rusty wins",
    resave: false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error= req.flash("error");
    res.locals.success= req.flash("success");
    next();
});

app.use("/",indexRoutes);
app.use("/campgrounds" ,campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

// Campground.create(
//     {
//      name: "Google Groups" ,
//      image: "https://images.unsplash.com/photo-1453060113865-968cea1ad53a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=dbf7e068f988ce73daab5b44a42daedb",
//       description: "Google Coding Camp at SA,USA Time : 9 AM"
        
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else{
//             console.log("NEWLY CREATED MEETUP : ");
//             console.log(campground);
//         }
        
//     });

// var campgrounds = [
//     {name : "Quora" , image : "https://images.unsplash.com/photo-1461280360983-bd93eaa5051b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=fe8e0978645decb4051484d33cd40488"} ,
//     {name : "Google Groups" , image : "https://images.unsplash.com/photo-1453060113865-968cea1ad53a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=dbf7e068f988ce73daab5b44a42daedb" },
//     {name : "Art" , image : "https://images.unsplash.com/reserve/brBe5pGVSwGi0dC3192U_Sunset%20in%20Dunhuang.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=80cdd82467fcb5e8a110c0560192caf7" },
//     { name :"Geeks For Geeks" , image : "https://images.unsplash.com/photo-1453838956707-38a7aa3cd62d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=26a4b1453d89308542f535744050af40" },
//     {name : "Quora" , image : "https://images.unsplash.com/41/EOZpjI3oSqKPNnF2S4Tp_Untitled.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=924e055284f0649f6fb0eee93efee805"} ,
//     {name : "Trekk" , image : "https://images.unsplash.com/photo-1432817495152-77aa949fb1e2?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=25f6e062ab8d5b38e0c0d340e847969e" },
//     {name : "Android Developers" , image : "https://images.unsplash.com/photo-1429051883746-afd9d56fbdaf?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=533d700028277f3d53e0e6d4ac3bcc1c" },
//     { name :"Explorers" , image : "https://images.unsplash.com/photo-1455734729978-db1ae4f687fc?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=79f3d5413bf93c80833ac50a3f4323cf" },
//     {name : "Fashionics" , image : "https://images.unsplash.com/photo-1445633814773-e687a5de9baa?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=78d156057cd0b9c783aff7c304040b32"} ,
//     {name : "Photographers" , image : "https://images.unsplash.com/photo-1460132011327-1bcd44f7ae20?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=072385d4a3fbe4c925edb0e1d620a201" },
//     {name : "Get Inspired" , image : "https://images.unsplash.com/photo-1418225162054-0f773a996f9e?crop=entropy&fit=crop&fm=jpg&h=725&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375" },
//     { name :"Tedx" , image : "https://images.unsplash.com/41/EOZpjI3oSqKPNnF2S4Tp_Untitled.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=924e055284f0649f6fb0eee93efee805" }
//     ]; 


app.listen(process.env.PORT, process.env.IP , function(){
   console.log("Started!!");
});