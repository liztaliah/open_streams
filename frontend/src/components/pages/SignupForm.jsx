import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../common/Input";
import Button from "../common/Button";
import animationSuccess from "../../assets/success.json";
import Lottie from "lottie-react";
import ErrorMessage from "../common/ErrorMessage";
import FormContainer from "../layout/FormContainer";

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
      <ErrorMessage error={error} />
      <FormContainer>
        {/* Form */}
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-500"
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
            className="flex flex-col items-center w-full max-w-xs mt-2"
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
          className="absolute inset-0 flex flex-col items-center justify-center w-full h-full transition-opacity duration-500"
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
      </FormContainer>
    </div>
  );
}

export default SignupForm;
