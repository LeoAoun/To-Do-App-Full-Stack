import "./Register.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { apiUrl } from "../../CRUD functions/CRUDFunctions";

export default function Register() {

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

  // Function to send the register data to the server and receive the token and user id in response to navigate to the Login page
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await axios.post(`${apiUrl}/register`, formData);

      navigate("/login");
      
      toast.info("User registered successfully");
    } 
    catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.statusText;
        toast.error(errorMessage);
      } 
      else {
        toast.error("Error registering user");
      }
    }
  };

  return (
    <div className="register-container">
      <span>Register</span>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="emailRegister"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="passwordRegister"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
