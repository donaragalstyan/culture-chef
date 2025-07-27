import React, { useState } from "react";
import "../styles/UserProfile.css"; // Assuming you have a CSS file for styling

export const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("recipes");

  // Dummy data (replace with your actual data)
  const user = {
    avatarUrl: "", // sample avatar
    username: "foodie123",
  };

  const userRecipes = [
    { id: 1, title: "Spaghetti Bolognese", image: "https://source.unsplash.com/200x150/?pasta" },
    { id: 2, title: "Chicken Curry", image: "https://source.unsplash.com/200x150/?chicken" },
    // more recipes...
  ];

  const bookmarkedRecipes = [
    { id: 3, title: "Vegan Salad", image: "https://source.unsplash.com/200x150/?salad" },
    // more bookmarks...
  ];

  const historyRecipes = [
    { id: 4, title: "Pancakes", image: "https://source.unsplash.com/200x150/?pancakes" },
    // more history...
  ];

  const renderRecipesGrid = (recipes) => (
    <div className="recipes-grid">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-card">
          <img src={recipe.image} alt={recipe.title} />
          <div className="recipe-title">{recipe.title}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="user-profile-container">
      {/* Avatar & Username */}
      <div className="profile-header">
        <img src={user.avatarUrl} alt="avatar" className="avatar" />
        <h2>{user.username}</h2>
      </div>

      {/* Tabs */}
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
        <button
          className={activeTab === "history" ? "tab active" : "tab"}
          onClick={() => setActiveTab("history")}
        >
          History
        </button>
      </div>

      {/* Content */}
      <div className="tab-content">
        {activeTab === "recipes" && renderRecipesGrid(userRecipes)}
        {activeTab === "bookmarks" && renderRecipesGrid(bookmarkedRecipes)}
        {activeTab === "history" && renderRecipesGrid(historyRecipes)}
      </div>
    </div>
  );
};
