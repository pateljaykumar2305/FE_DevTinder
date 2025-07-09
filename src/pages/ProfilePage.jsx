import React , {useState , useEffect} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProfilePage.css';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:3000/profile/view', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(res.data.user);
            setForm(res.data.user);
        };
        fetchUser();
    }, []);
  
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        }); 
    }

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`http://localhost:5173/profile/edit`, form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            setEdit(false);
            toast.success("Profile updated successfully!");
        } catch (err) {
            toast.error("Profile update failed!");
        }
    };

    if (!user) return <div className="profile-page">Loading...</div>;

    return (
        <div className="profile-page">
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
            <h1>Profile Page</h1>
            <div className="profile-container">
                <div className="profile-details">
                    <p><b>Name:</b> {edit ? (
                        <input name="firstName" value={form.firstName || ''} onChange={handleChange} />
                    ) : (
                        `${user.firstName} ${user.lastName}`
                    )}</p>
                    <p><b>Email:</b> {edit ? (
                        <input name="email" value={form.email || ''} onChange={handleChange} />
                    ) : (
                        user.email
                    )}</p>
                    <p><b>Age:</b> {edit ? (
                        <input name="age" value={form.age || ''} onChange={handleChange} type="number" />
                    ) : (
                        user.age
                    )}</p>
                    <p><b>About:</b> {edit ? (
                        <input name="about" value={form.about || ''} onChange={handleChange} />
                    ) : (
                        user.about
                    )}</p>
                    <p><b>Skills:</b> {edit ? (
                        <input name="skills" value={form.skills || ''} onChange={handleChange} placeholder="Comma separated" />
                    ) : (
                        Array.isArray(user.skills) ? user.skills.join(', ') : user.skills
                    )}</p>
                    <p><b>Phone:</b> {edit ? (
                        <input name="phone" value={form.phone || ''} onChange={handleChange} />
                    ) : (
                        user.phone
                    )}</p>
                    <p><b>Gender:</b> {edit ? (
                        <select name="gender" value={form.gender || ''} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                            <option value="other">other</option>
                        </select>
                    ) : (
                        user.gender
                    )}</p>
                    <p><b>Photo URL:</b> {edit ? (
                        <input name="photoURL" value={form.photoURL || ''} onChange={handleChange} />
                    ) : (
                        <a href={user.photoURL || "#"} target="_blank" rel="noopener noreferrer">
                            {user.photoURL || "No photo URL"}
                        </a>
                    )}</p>

                    {edit ? (
                        <button className="profile-save-btn" onClick={handleSave}>Save</button>
                    ) : (
                        <button className="profile-edit-btn" onClick={() => setEdit(true)}>Edit</button>
                    )}
                </div>
                <div className="profile-photo">
                    <img
                        className="profile-img"
                        src={user.photoURL || "https://ui-avatars.com/api/?name=User&background=eee&color=555"}
                        alt="Profile"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
