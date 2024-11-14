const express = require ("express");
const app= express();
const {Router}=require("express")
const {recipieModel}=require("../db.js");
const e = require("express");
// const {userMidlleware}=require("../middlewares/userMiddleware")
const recipieRouter=Router()

recipieRouter.get("/dish",async function(req ,res){
        const {recipieId,title}=req.body
        const data= await recipieModel.findOne({
            recipieId,title
        })
        if(data){
        res.json({
        data:data
        })}
        else{
            res.json({
                msg:"dish not found"})
        }
    });
    
    recipieRouter.post("/detail" ,async function(req ,res){
       const {tags}=req.body
       
        const recipie=await recipieModel.find({
        tags:{$in:[tags]}
       }).limit(5);
       
       if(recipie){
        res.json({
    recipie:recipie
        })}
        else{
        res.json({
        msg:"dish not found"
           })
        }
    });

module.exports={
    recipieRouter:recipieRouter
}
