const express = require ("express");
const app= express();
const {Router}=require("express")
const shoppingListRouter=Router()


shoppingListRouter.post("/shoping-list" ,function(req ,res){
        res.json({
    
        })
    });
    
    shoppingListRouter.get("/shoping-list" ,function(req ,res){
        res.json({
    
        })
    });
    
    shoppingListRouter.delete("/shoping-list" ,function(req ,res){
        res.json({
    
        })
    });

    
    shoppingListRouter.put("/shoping-list" ,function(req ,res){
        res.json({
    
        })
    });

module.exports={
    shoppingListRouter:shoppingListRouter
}
