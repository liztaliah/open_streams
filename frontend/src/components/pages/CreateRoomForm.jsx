import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import FormContainer from "../layout/FormContainer";
import { submitRequest } from "../../utils/submitRequest";
import { UserContext } from "../../context/UserContext";
import PageCenterLayout from "../layout/PageCenterLayout";

export default function CreateRoomForm() {
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const { username } = useContext(UserContext); // Get username from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Fetch the list of rooms
    submitRequest(
      "get",
      "/api/rooms",
      null,
      setError,
      setShowError,
      async (response) => {
        const rooms = response.data;
        // 2. Check if a room with the username exists
        const existingRoom = rooms.find((room) => room.name === username);

        if (existingRoom) {
          // 3. If it exists, navigate to that room
          navigate(`/room/${existingRoom.id}`);
        } else {
          // 4. If not, create the room and navigate to it
          submitRequest(
            "post",
            "/api/rooms",
            { name: username },
            setError,
            setShowError,
            (postResponse) => {
              navigate(`/room/${postResponse.data.id}`);
            },
            { withCredentials: true }
          ).catch((err) => {
            if (err.response?.status === 401) {
              navigate("/login");
            }
          });
        }
      },
      { withCredentials: true }
    ).catch((err) => {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    });
  };

  return (
    <PageCenterLayout>
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
        <div className="flex space-x-4 mt-4">
          <form onSubmit={handleSubmit}>
            <Button type="submit">Host</Button>
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/room-index");
            }}
          >
            <Button type="submit">Viewer</Button>
          </form>
        </div>
      </FormContainer>
    </PageCenterLayout>
  );
}
