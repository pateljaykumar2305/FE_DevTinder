import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./SignUpPages.css";

axios.defaults.baseURL = "http://localhost:3000"; // Update to match your backend's actual URL
axios.defaults.withCredentials = true;

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        photoURL: "",
        about: "",
        skills: "",
        age: "",
        gender: "",
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post("/auth/signup", formData)
        .then((res) => {
          console.log("Signup successful:", res.data);
          navigate("/"); // Redirect to login page
        })
        .catch((err) => {
          console.error("Signup failed:", err.response?.data || err.message);
        });
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h1>🔥 DevTinder</h1>
                <p>Join the community of developers and start building connections today.</p>
                <div className="input-group">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="photoURL"
                        placeholder="Photo URL"
                        value={formData.photoURL}
                        onChange={handleChange}
                    />
                    <textarea
                        name="about"
                        placeholder="Tell us about yourself"
                        rows="4"
                        value={formData.about}
                        onChange={handleChange}
                    ></textarea>
                    <input
                        type="text"
                        name="skills"
                        placeholder="Skills (comma-separated)"
                        value={formData.skills}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button type="submit">Sign Up</button>
                <div className="extra-links">
                    <p>
                        Already have an account?{" "}
                        <a href="/login">Log in</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;