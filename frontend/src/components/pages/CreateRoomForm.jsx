import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import FormContainer from "../layout/FormContainer";
import { submitRequest } from "../../utils/submitRequest";
import { UserContext } from "../../context/UserContext";

export default function CreateRoomForm() {
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const { username } = useContext(UserContext); // Get username from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitRequest(
      "post",
      "/api/rooms",
      { name: username }, // Use username as room name
      setError,
      setShowError,
      (response) => {
        navigate(`/room/${response.data.id}`);
      },
      { withCredentials: true }
    ).catch((err) => {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    });
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
          className="flex flex-col items-center mt-2 w-full max-w-xs"
        >
          <div className="flex space-x-4">
            <Button type="submit">Host</Button>
            <Button type="submit">Viewer</Button>
          </div>
        </form>
      </FormContainer>
    </div>
  );
}
