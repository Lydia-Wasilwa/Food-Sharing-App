// src/pages/Auth.jsx
import React, { useState, useEffect } from 'react';
import { apiCall } from "../services/api";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setError('');
    setMessage('');
  }, [isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      if (isLogin) {
        const data = await apiCall('/login', { email, password });
        localStorage.setItem('token', data.token);
        setMessage("Login successful!");
      } else {
        const data = await apiCall('/register', { name, email, password });
        setMessage("Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    }

    setPassword('');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">

        <h1 className="text-3xl font-bold text-center mb-4">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        {error && <p className="bg-red-100 text-red-700 p-3 rounded">{error}</p>}
        {message && <p className="bg-green-100 text-green-700 p-3 rounded">{message}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-lg"
            disabled={isLoading}
          >
            {isLoading
              ? (isLogin ? "Logging In..." : "Registering...")
              : (isLogin ? "Log In" : "Create Account")}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don’t have an account?" : "Already registered?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 ml-1"
          >
            {isLogin ? "Register" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
