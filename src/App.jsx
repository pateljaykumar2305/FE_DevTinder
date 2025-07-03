import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashBoard from "./pages/DashBoard";
import ProfilePage from "./pages/ProfilePage";
import RequestPage from "./pages/RequestPage";
import ConnectionPage from "./pages/ConnectionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/requestpage" element={<RequestPage />} />
        <Route path="/connectionpage" element={<ConnectionPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;