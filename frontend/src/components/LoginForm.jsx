import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
    const [form, setForm] = useState({username: "", password: ""});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Update the username/password form upon text entry
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Submit the username/password and await the response from the API
    const handleSubmit = async (e) => {
        e.preventDefault() // Prevents the page from reloading
        setError(null);    // Clear old errors

        try {
            const response  = await axios.post("/api/login", form);

            // Save token to localStorage
            localStorage.setItem("token", response.data.token);

            // Redirect to the user list -- Change This to HomePage
            navigate("/home");
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.error);
            } else {
                setError("An unknown error occured.")
            }
        }
    };

    return (
        <div style={{ maxWidth: 400, magin: "0 auto" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <br />
                <input 
                    type="password" 
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <br />
                <button type="submit">Log In</button>
            </form>
            {error && <p style={{ color: "red"}}> {error}</p>}
        </div>
    )
}

export default LoginForm;