import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import LoginForm from "./components/pages/LoginForm";
import SignupForm from "./components/pages/SignupForm";
import VideoPlayer from "./components/pages/VideoPlayer";
import CreateRoomForm from "./components/pages/CreateRoomForm";
import RoomPage from "./components/pages/RoomPage";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<VideoPlayer />} />
          <Route path="/create-room" element={<CreateRoomForm />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
