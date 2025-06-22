import { useEffect, useState } from "react";
import { submitRequest } from "../../utils/submitRequest";
import PageCenterLayout from "../layout/PageCenterLayout";

export default function RoomIndex() {
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [roomDirectory, setRoomDirectory] = useState([]);

  // Fetch rooms on component mount
  useEffect(() => {
    submitRequest(
      "get",
      "/api/rooms",
      null,
      setError,
      setShowError,
      (response) => {
        setRoomDirectory(response.data);
      },
      { withCredentials: true }
    );
  }, []);

  return (
    <PageCenterLayout>
      <h1>Room Directory</h1>
      {showError && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {roomDirectory.map((room) => (
          <li key={room.id}>
            {room.name} (ID: {room.id})
          </li>
        ))}
      </ul>
    </PageCenterLayout>
  );
}
