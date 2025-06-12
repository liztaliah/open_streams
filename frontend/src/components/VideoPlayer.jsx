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
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1>_OpenStreams_</h1>
      <video
        src="/api/video"
        controls
        autoplay
        className="w-full max-w-2xl rounded-lg"
      >
        Your browser does not support the video tag
      </video>
    </div>
  );
}
