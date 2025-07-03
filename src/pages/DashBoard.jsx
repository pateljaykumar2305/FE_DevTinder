import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DashBoard.css';
import UserCard from '../components/UserCard';

const Dashboard = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();
    const navigate = useNavigate();

    const handleNextUser = () => {
        setCurrentIndex((prev) => prev + 1);
    };

    const currentUser = suggestions[currentIndex];

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:3000/user/suggestions', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSuggestions(res.data.data);
            } catch (err) {
                console.error('Error fetching suggestions:', err.message);
            }
        };
        fetchSuggestions();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleProfile = () => {
        navigate('/profilepage');
    };

    const handleRequest = () => {
        navigate('/requestpage');
    }

    const handleConnections = () => {
        navigate('/connectionpage');
    }

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <h3>DevTinder</h3>
                <img
                    className="logo"
                    src="https://shorturl.at/zRRMQ"
                    alt="User"
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{ cursor: 'pointer' }}
                />
                {menuOpen && (
                    <div className="dropdown-menu" ref={menuRef}>
                        <div className="dropdown-header">
                            Welcome User
                        </div>
                        <ul>
                            <li onClick ={handleProfile}>Profile <span className="new-badge">New</span></li>
                            <li onClick ={handleConnections}>Connections</li>
                            <li onClick ={handleRequest}>Requests</li>
                            <li>Change Password <span className="gear">⚙️</span></li>
                            <li onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                )}
            </nav>
            <h2>People You May Know</h2>
            <div className="card-grid">
                {currentUser ? (
                    <UserCard user={currentUser} onAction={handleNextUser} />
                ) : (
                    <p>No suggestions left</p>
                )}
            </div>
        </div>
    );
}


export default Dashboard;
