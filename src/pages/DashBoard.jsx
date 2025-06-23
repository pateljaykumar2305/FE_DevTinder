import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DashBoard.css';
import SwipeDeck from '../components/SwipeDeck';
import '../style/SwipeDeck.css'; 
import UserCard from '../components/UserCard';

const Dashboard = () => {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from localStorage
               
                const res = await axios({
                    method: 'get',
                    url: 'http://localhost:3000/user/suggestions',
                    headers: {
                        Authorization: `Bearer ${token}`, // Add Authorization header
                    },
                });

                setSuggestions(res.data.data);
            } catch (err) {
                console.error('Error fetching suggestions:', err.message);
            }
        };

        fetchSuggestions();
    }, []);

    return (
        <div className="dashboard-container">
            <h2>People You May Know</h2>
            <div className="card-grid">
                {suggestions.map((user) => (
                    <UserCard key={user._id} user={user} />
                ))}
            </div>
        </div>
    );
};



export default Dashboard;