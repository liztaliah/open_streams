import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function VideoPlayer() {
  const navigate = useNavigate();

  // Check for the token
  useEffect(() => {
    axios.get("/api/check-auth", { withCredentials: true }).catch(() => {
      navigate("/login");
    });
  }, [navigate]);

  return (
    <div className="flex flex-col items-center min-h-screen px-4">
      <h1 className="text-4xl font-semibold mt-8 mb-8">_OpenStreams_</h1>
      <video
        src="/api/video"
        controls
        autoplay
        className="w-full max-w-6xl rounded-lg bg-black"
        style={{ objectFit: "contain" }}
      >
        Your browser does not support the video tag
      </video>
    </div>
  );
}

export default VideoPlayer;
