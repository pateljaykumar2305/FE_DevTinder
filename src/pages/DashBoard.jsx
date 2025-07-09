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
                console.log('Fetching suggestions with token:', token);
                const res = await fetch(`http://localhost:5173/user/suggestions`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch suggestions');
                }
                const data = await res.json();
                localStorage.setItem('token', data.token);
                console.log('token set in localStorage:', data.token);
                setSuggestions(res.data.data);
                console.log('Suggestions fetched:', res.data.data);
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

    const handleChangePassword = () => {
        navigate('/changepassword');
    }

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Tinder--Streamline-Core-Gradient" height={14} width={14} ><desc>{"\n    Tinder Streamline Icon: https://streamlinehq.com\n  "}</desc><g id="Free Gradient/Computer Devices/tinder"><path id="Union" fill="url(#paint0_linear_14402_12898)" fillRule="evenodd" d="M8.21914.101872c-.15125-.1149073-.35454-.1341924-.52469-.0497739-.17016.0844189-.27779.2579599-.27779.4479049 0 1.754387-.41852 4.063177-2.55177 4.976897-.29264-.42249-.57323-1.14307-.57323-2.19118 0-.17375-.0902-.33505-.23824-.42601-.14803-.09096-.33268-.09855-.48768-.02004C2.47744 3.39089 1 4.95839 1 7.92857c0 1.99059.74164 3.52133 1.88417 4.55013C4.01799 13.4996 5.5167 14 7 14c1.48329 0 2.982-.5004 4.1158-1.5213C12.2584 11.4499 13 9.91916 13 7.92857c0-3.98156-2.9519-6.43718-4.78086-7.826698Z" clipRule="evenodd" /></g><defs><linearGradient id="paint0_linear_14402_12898" x1={14.04} x2={-3.727} y1={16.965} y2={6.148} gradientUnits="userSpaceOnUse"><stop stopColor="#ffd600" /><stop offset={1} stopColor="#ff007a" /></linearGradient></defs></svg>
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
                         
                            {(() => {
                                // Try to get user info from localStorage or suggestions
                                let username = '';
                                // Try to get user info from localStorage (token-based)
                                const userStr = localStorage.getItem('user');
                                if (userStr) {
                                    try {
                                        const userObj = JSON.parse(userStr);
                                        username = userObj?.name || userObj?.username || '';
                                    } catch (e) {
                                        username = '';
                                    }
                                }
                                // Fallback: Try to get from currentUser (not suggestions[0])
                                if (!username && currentUser) {
                                    username = currentUser.name || currentUser.username || '';
                                }
                                return (
                                    <span>
                                        Welcome {username ? username : 'UserJay'}
                                    </span>
                                );
                            })()}
                        </div>
                        <ul>
                            <li onClick ={handleProfile}>Profile <span className="new-badge">New</span></li>
                            <li onClick ={handleConnections}>Connections</li>
                            <li onClick ={handleRequest}>Requests</li>
                            <li onClick = {handleChangePassword}>Change Password <span className="gear">⚙️</span></li>
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
