import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        "https://localhost:7217/api/userAccount/Login",
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: { email, password },
        }
      );

      if (response.status === 200) {
        const user = response.data;
        Cookies.set("token", user.token, { expires: 1 });
        navigate("/");
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while logging in.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default LoginPage;
