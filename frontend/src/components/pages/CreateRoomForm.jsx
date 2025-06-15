import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import FormContainer from "../layout/FormContainer";
import { submitForm } from "../../utils/submitForm";
import Input from "../common/Input";

export default function CreateRoomForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  // Set input on form change
  const handleChange = (e) => {
    if (error) setShowError(false);
    setName(e.target.value);
  };

  // Submit room creation form
  const handleSubmit = async (e) => {
    e.preventDefault();
    submitForm(
      "/api/rooms",
      { name },
      setError,
      setShowError,
      (response) => {
        navigate(`/room/${response.data.id}`);
      },
      { withCredentials: true }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-semibold mb-4 tracking-tight">
        _CreateRoom_
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
            className="text-center rounded-lg mb-6"
          />
          <Button type="submit">Create</Button>
        </form>
      </FormContainer>
    </div>
  );
}
