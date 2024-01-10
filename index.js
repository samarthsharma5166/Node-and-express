const express = require("express");
const {connectToMongoDb} = require("./connnect");
const urlRoute = require("./routes/url");
const URL =  require("./models/url"); 
const app = express();
const port = 8000;
connectToMongoDb("mongodb://localhost:27017/url")
.then(()=>console.log("mongodb is connectd"))
.catch((err)=>console.log({msg:err}));
app.use(express.json());
app.use("/url",urlRoute);
app.get("/:shortId",async(req,res)=>{
    const shortid = req.params.shortId;
    console.log(shortid);
    const entery = await URL.findOneAndUpdate(
        {
            ShortId: shortid
        },
        {
            $push:{
                viewHistory:{
                    timestamp:Date.now()
                },
            },
        }
    );
    console.log(entery);
    res.redirect(entery.redirectUrl);
})

app.listen(port,()=>console.log("server is running at port 8000"))