import React, { useState } from "react";
import "../styles/Recipes.css";

export const Recipes = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const recipes = [
    { id: 1, title: "Spaghetti Bolognese", desc: "Classic Italian pasta", image: "https://source.unsplash.com/300x200/?pasta", details: "A rich, meaty sauce served over spaghetti pasta. Perfect for dinner!" },
    { id: 2, title: "Chicken Curry", desc: "Spicy and flavorful", image: "https://source.unsplash.com/300x200/?chicken", details: "A fragrant curry made with tender chicken and aromatic spices." },
    { id: 3, title: "Vegan Salad", desc: "Fresh and healthy", image: "https://source.unsplash.com/300x200/?salad", details: "A mix of fresh vegetables and tangy dressing for a healthy meal." },
    { id: 4, title: "Pancakes", desc: "Sweet breakfast favorite", image: "https://source.unsplash.com/300x200/?pancakes", details: "Fluffy pancakes served with maple syrup and fresh fruits." },
  ];

  const closeModal = () => setSelectedRecipe(null);

  return (
    <div className="recipes-container">
      <h2>Discover Recipes</h2>
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
            <p>{recipe.desc}</p>
            <button className="view-btn" onClick={() => setSelectedRecipe(recipe)}>
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedRecipe && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedRecipe.image} alt={selectedRecipe.title} />
            <h2>{selectedRecipe.title}</h2>
            <p>{selectedRecipe.details}</p>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
