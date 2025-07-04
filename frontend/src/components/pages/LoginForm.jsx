import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../common/ErrorMessage";
import UserPassForm from "../common/UserPassFields";
import FormContainer from "../layout/FormContainer";
import { submitRequest } from "../../utils/submitRequest";
import { UserContext } from "../../context/UserContext";

function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const { setUsername } = useContext(UserContext);

  const navigate = useNavigate();

  // Update the username/password form upon text entry
  const handleChange = (e) => {
    if (error) setShowError(false); // Start fade out, don't clear error yet
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit the username/password and await the response from the API
  const handleSubmit = (e) => {
    e.preventDefault();
    submitRequest("post", "/api/login", form, setError, setShowError, () => {
      setUsername(form.username); // Set the username to access later
      navigate("/create-room");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-semibold mb-4 tracking-tight">_Login_</h1>
      <ErrorMessage
        error={error}
        show={showError}
        onTransitionEnd={() => {
          if (!showError && error) {
            setError(null); // Clear the error after fade out
          }
        }}
      />
      <FormContainer>
        <UserPassForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          buttonText="Log In"
        />
      </FormContainer>
    </div>
  );
}

export default LoginForm;
