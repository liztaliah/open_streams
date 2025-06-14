import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import FormContainer from "../layout/FormContainer";
import Input from "../common/Input";

export default function CreateRoomForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (error) setShowError(false);
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        "/api/rooms/",
        { name },
        { withCredentials: true }
      );
      setName("");
      navigate(`/room/${response.data.id}`);
    } catch (err) {
      const errorMsg = err.response?.data?.error;
      if (errorMsg === "Token has expired!") {
        navigate("/login"); // Navigate to login page for exp token
        return;
      }
      setError(errorMsg || "Could not create room.");
      setShowError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-semibold mb-4 tracking-tight">
        Create a Room
      </h1>
      <ErrorMessage
        error={error}
        show={showError}
        onTransitionEnd={() => {
          if (!showError && error) setError(null);
        }}
      />
      <FormContainer>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full max-w-xs"
        >
          <Input
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="Room Name"
            required
            className="rounded-lg mb-2"
          />
          <Button type="submit">Create Room</Button>
        </form>
      </FormContainer>
    </div>
  );
}
