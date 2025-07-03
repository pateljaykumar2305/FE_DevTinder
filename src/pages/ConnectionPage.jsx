import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ConnectionPage.css';

const ConnectionPage = () => {
    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConnections = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:3000/user/connections', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setConnections(res.data.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchConnections();
    }, []);

    if (loading) {
        return (
            <div className="request-page-container">
                <div className="request-page">Loading...</div>
            </div>
        );
    }

    if (connections.length === 0) {
        return (
            <div className="request-page-container">
                <div className="request-page">No connections found.</div>
            </div>
        );
    }

    return (
        <>
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
            <div className="request-page-container">
                <h1 className="request-title">Your Connections</h1>
                <ul className="request-list">
                    {connections.map((connection) => {
                        // Adjust according to your API response structure
                        // Assuming each connection object has a 'user' field for the connected user
                        const user = connection.user || connection; // fallback if API returns user directly
                        return (
                            <li key={connection._id || user._id} className="request-item">
                                <div className="request-details">
                                    <img
                                        src={user.photoURL || "https://ui-avatars.com/api/?name=User"}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        className="request-avatar"
                                        style={{
                                            width: 64,
                                            height: 64,
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                            marginBottom: 12,
                                            border: "2px solid #38bdf8"
                                        }}
                                    />
                                    <h2>{`${user.firstName} ${user.lastName}`}</h2>
                                    <p><strong>Age:</strong> {user.age}</p>
                                    <p><strong>About:</strong> {user.about}</p>
                                    <p><strong>Skills:</strong> {Array.isArray(user.skills) ? user.skills.join(', ') : user.skills}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default ConnectionPage;