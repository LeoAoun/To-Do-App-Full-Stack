import "./Menu.css";
import { Link, useLocation } from "react-router-dom";

export default function Menu() {
  const location = useLocation();

  return (
    <div className="menu-container">
      <span>To-Do List</span>
      <div className="menu-buttons">
        {location.pathname === "/todos" ? (
          <button>Logout</button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
}
