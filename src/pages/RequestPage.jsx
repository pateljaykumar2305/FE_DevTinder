import React , { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RequestPage.css';

const RequestPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:3000/user/request/received', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRequests(res.data.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }   
        }   
        fetchRequests();
    }, []);

    if (loading) {
        return <div className="request-page-container"><div className="request-page">Loading...</div></div>;
    }
    if (requests.length === 0) {
        return <div className="request-page-container"><div className="request-page">No requests found.</div></div>;
    }   
    
    const handleAction = async (action, requestId) => {
        const request = requests.find(r => r._id === requestId);
        if (!request) return;
        const fromUserID = request.fromUserID._id;
        const token = localStorage.getItem('token');
        const url = `${import.meta.env.VITE_API_BASE_URL}/request/view/${action === 'accept' ? 'accepted' : 'rejected'}/${fromUserID}`;
        try {
            await axios.post(url, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Refresh requests after action
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/request/received`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRequests(res.data.data);

            toast.success(`Request ${action} successfully`);
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong!');
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
            <div className="request-page-container">
                <h1 className="request-title">Received Requests</h1>
                <ul className="request-list">
                    {requests.map((request) => {
                        const sender = request.fromUserID;
                        return (
                            <li key={request._id} className="request-item">
                                <div className="request-details">
                                    <img
                                        src={sender.photoURL || "https://ui-avatars.com/api/?name=User"}
                                        alt={`${sender.firstName} ${sender.lastName}`}
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
                                    <h2>{`${sender.firstName} ${sender.lastName}`}</h2>
                                    <p><strong>Age:</strong> {sender.age}</p>
                                    <p><strong>About:</strong> {sender.about}</p>
                                    <p><strong>Skills:</strong> {Array.isArray(sender.skills) ? sender.skills.join(', ') : sender.skills}</p>
                                </div>
                                <div className="request-actions">
                                    <button className="accept-btn" onClick={() => handleAction('accept', request._id)}>Accept</button>
                                    <button className="reject-btn" onClick={() => handleAction('reject', request._id)}>Reject</button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    )
}

export default RequestPage;
