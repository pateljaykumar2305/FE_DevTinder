import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./SignUpPages.css";

axios.defaults.baseURL = `https://devtinder-1-8u6r.onrender.com`
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

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation
        if (!formData.firstName) return toast.error("First Name is required");
        if (!formData.lastName) return toast.error("Last Name is required");
        if (!formData.email) return toast.error("Email is required");
        if (!formData.password) return toast.error("Password is required");
        if (!formData.age) return toast.error("Age is required");
        if (!formData.gender) return toast.error("Gender is required");

        axios
        .post("/auth/signup", formData)
        .then((res) => {
          toast.success("Signup successful!");
          localStorage.setItem('token', res.data.token);
          setTimeout(() => navigate("/"), 2000);
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || "Signup failed");
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
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
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
                    />
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
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
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default SignUpPage;