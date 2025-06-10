import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm"
import UserList from "./components/UserList";

function App() {
  return (
    <div>
      <h1 className='text-red-500'>Hello World</h1>
      <Router>
        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<UserList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
