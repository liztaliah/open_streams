import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../common/ErrorMessage";
import StreamPlayer from "../common/StreamPlayer";
import ChatBox from "../common/ChatBox";
import { UserContext } from "../../context/UserContext";

export default function RoomPage() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false); // For error animation
  const navigate = useNavigate();
  const { username } = useContext(UserContext);

  // Fetch room data
  useEffect(() => {
    axios
      .get(`/api/rooms/${roomId}`, { withCredentials: true })
      .then((res) => setRoom(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          setError("Could not load room.");
          setShowError(true);
        }
      });
  }, [roomId, navigate]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ErrorMessage
          error={error}
          show={showError}
          onTransitionEnd={() => {
            if (!showError && error) setError(null);
          }}
        />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Loading room...</p>
      </div>
    );
  }

  // Replace with your actual logic for getting the stream key
  const streamKey = room?.streamKey || "test";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-semibold mb-4">{room.name}</h1>
      <p className="mb-4 text-neutral-400">
        Hosted by user ID: <span className="font-mono">{room.host_id}</span>
      </p>
      {/* Stream Player */}
      <StreamPlayer src={`http://localhost:8080/hls/${streamKey}.m3u8`} />
      {/* Chat Box */}
      <ChatBox roomId={room.id} username={username} />
      {/* Placeholder for future: list of users in the room */}
      {/* <div>Users in this room: ...</div> */}
    </div>
  );
}
