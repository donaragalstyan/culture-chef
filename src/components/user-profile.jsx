import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserProfile.css";

export const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("recipes");
  const navigate = useNavigate();

  const user = {
    username: "foodie123",
  };

const userRecipes = [
  { 
      id: 1, 
      title: "Spaghetti Bolognese",
      cuisine: "Italian",
      prepTime: 45,
    ingredients: ["spaghetti", "ground beef", "tomato sauce"],
    instructions: ["Cook pasta", "Prepare sauce", "Combine and serve"]
  },
  ];

  const bookmarkedRecipes = [
    { id: 7, title: "Greek Salad" },
    { id: 8, title: "Mushroom Risotto" },
  ];


  const renderRecipesGrid = (recipes) => (
    <div className="recipes-grid">
      {recipes.map((recipe) => (
        <div 
          key={recipe.id} 
          className="recipe-card"
          onClick={() => navigate(`/recipe/${recipe.id}`, { state: { recipe } })}
        >
          <div className="recipe-icon">{recipe.icon || "🍳"}</div>
          <div className="recipe-title">{recipe.title}</div>
        </div>
      ))}
    </div>
  );


  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <h2>{user.username}</h2>
      </div>

      <div className="profile-tabs">
        <button
          className={activeTab === "recipes" ? "tab active" : "tab"}
          onClick={() => setActiveTab("recipes")}
        >
          Recipes
        </button>
        <button
          className={activeTab === "bookmarks" ? "tab active" : "tab"}
          onClick={() => setActiveTab("bookmarks")}
        >
          Bookmarks
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "recipes" && renderRecipesGrid(userRecipes)}
        {activeTab === "bookmarks" && renderRecipesGrid(bookmarkedRecipes)}
      </div>
    </div>
  );
};