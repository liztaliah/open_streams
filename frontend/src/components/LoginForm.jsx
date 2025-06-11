import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./Button";
import Input from "./Input";
import animationError from "../assets/error.json";
import Lottie from "lottie-react";

function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  // Update the username/password form upon text entry
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit the username/password and await the response from the API
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading
    setError(null); // Clear old errors

    try {
      const response = await axios.post("/api/login", form);

      // Save token to localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to the user list -- Change This to HomePage
      navigate("/home");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error);
        setShowError(true);
      } else {
        setError("An unknown error occured.");
        setShowError(true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-semibold mb-8 tracking-tight">_Login_</h1>
      {error && (
        <div className="flex flex-col items-center mb-4">
          <Lottie
            animationData={animationError}
            loop={false}
            className="w-16 h-16 mb-2"
          />
          <p className="text-red-400">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <Input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="mb-0.5 px-3 py-2 rounded-t-lg rounded-b-none"
        />
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="mb-8 px-3 py-2 rounded-t-none rounded-b-lg"
        />
        <Button type="submit">Log In</Button>
      </form>
    </div>
  );
}

export default LoginForm;
