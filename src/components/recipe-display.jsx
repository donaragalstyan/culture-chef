import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBookmark, FaRegBookmark, FaRedoAlt, FaTimes } from "react-icons/fa";
import "../styles/recipe-display.css";

export const RecipeDisplay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { recipe } = location.state || {
    recipe: {
      name: "Sample Recipe",
      cuisine: "Italian",
      prepTime: 30,
      ingredients: ["Pasta", "Tomato Sauce"],
      culturalBackground: "Sample cultural background",
      instructions: ["Step 1", "Step 2"]
    }
  };

  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    if (!isBookmarked) {
      localStorage.setItem("bookmarks", JSON.stringify([...bookmarks, { ...recipe, id: Date.now() }]));
      setIsBookmarked(true);
    } else {
      const updatedBookmarks = bookmarks.filter(b => b.name !== recipe.name);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
    }
  };

  const handleRegenerate = () => {
    alert("Regenerating recipe with similar parameters...");
    navigate("/recipe-display", { state: { recipe } });
  };

  const handleClose = () => {
    navigate("/home");
  };

  return (
    <div className="recipe-display-container">
      <div className="recipe-header">
        <h1>{recipe.name}</h1>
        <div className="recipe-icon">{recipe.icon || "🍳"}</div>
      </div>

      <div className="recipe-meta">
        <span className="cuisine">{recipe.cuisine}</span>
        <span className="prep-time">Prep Time: {recipe.prepTime} mins</span>
      </div>

      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="recipe-section">
        <h2>Cultural Background</h2>
        <p>{recipe.culturalBackground}</p>
      </div>

      <div className="recipe-section">
        <h2>Preparation Instructions</h2>
        <ol>
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="action-buttons">
        <button onClick={handleClose} className="action-btn close-btn">
          <FaTimes /> Close
        </button>
        <button onClick={handleRegenerate} className="action-btn regenerate-btn">
          <FaRedoAlt /> Regenerate
        </button>
        <button onClick={handleBookmark} className="action-btn bookmark-btn">
          {isBookmarked ? <FaBookmark /> : <FaRegBookmark />} Bookmark
        </button>
      </div>
    </div>
  );
};
