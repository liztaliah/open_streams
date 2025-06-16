import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import FormContainer from "../layout/FormContainer";
import { submitForm } from "../../utils/submitForm";
import { UserContext } from "../../context/UserContext";

export default function CreateRoomForm() {
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const { username } = useContext(UserContext); // Get username from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitForm(
      "/api/rooms",
      { name: username }, // Use username as room name
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
          <Button type="submit">Host</Button>
        </form>
      </FormContainer>
    </div>
  );
}
