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
  const [roomlist, setRoomList] = useState([]);
  const navigate = useNavigate();
  const { username } = useContext(UserContext);

  const handleSubmit = async (e, method) => {
    e.preventDefault();
    submitRequest(
      method,
      "/api/rooms",
      method === "post" ? { name: username } : null,
      setError,
      setShowError,
      (response) => {
        if (method === "post") {
          navigate(`/room/${response.data.id}`);
        } else if (method === "get") {
          setRoomList(response.data);
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
          <form onSubmit={(e) => handleSubmit(e, "post")}>
            <Button type="submit">Host</Button>
          </form>
          <form onSubmit={(e) => handleSubmit(e, "get")}>
            <Button type="submit">Viewer</Button>
          </form>
        </div>
      </FormContainer>
      <div>
        <ul>
          {roomlist.map((room, idx) => (
            <li key={room.id || idx}>
              {room.id}: {room.name}
            </li>
          ))}
        </ul>
      </div>
    </PageCenterLayout>
  );
}
