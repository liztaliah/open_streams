import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignupForm() {
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

        try { axios.post("/api/signup", form).then(navigate("/login")); } 
        catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.error);
            } else {
                setError("An unknown error occured.")
            }
        }
    };

    return (
        <div style={{ maxWidth: 400, magin: "0 auto" }}>
            <h2>Sign Up</h2>
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
                <button type="submit">Sign Up</button>
            </form>
            {error && <p style={{ color: "red"}}> {error}</p>}
        </div>
    )
}

export default SignupForm;