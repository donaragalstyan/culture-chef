import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Recipes.css";

import man1 from "../assets/man-1.png";
import man2 from "../assets/man-2.png";
import man3 from "../assets/man-3.png";
import women1 from "../assets/women-1.png";
import women2 from "../assets/women-2.png";
import women3 from "../assets/women-3.png";

export const Recipes = () => {
  const navigate = useNavigate();

  const users = [
    {
      id: 1,
      name: "John Doe",
      avatar: man1,
      recipes: [
        {
          id: 101,
          title: "Spaghetti Bolognese",
          cuisine: "Italian",
          prepTime: 45
        }
      ]
    },
    {
      id: 2,
      name: "Emily Smith",
      avatar: women1,
      recipes: [
        {
          id: 201,
          title: "Greek Salad",
          cuisine: "Greek",
          prepTime: 15
        }
      ]
    }
  ];

  return (
    <div className="recipes-container">
      <h2>Discover Users</h2>
      <div className="users-grid">
        {users.map((user) => (
          <div
            key={user.id}
            className="user-card"
            onClick={() =>
              navigate("/user-profile", { state: { user } })
            }
          >
            <img src={user.avatar} alt={`${user.name}'s avatar`} className="user-avatar" />
            <h4>{user.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
