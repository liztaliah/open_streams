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
  const [pendingSuccess, setPendingSuccess] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Update the username/password form upon text entry
  const handleChange = (e) => {
    setError(null); // Hide error message if input changes
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit the username/password and await the response from the API
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading
    setError(null); // Clear old errors

    try {
      await axios.post("/api/signup", form); // Post to signup API
      setShowForm(false); // Hide signup form if API post succeeds
      // Wait for hide animation to finish before playing checkmark
      setPendingSuccess(true);
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
      <h1 className="text-4xl font-semibold mb-4 tracking-tight">_SignUp_</h1>
      {/* Error container */}
      <div
        className="transition-all duration-500 overflow-hidden flex flex-col items-center mb-2"
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
      {/* Shared container for form and success message */}
      <div
        className="relative flex flex-col items-center justify-center transition-all duration-500 overflow-hidden"
        style={{
          height: 175,
          width: "100%",
          maxWidth: 320,
        }}
      >
        {/* Form */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center w-full transition-all duration-500"
          style={{
            opacity: showForm ? 1 : 0,
            pointerEvents: showForm ? "auto" : "none",
          }}
          onTransitionEnd={() => {
            if (!showForm && pendingSuccess) {
              setShowSuccess(true);
              setPendingSuccess(false);
            }
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full max-w-xs"
            style={{
              visibility: showForm ? "visible" : "hidden",
            }}
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
              className="mb-8 px-3 py-2 rounded-t-none rounded-b-lg"
            />
            <div className="flex space-x-3">
              <Button type="submit">Sign Up</Button>
              <Button onClick={() => navigate("/login")}>Log In</Button>
            </div>
          </form>
        </div>
        {/* Success message */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center w-full transition-all duration-500"
          style={{
            opacity: showSuccess ? 1 : 0,
            pointerEvents: showSuccess ? "auto" : "none",
          }}
        >
          {showSuccess && (
            <>
              <Lottie
                animationData={animationSuccess}
                loop={false}
                className="w-16 h-16 mb-2"
              />
              <p className="text-green-300 mb-8">
                account created successfully
              </p>
              <Button onClick={() => navigate("/login")}>Log In</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
