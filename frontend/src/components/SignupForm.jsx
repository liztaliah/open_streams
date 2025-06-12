import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "./Input";
import Button from "./Button";
import animationError from "../assets/error.json";
import animationSuccess from "../assets/success.json";
import Lottie from "lottie-react";

function SignupForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showForm, setShowForm] = useState(true);
  const [showSucess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);
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
      await axios.post("/api/signup", form); // Post to signup API
      setShowForm(false); // Hide signup form if API post succeeds
      setShowSuccess(true); // Play animation
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      } else {
        setError("An unknown error occured.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-semibold mb-8 tracking-tight">_SignUp_</h1>
      <div
        className="transition-all duration-700 overflow-hidden flex flex-col items-center mb-4"
        style={{
          maxHeight: error ? 100 : 0,
          opacity: error ? 1 : 0,
        }}
      >
        {error /* fun little animation for failed auth */ && (
          <>
            <Lottie
              animationData={animationError}
              loop={false}
              className="w-12 h-12 mb-2"
            />
            <p className="text-red-400">{error}</p>
          </>
        )}
      </div>
      {showForm && (
        <div className="flex flex-col items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full max-w-xs"
          >
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
              className="mb-4 px-3 py-2 rounded-t-none rounded-b-lg"
            />
            <Button type="submit">Sign Up</Button>
          </form>
        </div>
      )}
      <div
        className="transition-all duration-700 overflow-hidden flex flex-col items-center mb-2"
        style={{
          maxHeight: showSucess ? 200 : 0,
          opacity: showSucess ? 1 : 0,
        }}
      >
        {showSucess && (
          <>
            <Lottie
              animationData={animationSuccess}
              loop={false}
              className="w-16 h-16 mb-2"
            />
            <p className="text-green-300 mb-8">account created successfully</p>
          </>
        )}
      </div>
      <Button>Login</Button>
    </div>
  );
}

export default SignupForm;
