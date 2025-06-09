import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm"
import UserList from "./components/UserList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;
