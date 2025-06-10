import { useNavigate } from "react-router-dom"

function Landing() {
    const navigate = useNavigate();
    
    return (
        <div>
            <h1>Welcome!</h1>
            <button onClick={() => navigate("/login")}>Log In</button>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
    );
}

export default Landing;