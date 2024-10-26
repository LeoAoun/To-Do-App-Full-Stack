import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Container from "./components/container/Container";
import Menu from "./components/menu/Menu";

const session = uuidv4();

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
        <Routes>
          <Route path={"/login"} element={<Login session={session} />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={`/todos/${session}`} element={<Container />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
