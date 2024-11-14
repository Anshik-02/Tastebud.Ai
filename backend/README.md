# Tastebud AI

Tastebud AI is an intelligent, ingredient-based recipe generator designed to offer users personalized meal suggestions based on their available ingredients, dietary preferences, and culinary goals. This web application enhances the cooking experience with tailored recipe recommendations, step-by-step guides, and shopping list integrations.

## Table of Contents
  - Features
  - Tech Stack
  - Installation and Setup
  - Backend Setup
  - Frontend Setup
  - Run the Backend
  - Contributing
  - License

## Features
1. **User Profile Management**
   - Track preferences, favorite ingredients, disliked items, and food types.
   - Customize dietary goals (e.g., high protein, low-carb).
   - Maintain a history of previously tried dishes.

2. **Ingredient-Based Search**
   - Generate recipes based on user-inputted ingredients.
   - Utilize AI for analyzing ingredient combinations for recipe generation.

3. **Keyword-Based Search**
   - Find dishes using keyword searches like "protein-rich" or "low-carb."

4. **Time and Difficulty Filters**
   - Filter recipes by preparation time and difficulty.

5. **Step-by-Step Cooking Guide**
   - Detailed cooking instructions for each recipe.

6. **Shopping List Integration**
   - Create shopping lists based on chosen recipes.
   - Check items off as they are purchased or prepared.

7. **Rating System**
   - User ratings help refine future recommendations and enhance the AI algorithm.

## Tech Stack
### Frontend
- **React.js** for dynamic user interfaces.
- **Tailwind CSS** for responsive and modern styling.

### Backend
- **Node.js** with **Express.js** for server-side logic.
- **Django** for AI model processing.

### Database
- **MongoDB** for user data, preferences, and history storage.
- **SQL/SQLite** (optional) for structured data requirements.

### AI/ML
- **Python** for AI development.
- **TensorFlow/Keras** or **PyTorch** for model training and execution.

### Deployment
- **Vercel/Netlify** for frontend.
- **AWS EC2/Heroku** for backend.

## Installation and Setup
To set up and run the Tastebud AI project locally, follow these steps:

### Backend Setup
1. **Navigate to the backend directory:**
   ```bash
   cd tastebud-ai-backend
2. **Create and activate a Python virtual environment:**
   ```bash
   python -m venv env
    source env/bin/activate  # On Windows: env\Scripts\activate
3. **Install required Python packages:**
   ```bash
   pip install -r requirements.txt
4. **Run database migrations:**
   ```bash
   python manage.py migrate

### Front Setup
1. **Navigate to the frontend directory:**
   ```bash
    cd ../tastebud-ai-frontend
2. **Install dependencies:**
   ```bash
   npm install
3. **Start the React development server:**
   ```bash
   npm start

### Run the Backend
1. **In a new terminal, ensure your Python environment is active:**
   ```bash
    cd tastebud-ai-backend
    source env/bin/activate
    python manage.py runserver

## Developed By
This section acknowledges the individuals or teams responsible for creating and developing the project.
- [@Anshik-02](https://github.com/Anshik-02)
- [@unavailable-code](https://github.com/unavailable-code)
- [@ihimanshsharma](https://github.com/ihimanshsharma)

## Contributing
Contributions are welcome! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request. Follow the standard GitHub flow:
   - Fork the project.
   - Create a new branch (git checkout -b feature/your-feature).
   - Commit your changes (git commit -m 'Add your feature').
   - Push to the branch (git push origin feature/your-feature).
   - Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

