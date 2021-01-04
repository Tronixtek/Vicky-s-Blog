const express = require("express");

const route = express.Router();
var Article = require("../models/article");


//to get article form
route.get("/new", (req,res)=>{
    res.render("articles/new",{article:Article})
})
//to show article after saving to database
route.get("/:slug",async (req,res)=>{
    var article = await Article.findOne({slug:req.params.slug});
    res.render("articles/show",{article:article})
})

//to save article after creating
route.post("/",async (req,res,next)=>{
    req.article = new Article;
    next()
},saveAndRe("new"))
//get edit form
route.get("/edit/:id",async (req,res)=>{
     const article = await Article.findById(req.params.id)
    res.render("articles/edit",{article:article})
})
// editing post

route.put("/:id", async (req,res,next)=>{
    req.article = await Article.findById(req.params.id);
    next()
},saveAndRe("edit"))

//delete post
route.delete("/:id",async(req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect("/")
})


//save function

function saveAndRe(path){
    return async(req,res)=>{
        
    let article = req.article
     article.title = req.body.title
     article.description = req.body.description
     article.markdown = req.body.markdown
        try{
            article = await article.save()
            console.log("your Entry was saved")
            res.redirect(`/articles/${article.slug}`)
        }
        catch(e){
            console.log(e)
            res.render(`/articles/${path}`,{article:Article})
        }


            }
}

//to make route accessible in any file

module.exports = route;