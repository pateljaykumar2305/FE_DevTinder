import React , { useState } from 'react';
import axios from 'axios';
import './ChangePasswordPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePasswordPage = () => {
    const [form, setForm] = useState({
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {
            toast.error('New passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`http://localhost:5173/auth/changePassword`, {
                email: form.email,
                oldPassword: form.currentPassword,
                newPassword: form.newPassword
            });
            localStorage.setItem('token', res.data.token);
            toast.success(res.data.message || 'Password changed successfully!');
            setForm({
                email: '',
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                'Failed to change password. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <ToastContainer position="top-right" autoClose={2000} />
        <nav className="navbar">
                <div className="navbar-title">DevTinder</div>
                <div className="navbar-links">
                    <button className="navbar-btn" onClick={() => window.location.href = '/dashboard'}>DashBoard</button>
                    <button className="navbar-btn" onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/';
                    }}>Logout</button>
                </div>
            </nav>
        <div className="change-password-container">
            <h1>Change Password</h1>
            <form className="change-password-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="currentPassword">Current Password:</label>
                <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={form.currentPassword}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="newPassword">New Password:</label>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="confirmPassword">Confirm New Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Changing...' : 'Change Password'}
                </button>
            </form>
        </div>
        </>
    );
};

export default ChangePasswordPage;
