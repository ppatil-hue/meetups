var mongoose = require("mongoose"),
     Campground= require("./models/campground"),
     Comment= require("./models/comment");
     
     var data= [
         {
     name: "Google Groups" ,
     image: "https://images.unsplash.com/photo-1453060113865-968cea1ad53a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=dbf7e068f988ce73daab5b44a42daedb",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
        },
        {
            name : "Art" , 
            image : "https://images.unsplash.com/reserve/brBe5pGVSwGi0dC3192U_Sunset%20in%20Dunhuang.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=80cdd82467fcb5e8a110c0560192caf7" ,
            description :"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
        },
        {
         name : "Photographers" ,
         image : "https://images.unsplash.com/photo-1460132011327-1bcd44f7ae20?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=072385d4a3fbe4c925edb0e1d620a201" ,    
        description :" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
        }
         ];
     
     function seedDB(){
         Campground.remove({}, function(err){
             if(err){
                 console.log(err);
             } else{
                  console.log("removed meetups");
                  //add 
                  data.forEach(function(seed) {
                      Campground.create(seed, function(err,campground){
                          if(err) {
                              console.log(err);
                          } else {
                              console.log("added meetups");
                              //create
                              Comment.create(
                              {
                                  text: " this is a good place",
                                  author: "Adit"
                                  
                              }, function(err, comment){
                                  if(err){
                                      console.log(err);
                                  } else {
                                      campground.comments.push(comment);
                                      campground.save();
                                      console.log("added comment");
                                  }
                                  
                              });
                          }
                          
                      });
                  });
             }
         });
     }
     
     
     module.exports = seedDB;