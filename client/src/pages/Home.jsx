import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (!user) {        
        navigate("/login");
        return null;
    }

    return (
        <div className="min-h-screen bg-green-50 p-8">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-extrabold text-green-700">🥕 Food Sharing Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors"
                >
                    Logout
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Welcome, {user.name || user.email}!
                </h2>
                <p className="text-gray-600 mb-4">
                    Thank you for joining our mission to reduce food waste.
                    This is your main application content.
                </p>
                <p className="text-sm text-gray-500">
                    Your token (for demonstration): **{user.token ? user.token.substring(0, 20) + '...' : 'N/A'}**
                </p>
            </div>
        </div>
    );
}