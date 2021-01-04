const mongoose = require("mongoose")
const marked = require("marked");
const slugify = require("slugify")
const createPurifier = require("dompurify");
const { JSDOM } = require("jsdom")

const dompurifier = createPurifier( new JSDOM().window)

const Schema = mongoose.Schema;

var articleSchema = new Schema(
    {
        title:{
            type:String,
            require: true
        },
        description:{
            type:String
        },
        createdat:{
            type:Date,
            default:Date.now
        },
        markdown:{
            type:String,
            required:true
        },
        slug:{
            type:String,
            required:true,
            unique: true,
            
        },
        sanitizedHtml:{
            type:String,
            require:true
        }
    }
)

articleSchema.pre("validate", function(next){
  if(this.title){
       this.slug = slugify(this.title,{lower:true,
       strict:true})
    }
    if(this.markdown){
        this.sanitizedHtml = dompurifier.sanitize(marked(this.markdown))
    }
    next()
})

module.exports = mongoose.model("Article",articleSchema);