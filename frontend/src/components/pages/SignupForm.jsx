// React and third-party libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Utilities
import { submitRequest } from "../../utils/submitRequest";

// Layout components
import PageCenterLayout from "../layout/PageCenterLayout";
import FormContainer from "../layout/FormContainer";
import SuccessFade from "../layout/SuccessFade";

// Common/reusable components
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import SuccessMessage from "../common/SuccessMessage";
import UserPassForm from "../common/UserPassFields";

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

    submitRequest("post", "/api/signup", form, setError, setShowError, () => {
      setShowForm(false);
      // Wait for hide animation to finish before playing checkmark
      setPendingSuccess(true);
    });
  };

  return (
    // Layout that centers everything on the page
    <PageCenterLayout>
      {/* Page title */}
      <h1 className="text-4xl font-semibold mb-4 tracking-tight">_SignUp_</h1>

      {/* Animated error message */}
      <ErrorMessage
        error={error}
        show={showError}
        onTransitionEnd={() => {
          if (!showError && error) setError(null);
        }}
      />

      {/* Container for the form and success message */}
      <FormContainer>
        {/* Signup form with fade transition */}
        <SuccessFade
          style={{
            opacity: showForm ? 1 : 0,
            pointerEvents: showForm ? "auto" : "none",
          }}
          onTransitionEnd={() => {
            // When form fades out, show the success animation
            if (!showForm && pendingSuccess) {
              setShowSuccess(true);
              setPendingSuccess(false);
            }
          }}
        >
          <UserPassForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            buttonText="Sign Up"
          >
            {/* Button to switch to login page */}
            <Button type="button" onClick={() => navigate("/login")}>
              Log In
            </Button>
          </UserPassForm>
        </SuccessFade>

        {/* Success message with fade transition */}
        <SuccessFade
          style={{
            opacity: showSuccess ? 1 : 0,
            pointerEvents: showSuccess ? "auto" : "none",
          }}
        >
          {/* Show success message only when signup is successful */}
          {showSuccess && <SuccessMessage onLogin={() => navigate("/login")} />}
        </SuccessFade>
      </FormContainer>
    </PageCenterLayout>
  );
}

export default SignupForm;
