const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    ShortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectUrl:{
        type:String,
        required:true,
    },
    viewHistory:[{timestamp:{type:Number}}]
},
{timestamps:true});
const URL  = mongoose.model("url",urlSchema);
module.exports= URL;