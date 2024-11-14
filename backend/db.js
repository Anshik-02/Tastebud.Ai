const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  calorieLimit: Number,
  preferredDishes: [String],
  preferredFoodType: [String],
  savedRecipies: [{ type: Schema.Types.ObjectId}],
  shoppingList: [{  type: Schema.Types.ObjectId }],
});


const RecipieSchema = new Schema({
    title:{type:String},
    ingredients:[{
        name:{type:String },
        quantity:{type:Number },
        unit:{type:String}
    }],
    steps:[String],
    cuisine:String,
    tags:[String],
    nutrition:{
        calorie:String, 
        protein:String,
        carbs:String,
        fat:String
    },
    cookTime:Number,
    rating:{type:Number,default:0},
    imageUrl:String
});



const shoppingListSchema = new Schema({
    userId:{ type:ObjectId,required:true},
    items:[{ 
        ingredientId:ObjectId,
        quantity: String, 
        isComplete: { type: Boolean, default: false }
    }]
});


const userModel = mongoose.model("user", UserSchema);
const recipieModel = mongoose.model("recipie", RecipieSchema);
const shoppingListModel = mongoose.model("shoppingList", shoppingListSchema);


module.exports = {
    userModel,
    recipieModel,
    shoppingListModel
};
