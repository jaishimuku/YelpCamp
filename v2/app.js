const express       = require("express"),
        app         = express(),
        bodyParser  = require("body-parser"),
        mongoose    = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//                 name: "Granite Hill",
//                 image:"https://farm1.staticflickr.com/211/467048513_4042c7979f.jpg",
//                 description: "This is a huge granite hill, no water, no bathroom, beautiful granite"
//             }, function(err, allCampgrounds){
//         if(err){
//             console.log(err);
//         }else{
//           console.log(allCampgrounds);
//         }
//         });
 
//landing page
app.get("/", (req, res)=>{
    res.render("landing");
});

//All CampGround
app.get("/campgrounds",(req,res)=>{
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
       
});

//Create a CampGround
app.post("/compgrounds", (req, res)=>{
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description
    const newCampground = { name: name, image: image, description: description }
    
    Campground.create(newCampground, function(err, newCamp){
        if(err){
            res.send(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

//new CampGround form
app.get("/campgrounds/new", (req, res)=>{
    res.render("new.ejs")
});

app.get("/campgrounds/:id",(req, res)=>{
    Campground.findById(req.params.id, (err, camp)=>{
        if(err){
            console.log(err);
        }else{
             res.render("show", {campground: camp});
        }
    });
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp sever started")
});