import React, { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email); // Just send email for now
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-2xl max-w-md mx-auto mt-20 text-white"
    >
      <h2 className="text-3xl font-extrabold text-center">Dev Tinder Login</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <input
        type="password"
        placeholder="Enter your password"
        required
        className="border border-gray-300 p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        type="submit"
        className="bg-purple-700 text-white p-3 rounded-lg hover:bg-purple-800 transition duration-300 font-semibold"
      >
        Log In
      </button>
    </form>
  );
}