const shortid= require("shortid")
const URL =  require("../models/url"); 
async function handleGenrateNewShortUrl(req,res){
    const body = req.body;
    if(!req.body) return res.status(404).json({msg:"url is required"});
    const shrtId = shortid(8);
    await URL.create({
        ShortId:shrtId,
        redirectUrl:body.url,
        viewHistory:[]
    });
    return res.json({id:shrtId});
}
async function getHandleUserUrl(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push: {
        viewHistory:{timestamp:Date.now()}}
    })
    console.log(`this is entery`,entry.redirectUrl);
    return res.redirect(entry.redirectUrl);
}
module.exports = {
    handleGenrateNewShortUrl,
    getHandleUserUrl
}