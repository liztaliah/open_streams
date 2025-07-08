import { useEffect, useState } from "react";
import { submitRequest } from "../../utils/submitRequest";
import RoomCard from "../common/RoomCard";
import PageCenterLayout from "../layout//PageCenterLayout";

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
      <h1 className="text-4xl font-semibold mb-4 tracking-tight">
        _ViewingRooms_
      </h1>
      {showError && <div style={{ color: "red" }}>{error}</div>}
      <div className="flex flex-wrap">
        {roomDirectory.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </PageCenterLayout>
  );
}
