import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true");
      navigate('/dashboard');
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <div style={{ marginLeft: "14rem" }}>
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] py-12">
          <div className="w-full max-w-7xl flex flex-col md:flex-row bg-[#1e293b] rounded-3xl overflow-hidden shadow-2xl">

            {/* Left Side - Login Form */}
            <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg mx-auto"
              >
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Welcome Back
                  </h1>
                  <h2 className="text-2xl text-blue-500 font-semibold">
                    <span className="text-green-400">Bet</span>Zone Pro
                  </h2>
                  <p className="text-gray-400 mt-2">
                    Sign in to access your betting dashboard
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full rounded-xl bg-[#0f172a] text-white border border-gray-600 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="w-full rounded-xl bg-[#0f172a] text-white border border-gray-600 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    <a href="#" className="hover:underline">Forgot Password?</a>
                  </div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold py-3 px-4 rounded-xl transition duration-300 hover:from-blue-600 hover:to-green-600 flex justify-center items-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </motion.div>
                </form>
                <p className="text-xs text-gray-500 mt-6 text-center">
                  By continuing, you agree to our <a href="#" className="underline text-blue-400">Terms & Conditions</a> and <a href="#" className="underline text-blue-400">Privacy Policy</a>.
                </p>
              </motion.div>
            </div>

            {/* Right Side - Betting Info */}
            <div className="hidden md:flex w-1/2 bg-[#0f172a] items-center justify-center relative p-12">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    {/* Betting Icon */}
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                      <circle cx="10" cy="14" r="5" fill="#34D399" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Fast & Secure Betting
                  </h3>
                  <p className="text-gray-300 text-lg mb-6">
                    Bet on your favorite sports with live odds & instant payouts
                  </p>
                </motion.div>
                <div className="space-y-4 text-left">
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span>Instant deposits & withdrawals</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span>Best odds guaranteed</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    <span>Wide range of sports & events</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>24/7 support for bettors</span>
                  </div>
                </div>
              </div>
              <div className="absolute bg-blue-500 rounded-full w-40 h-40 top-10 right-10 opacity-10 -z-10"></div>
              <div className="absolute bg-green-400 rounded-full w-32 h-32 bottom-10 left-10 opacity-10 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
