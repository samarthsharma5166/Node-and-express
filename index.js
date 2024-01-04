const express = require("express");
const {connectToMongoDb} = require("./connnect");
const urlRoute = require("./routes/url");
const URL =  require("./models/url"); 
const app = express();
const port = 8000;
connectToMongoDb("mongodb://127.0.0.1:27017/short-Url")
.then(()=>console.log("mongodb is connectd"))
.catch((err)=>console.log({msg:err}));
app.use(express.json());
app.use("/url",urlRoute);
app.get("/:shortId",async(req,res)=>{
    const shortid = req.params.shortId;
    const entery = await URL.findOneAndUpdate(
        {
            shortid
        },
    {
        $push:{
        viewHistory:{
            timestamp:Date.now()
        },
    },
 }
);
    res.redirect(entery.redirectUrl);
})

app.listen(port,()=>console.log("server is running at port 8000"))