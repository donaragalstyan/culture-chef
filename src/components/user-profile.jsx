import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserProfile.css";

// Import your avatar icons
import man1 from "../assets/man-1.png";
import man2 from "../assets/man-2.png";
import man3 from "../assets/man-3.png";
import women1 from "../assets/women-1.png";
import women2 from "../assets/women-2.png";
import women3 from "../assets/women-3.png";

export const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("recipes");
  const [avatar, setAvatar] = useState(women1); // Default avatar
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
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

  const avatars = [man1, man2, man3, women1, women2, women3];

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
        <div className="avatar-section">
          <img src={avatar} alt="User Avatar" className="avatar" />
          <button
            className="change-avatar-btn"
            onClick={() => setShowAvatarPicker(!showAvatarPicker)}
          >
            Change Avatar
          </button>

          {showAvatarPicker && (
            <div className="avatar-picker">
              {avatars.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="avatar option"
                  className={`avatar-option ${avatar === img ? "selected" : ""}`}
                  onClick={() => {
                    setAvatar(img);
                    setShowAvatarPicker(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>
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
