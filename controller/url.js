const shortid= require("shortid")
const URL =  require("../models/url"); 
async function handleGenrateNewShortUrl(req,res){
    const body = req.body;
    if(!req.body) return res.status(404).json({msg:"url is required"});
    const shortId = shortid(8);
    await URL.create({
        ShortId:shortId,
        redirectUrl:body.url,
        viewHistory:[]
    });
    return res.json({id:shortId});
}
async function getHandleUserUrl(req,res){
    const shortid = req.params.shortId;
    console.log(shortid);
    const entry = await URL.findOneAndUpdate(
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
    res.redirect(entry.redirectUrl);
}
module.exports = {
    handleGenrateNewShortUrl,
    getHandleUserUrl
}