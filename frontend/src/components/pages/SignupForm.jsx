import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitAuthForm } from "../../utils/auth";
import Input from "../common/Input";
import Button from "../common/Button";
import animationSuccess from "../../assets/success.json";
import Lottie from "lottie-react";
import ErrorMessage from "../common/ErrorMessage";
import FormContainer from "../layout/FormContainer";

function SignupForm() {
  // States for updating input form and hiding/showing animations
  const [form, setForm] = useState({ username: "", password: "" });
  const [showForm, setShowForm] = useState(true);

  // States for showing the success animation
  // Pending the input form transition out
  const [pendingSuccess, setPendingSuccess] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sets for setting the error messages from API
  // Show state for smooth animation transition
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  // Update the username/password form upon text entry
  const handleChange = (e) => {
    if (error) setShowError(false); // Start fade out, but don't clear error yet
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit the username/password and await the response from the API
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from reloading
    setError(null); // Clear old errors

    submitAuthForm("/api/signup", form, setError, setShowError, () => {
      setShowForm(false);
      // Wait for hide animation to finish before playing checkmark
      setPendingSuccess(true);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-semibold mb-4 tracking-tight">_SignUp_</h1>
      <ErrorMessage
        error={error}
        show={showError}
        onTransitionEnd={() => {
          if (!showError && error) {
            setError(null); // Now clear the error after fade out
          }
        }}
      />
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
          </form>
          <div className="flex justify-center space-x-3">
            <Button type="submit">Sign Up</Button>
            <Button onClick={() => navigate("/login")}>Log In</Button>
          </div>
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
