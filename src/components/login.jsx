import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/register.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all the fields");
      return;
    }

    // Get stored user
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setError("");
      console.log("Login successful");
      navigate("/home"); // Redirect to homepage
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="sign-up">
      <div className="div">
        <div className="text-wrapper-3">Welcome Back!</div>
        <div className="text-wrapper-4">Login</div>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};