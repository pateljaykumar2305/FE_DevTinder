import React, { useState , useEffect } from "react";
import axios from 'axios';

const UserCard = ({ user, onAction }) => {
    const { firstName, lastName, age, about, photoURL, skills, _id } = user;
    const [mutualFriendsCount, setMutualFriendsCount] = useState(0);
   
    if (!user) return <div>Loading...</div>;
    
   
    useEffect(() => {
       
        const fetchMutualFriends = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from localStorage
                const res = await axios({
                    method: 'get',
                    url: `http://localhost:3000/user/mutualConnections/${_id}`,
                    headers: {
                        Authorization: `Bearer ${token}`, // Add Authorization header
                    },
                });
                
                // console.log('Mutual friends length:', res.data.length); // Debugging line
                // console.log('Mutual friends count:', res.data.count); // Debugging line
                // setMutualFriendsCount(res.data.length);
                //const count = Array.isArray(res.data) ? res.data.length : (res.data?.count ?? 0);
                setMutualFriendsCount(res.data.data.length);// Set count to 0 if res.data is not an array or is empty
            

            } catch (err) {
                console.error('Error fetching mutual friends:', err.message);
                setMutualFriendsCount(0);
            }
        };

        fetchMutualFriends();
    }, [_id]);

    const handleAction = async (actionType) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            const res = await axios({
                method: 'post',
                url: `http://localhost:3000/request/send/${actionType}/${_id}`,
                headers: {
                    Authorization: `Bearer ${token}`, // Add Authorization header
                },
            });

            console.log(`${actionType} action successful for user ${_id}:`, res.data);
            alert(res.data.message); // Display success message
            onAction(); // Show next user
        } catch (err) {
            console.error(`Error performing ${actionType} action for user ${_id}:`, err.message);
            alert(`Error: ${err.response?.data?.message || err.message}`); // Display error message
        }
    };

    return (
        
        <div className="user-card">
         
            <img
                src={photoURL || "https://shorturl.at/HT5bY"}
                alt={`${firstName} ${lastName}`}
                className="profile-pic"
            />
            <div className="user-info">
                <h3>
                    {firstName} {lastName}, {age}
                </h3>
                <p className="user-title">Full Stack Developer</p>
                <p className="user-about">{about}</p>
                <div className="skills">
                    {Array.isArray(skills) &&
                        skills.map((skill, i) => (
                            <span key={i} className="skill-tag">
                                #{skill}
                            </span>
                        ))}
                </div>
                 
                    <p className="mutual-connections">
                        {mutualFriendsCount} Mutual Friends
                    </p>
                
                <div className="actions">
                    <button
                        className="action-btn reject"
                        onClick={() => handleAction('ignore')}
                    >
                        ✖
                    </button>
                    <button
                        className="action-btn accept"
                        onClick={() => handleAction('interested')}
                    >
                        ❤️
                    </button>
                </div>
            </div>
        </div>
    );
};


export default UserCard;