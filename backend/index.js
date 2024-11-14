require ('dotenv').config()
const express = require ("express");
const app= express();
const {userRouter}= require("./Routes/users.js")
const {recipieRouter}= require("./Routes/recipie.js")
const {bookmarkRouter}= require("./Routes/bookmark.js")
const {shoppingListRouter}= require("./Routes/shoppingList.js")
const mongoose=require("mongoose")
app.use(express.json());

app.use("/user",userRouter);
app.use("/recipie",recipieRouter);
app.use("/user",bookmarkRouter);
app.use("/user",shoppingListRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000);
    console.log("listening on port 3000")
}

main()



