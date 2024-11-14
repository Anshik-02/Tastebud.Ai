const express = require ("express");
const app= express();
const {Router}=require("express")
const {recipieModel, userModel}=require("../db.js");
const {userMiddleware}=require("../middlewares/userMiddleware")

const bookmarkRouter=Router()

bookmarkRouter.put("/bookmark",userMiddleware , async function(req ,res){
    const userId=req.userId;
    const {recipieId}=req.body
    const user = await userModel.findById(userId);
    const recipie = await recipieModel.findById(recipieId);

    // Check if both user and recipe exist
    if(user && recipie) {
        // Update the user's savedRecipies array by adding the new recipe if not already bookmarked
        if (!user.savedRecipies.some(savedRecipe => savedRecipe._id.toString() === recipie._id)) {
            user.savedRecipies.push(recipie);                                              // Add the recipe to savedRecipies
            await user.save();                                                            // Save the updated user document
            return res.json({ success: true, message: "Recipe bookmarked successfully." });
        }
        else {
            return res.status(400).json({ success: false, message: "Recipe already bookmarked." });
        }
    } 
    else {
        return res.status(404).json({ success: false, message: "User or Recipe not found." });
    }
});
    
bookmarkRouter.get("/bookmark", userMiddleware, async function (req, res) {
    const userId = req.userId;
        
        // Find the user by ID and populate their savedRecipies array
    const user = await userModel.findById(userId).populate('savedRecipies');
    
        // Check if user exists
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
    }
    
        // Check if savedRecipies is undefined or null
    const savedRecipies = user.savedRecipies || [];
    if (savedRecipies.length === 0) {
        return res.json({
            success: true,
            message: "No bookmarked recipes.",
            savedRecipies: []
            });
    }
    
        // Query all the recipes by their IDs
    const recipes = await recipieModel.find({
        _id: { $in: savedRecipies.map(recipe => recipe._id) }
    });
    
        // Return the found recipes
    res.json({
        success: true,
        savedRecipies: recipes
    });
    });
    
    bookmarkRouter.delete("/bookmark",userMiddleware ,async function(req ,res){
        const userId = req.userId; 
        const { recipieId } = req.body;
    
        try {
            // Find the user by ID
            const user = await userModel.findById(userId);
    
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found." });
            }
    
            // Check if the recipe is in savedRecipies
            const recipeIndex = user.savedRecipies.findIndex(recipeId => recipeId.toString() === recipieId);
            
            if (recipeIndex === -1) {
                return res.status(404).json({ success: false, message: "Recipe not found in bookmarks." });
            }
    
            // Remove the recipe from savedRecipies array
            user.savedRecipies.splice(recipeIndex, 1);
            await user.save();
    
            res.json({ success: true, message: "Recipe removed from bookmarks." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "An error occurred while removing the bookmark." });
        }
    });


module.exports={
    bookmarkRouter:bookmarkRouter
}
