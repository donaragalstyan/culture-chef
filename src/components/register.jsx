import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/register.css";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !username || !password) {
      setError("Please fill all the fields");
      return;
    }

    // Save user in localStorage
    const user = { email, username, password };
    localStorage.setItem("user", JSON.stringify(user));

    setError("");
    console.log("User registered:", user);

    // Redirect to homepage after registration
    navigate("/home");
  };

  return (
    <div className="sign-up">
      <div className="div">
        <div className="text-wrapper-3">Welcome to Culture Chef</div>
        <div className="text-wrapper-4">Sign Up</div>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};
