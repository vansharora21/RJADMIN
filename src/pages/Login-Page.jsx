import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import backgroundimg from './backimg.png';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

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
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%'
      }}
    >
      <div className="bg-black bg-opacity-70 rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-white text-3xl font-semibold mb-3 text-center">logo</h2>
        <div className="text-gray-400 mb-3 w-full text-center"></div>

        <form
          className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-900/80 to-gray-800/80 shadow-2xl rounded-xl p-8 border border-gray-700"
          onSubmit={handleSubmit}
        >
          <div className="mb-6 relative">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full rounded-lg bg-gray-800/80 px-4 py-3 text-white border border-gray-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-400 placeholder-gray-400 transition text-lg outline-none"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="username"
              required
            />
          </div>

          <div className="mb-6 relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-lg bg-gray-800/80 px-4 py-3 text-white border border-gray-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-400 placeholder-gray-400 pr-12 transition text-lg outline-none"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-400 hover:text-orange-500 transition focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-7-10-7a19.608 19.608 0 015.515-4.241M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 3l18 18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-gray-300 text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="form-checkbox accent-orange-500 mr-2"
              />
              Remember Me
            </label>
            <a href="#" className="text-xs text-orange-400 hover:underline transition">
              Forgot password?
            </a>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold rounded-lg py-3 mb-1 shadow-lg transition-all flex items-center justify-center focus:outline-none disabled:opacity-60"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>Login</>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
