const express = require("express");
const mongoose = require("mongoose")
const Article = require("./models/article")
const methodoverride = require("method-override")

const articleRoute = require("./route/articles")
app = express();

mongoose.connect("mongodb://localhost/blog",{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})

app.set("view engine","ejs");
//app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:false}));
app.use(methodoverride("_method"));

app.get("/", async (req,res)=>{
    const articles = await Article.find().sort({createdat:"desc"})

    res.render("articles/index",{articles:articles})
})


app.use("/articles",articleRoute);




app.listen(3000,console.log("we are up"))