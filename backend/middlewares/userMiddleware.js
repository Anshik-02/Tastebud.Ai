const jwt = require("jsonwebtoken");
const { model } = require("mongoose");
const JWT_USER_PASSWORD  = "Villi af";

function userMiddleware(req,res,next){
const token=req.headers.token;
const decodedData=jwt.verify(token,JWT_USER_PASSWORD);
if(decodedData){
    req.userId=decodedData.id
    next()
}
else{
res.json({
    msg:"you are not signed in"
})
}

}
module.exports={
    userMiddleware:userMiddleware
}
