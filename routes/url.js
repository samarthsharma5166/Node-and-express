const express = require("express");
const {handleGenrateNewShortUrl,getHandleUserUrl} = require("../controller/url");
const router = express.Router();
router.post("/",handleGenrateNewShortUrl);
// router.get("/:shortId",getHandleUserUrl);
module.exports=router;