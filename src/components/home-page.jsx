import React, { useState } from "react";
import "../styles/home.css";
import { UserProfile } from "./user-profile";  // import the profile component

export const Home = () => {
    const [activeTab, setActiveTab] = useState("ai");

    // Existing states for AI Generator
    const [ingredientInput, setIngredientInput] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [dietInput, setDietInput] = useState("");
    const [dietaryPreferences, setDietaryPreferences] = useState([]);
    const [cuisine, setCuisine] = useState("");
    const [prepTime, setPrepTime] = useState("");

    const handleKeyDown = (e, type) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();
            if (type === "ingredients") {
                if (!ingredients.includes(ingredientInput.trim())) {
                    setIngredients([...ingredients, ingredientInput.trim()]);
                }
                setIngredientInput("");
            } else if (type === "diet") {
                if (!dietaryPreferences.includes(dietInput.trim())) {
                    setDietaryPreferences([...dietaryPreferences, dietInput.trim()]);
                }
                setDietInput("");
            }
        }
    };

    const removeTag = (type, index) => {
        if (type === "ingredients") {
            setIngredients(ingredients.filter((_, i) => i !== index));
        } else if (type === "diet") {
            setDietaryPreferences(dietaryPreferences.filter((_, i) => i !== index));
        }
    };

    const handleGenerate = () => {
        alert(
            `Ingredients: ${ingredients.join(", ")}\n` +
            `Dietary Preferences: ${dietaryPreferences.join(", ")}\n` +
            `Cuisine: ${cuisine}\n` +
            `Prep Time: ${prepTime} minutes`
        );
    };

    return (
    <div className="home-container">
      {/* Navigation Tabs */}
      <div className="tabs">
        <div
          className={`tab ${activeTab === "recipes" ? "active" : ""}`}
          onClick={() => setActiveTab("recipes")}
        >
          Recipes
        </div>
        <div
          className={`tab ${activeTab === "ai" ? "active" : ""}`}
          onClick={() => setActiveTab("ai")}
        >
          AI Recipe Generator
        </div>
        <div
          className={`tab ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          User Profile
        </div>
      </div>


            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === "ai" && (
                    <>
                        <h2>What are you preparing today?</h2>

                        {/* Ingredients */}
                        <div className="tag-input">
                            <label>Ingredients</label>
                            <div className="tags">
                                {ingredients.map((item, index) => (
                                    <span key={index} className="tag">
                                        {item} <button onClick={() => removeTag("ingredients", index)}>x</button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    value={ingredientInput}
                                    onChange={(e) => setIngredientInput(e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, "ingredients")}
                                    placeholder="Add ingredient & press Enter"
                                />
                            </div>
                        </div>

                        {/* Dietary Preferences */}
                        <div className="tag-input">
                            <label>Dietary Preferences</label>
                            <div className="tags">
                                {dietaryPreferences.map((item, index) => (
                                    <span key={index} className="tag">
                                        {item} <button onClick={() => removeTag("diet", index)}>x</button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    value={dietInput}
                                    onChange={(e) => setDietInput(e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, "diet")}
                                    placeholder="Add preference & press Enter"
                                />
                            </div>
                        </div>

                        {/* Cuisine */}
                        <div className="form-group">
                            <label htmlFor="cuisine">Cuisine</label>
                            <input
                                id="cuisine"
                                type="text"
                                value={cuisine}
                                onChange={(e) => setCuisine(e.target.value)}
                                placeholder="Type cuisine"
                            />
                        </div>

                        {/* Prep Time */}
                        <div className="form-group">
                            <label htmlFor="prepTime">Prep Time (minutes)</label>
                            <input
                                id="prepTime"
                                type="number"
                                min="0"
                                value={prepTime}
                                onChange={(e) => setPrepTime(e.target.value)}
                                placeholder="Enter prep time"
                            />
                        </div>

                        <button className="generate-btn" onClick={handleGenerate}>
                            Generate Recipe
                        </button>
                    </>
                )}

                {activeTab === "recipes" && <h2>Saved Recipes Coming Soon...</h2>}
                {activeTab === "profile" && <UserProfile />}
            </div>
        </div>
    );
};
