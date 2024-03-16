import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { apiUrl } from "../../CRUD functions/CRUDFunctions";

let token: string = "";
let userId: number;

export { token, userId };

interface LoginProps {
  session: string;
}

export default function Login({ session }: LoginProps) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to send the login data to the server and receive the token and user id in response to navigate to the Todos page with the user id
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/login`, formData);

      toast.info("User logged in successfully");

      token = response.data.token;
      userId = response.data.user.id;

      navigate(`/todos/${session}`);
    } 
    catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.statusText;
        toast.error(errorMessage);
        console.log(error)
      } else {
        toast.error("Error logging in user");
      }
    }
  };

  return (
    <div className="login-container">
      <span>Login</span>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="emailLogin"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="passwordLogin"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
