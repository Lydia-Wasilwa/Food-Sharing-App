import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiCall } from "../services/api"; 

export default function Register() {
    const [form, setForm] = useState({ email: "", password: "", name: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    // (Simplified) Same logic as Login for handleChange and submit
    const handleChange = (e) => { /* ... */ setForm({ ...form, [e.target.name]: e.target.value }); if (error) setError(null); };

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await apiCall("/register", form);
            login(data); // Log in immediately after successful registration
            navigate("/");
        } catch (err) {
            setError(err.message || "Registration failed. Try a different email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100 p-8">
                <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">Create Your Account</h2>
                <form onSubmit={submit} className="space-y-4">
                    {/* Error Alert and Inputs similar to Login.jsx */}
                    {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-100">{error}</div>}
                    
                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input name="name" type="text" required onChange={handleChange} placeholder="Your Name" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input name="email" type="email" required onChange={handleChange} placeholder="Email" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
                    </div>
                    
                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input name="password" type="password" required onChange={handleChange} placeholder="Password" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg disabled:opacity-70">
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-orange-600 font-bold hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}