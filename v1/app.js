const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

//campgounds
 let compgrounds =[
     {name:"Granite Hill", image:"https://farm1.staticflickr.com/211/467048513_4042c7979f.jpg"},
        {name:"Mountain Goats", image:"https://farm8.staticflickr.com/7145/6566058859_66be51c243.jpg"},
        {name:"Salmon Greek", image:"https://farm3.staticflickr.com/2937/14262278198_a16465ce5d.jpg"},
        {name:"Granite Hill", image:"https://farm1.staticflickr.com/211/467048513_4042c7979f.jpg"},
         {name:"Mountain Goats", image:"https://farm8.staticflickr.com/7145/6566058859_66be51c243.jpg"},
        {name:"Salmon Greek", image:"https://farm3.staticflickr.com/2937/14262278198_a16465ce5d.jpg"},
        {name:"Granite Hill", image:"https://farm1.staticflickr.com/211/467048513_4042c7979f.jpg"},
        {name:"Mountain Goats", image:"https://farm8.staticflickr.com/7145/6566058859_66be51c243.jpg"}
        ]

//landing page
app.get("/", (req, res)=>{
    res.render("landing");
});

//All CampGround
app.get("/campgrounds",(req,res)=>{
        res.render("campgrounds", {campgrounds: compgrounds});
});

//Create a CampGround
app.post("/compgrounds", (req, res)=>{
    const name = req.body.name;
    const image = req.body.image
    const newCampground = { name: name, image: image }
    
    compgrounds.push(newCampground);
   res.redirect("/campgrounds");
});

//new CampGround form
app.get("/campgrounds/new", (req, res)=>{
    res.render("new.ejs")
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp sever started")
});