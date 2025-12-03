// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { apiCall } from "../services/api"; 

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
  
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     if (error) setError(null);
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const data = await apiCall("/login", form);
      
//       login(data);
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
        
//         {/* Header with Food Branding */}
//         <div className="bg-orange-600 p-8 text-center">
//           <h2 className="text-3xl font-bold text-white tracking-wide">
//             Welcome Back
//           </h2>
//           <p className="text-orange-100 mt-2 text-sm">
//             Login to save food and reduce waste.
//           </p>
//         </div>

//         <div className="p-8">
//           <form onSubmit={submit} className="space-y-6">
            
//             {/* Error Alert */}
//             {error && (
//               <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 flex items-center animate-pulse">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 {error}
//               </div>
//             )}

//             {/* Email Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <input
//                 name="email"
//                 type="email"
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
//                 placeholder="you@example.com"
//                 value={form.email}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Password Input */}
//             <div>
//               <div className="flex items-center justify-between mb-1">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <span className="text-xs text-orange-600 hover:text-orange-800 font-medium cursor-pointer">
//                   Forgot?
//                 </span>
//               </div>
//               <input
//                 name="password"
//                 type="password"
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
//                 placeholder="••••••••"
//                 value={form.password}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
//             >
//               {loading ? (
//                 <div className="flex items-center space-x-2">
//                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   <span>Logging in...</span>
//                 </div>
//               ) : (
//                 "Login"
//               )}
//             </button>
//           </form>

//           {/* Footer Link */}
//           <div className="mt-6 text-center text-sm text-gray-600">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-orange-600 font-bold hover:underline">
//               Sign up
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiCall } from "../services/api"; // Updated path

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // The apiCall function now takes the endpoint '/login'
      const data = await apiCall("/login", form); 
      
      login(data); // `data` should contain user info and token
      navigate("/");
    } catch (err) {
      console.error(err);
      // Use the error message thrown by apiCall
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
        
        {/* Header with Food Branding */}
        <div className="bg-orange-600 p-8 text-center">
          <h2 className="text-3xl font-bold text-white tracking-wide">
            Welcome Back 👋
          </h2>
          <p className="text-orange-100 mt-2 text-sm">
            Please Login
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={submit} className="space-y-6">
            
            {/* Error Alert */}
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 flex items-center animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <span className="text-xs text-orange-600 hover:text-orange-800 font-medium cursor-pointer">
                  Forgot?
                </span>
              </div>
              <input
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   <span>Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-orange-600 font-bold hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}