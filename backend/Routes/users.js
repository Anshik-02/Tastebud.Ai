const express = require ('express');
const app= express();
const {userModel}=require ("../db.js");
const { sign } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD  = process.env.JWT_USER_PASSWORD;
const {Router}=require("express")
const userRouter=Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { z } = require('zod');

const {userMiddleware}=require("../middlewares/userMiddleware.js");
const signUpSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
  });

userRouter.post("/signup" , async function(req ,res){
    const { email, password, username} =req.body;
    const validation=signUpSchema.safeParse(req.body)
    if (!validation.success) {
       
        return res.status(400).json({
            success: false,
            errors: validation.error.errors.map(error => ({
                field: error.path[0],
                message: error.message
            }))
        });
    }

    try {
        // Hash the password with bcrypt
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            if (err) {
                return res.status(500).json({ success: false, message: "Error hashing password" });
            }

            // Create the new user with the hashed password
            await userModel.create({
                email,
                password: hash,
                username
            });

            res.json({
                success: true,
                message: "Signup successful"
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong during signup"
        });
    }
});

userRouter.post("/signin" , async function(req ,res){
    const { email, username,password} =req.body;
    
    const user=await userModel.findOne({
        email:email,
        username:username
    })
    try{const match=bcrypt.compare(password,user.password);
    if(match){
        const token = jwt.sign({
            id: user._id,
        }, JWT_USER_PASSWORD);
        
        res.json({
            token:token
        })
    }
    else{
        res.json({
            msg:"user is not registered"
        })
    }   }
    catch(e){
        console.log("oppise")
    } 
    
    
});

userRouter.put("/details" ,userMiddleware,async function(req ,res){
    const userId=req.userId
    const data= await userModel.find({
        userId
    })
    const{ calorieLimit,preferredDishes,preferredFoodType}=req.body

    if(data){
        await userModel.updateMany({ _id: userId },  
            {
                $set: { 
                    calorieLimit: calorieLimit,
                    preferredDishes: preferredDishes,
                    preferredFoodType: preferredFoodType
                }
            })
        res.json({
            msg:"upadated"
        })
    }
    else{
        
        res.json({
            msg:"User not found"
        })
    }
});

userRouter.get("/display",userMiddleware, async function(req ,res){
    const userId=req.userId
    const data= await userModel.findById(
        userId
    )
    res.json({
        userData:data
    })
});

userRouter.put("/display" ,userMiddleware, async function(req ,res){
    const userId=req.userId
    const data= await userModel.findById(
        userId
    )
    if(data){
        await userModel.updateMany({ _id: userId },  
            {
                $set: {
                    username:username,
                    calorieLimit: calorieLimit,
                    preferredDishes: preferredDishes,
                    preferredFoodType: preferredFoodType
                }
            })
        res.json({
            msg:"upadated"
        })
    }
    else{
        
        res.json({
            msg:"User not found"
        })
    }
    

});


module.exports={
    userRouter:userRouter
}
