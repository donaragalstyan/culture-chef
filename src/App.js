import { BrowserRouter as Router, Routes, Route, useLocation, Navigate  } from "react-router-dom";
import { HomeNavbar } from "./components/home-navbar";
import { Register } from "./components/register";
import { Login } from "./components/login";
import { Home } from "./components/home-page"; // <-- add this

function App() {
  return (
    <Router>
      <ConditionalNavbar />
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} /> {/* Default to login */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

function ConditionalNavbar() {
  const location = useLocation();
  const authPages = ["/register", "/login"];
  return authPages.includes(location.pathname) ? <HomeNavbar /> : null;
}

export default App;
