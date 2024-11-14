const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const {recipieModel} = require('./db.js'); // Adjust this path to your Recipe schema file

// Connect to MongoDB
mongoose.connect('mongodb+srv://gg:3GQpN44ZZSioBHPK@cluster0.jqb93.mongodb.net/Tastebud_Ai', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Function to process and save data
const importRecipes = async () => {
    const recipes = []; // Array to store recipes before inserting

    // Read CSV file
    fs.createReadStream('./cleaned_recipes.csv')
        .pipe(csv())
        .on('data', (row) => {

            const names = row.RecipeIngredient.split(',');
           
           

            // Combine attributes into ingredient objects
            const ingredients = names.map((name, index) => ({
                name: name.trim()
              
               
            }));
            // Map CSV columns to Recipe schema fields
            recipes.push({
                title: row.Name, 
                ingredients:ingredients,
                steps: row.RecipeInstructions.split(','), // Assuming steps are separated by '|'
                cuisine: row.RecipeCategory,
                tags: row.Keywords ? row.Keywords.split(',') : [],
                nutrition: {
                    calorie: (row.Calories, 10),
                    protein: (row.ProteinContent),
                    carbs: (row.CarbohydrateContent),
                    fat: (row.FatContent)
                },
                cookTime:(row.CookTime, 10),
                // rating: parseFloat(row.rating),
                imageUrl: row.images
            });
        })
        .on('end', async () => {
            try {
                await recipieModel.insertMany(recipes); // Insert all recipes at once
                console.log('Recipes imported successfully');
                mongoose.connection.close(); // Close the MongoDB connection
            } catch (error) {
                console.error('Error inserting recipes:', error);
            }
        });
};

// Run the import function
importRecipes();