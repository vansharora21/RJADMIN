LoginPage
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function LoginPage () {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    loanAmount: '',
    loanPurpose: ''
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

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phone: '',
      loanAmount: '',
      loanPurpose: ''
    });
  };

  return (
    <>
      <div style={{ marginLeft: "14rem" }}>
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] py-12">
          <div className="w-full max-w-7xl flex flex-col md:flex-row bg-[#1e293b] rounded-3xl overflow-hidden shadow-2xl">

            {/* Left Side - Form */}
            <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg mx-auto"
              >
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {isLogin ? 'Welcome Back' : 'Get Started'}
                  </h1>
                  <h2 className="text-2xl text-blue-500 font-semibold">
                    <span className="text-green-400">Quick</span>Loan Pro
                  </h2>
                  <p className="text-gray-400 mt-2">
                    {isLogin ? 'Access your loan dashboard' : 'Apply for your loan today'}
                  </p>
                </div>

                {/* Toggle Buttons */}
                <div className="flex bg-[#0f172a] rounded-xl p-1 mb-6">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${
                      isLogin 
                        ? 'bg-blue-500 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${
                      !isLogin 
                        ? 'bg-blue-500 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Apply Now
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <>
                      <div>
                        <label className="block text-gray-300 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          className="w-full rounded-xl bg-[#0f172a] text-white border border-gray-600 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required={!isLogin}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          className="w-full rounded-xl bg-[#0f172a] text-white border border-gray-600 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required={!isLogin}
                        />
                      </div>
                    </>
                  )}

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

                  {!isLogin && (
                    <>
                      <div>
                        <label className="block text-gray-300 mb-2">Confirm Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          className="w-full rounded-xl bg-[#0f172a] text-white border border-gray-600 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required={!isLogin}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 mb-2">Loan Amount ($)</label>
                          <input
                            type="number"
                            name="loanAmount"
                            className="w-full rounded-xl bg-[#0f172a] text-white border border-gray-600 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.loanAmount}
                            onChange={handleInputChange}
                            required={!isLogin}
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2">Purpose</label>
                          <select
                            name="loanPurpose"
                            className="w-full rounded-xl bg-[#0f172a] text-white border border-gray-600 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.loanPurpose}
                            onChange={handleInputChange}
                            required={!isLogin}
                          >
                            <option value="">Select</option>
                            <option value="personal">Personal</option>
                            <option value="business">Business</option>
                            <option value="home">Home</option>
                            <option value="auto">Auto</option>
                            <option value="education">Education</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {isLogin && (
                    <div className="text-right text-sm text-gray-400">
                      <a href="#" className="hover:underline">Forgot Password?</a>
                    </div>
                  )}

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold py-3 px-4 rounded-xl transition duration-300 hover:from-blue-600 hover:to-green-600 flex justify-center items-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        isLogin ? "Sign In" : "Submit Application"
                      )}
                    </button>
                  </motion.div>
                </form>

                <p className="text-xs text-gray-500 mt-6 text-center">
                  By continuing, you agree to our <a href="#" className="underline text-blue-400">Terms & Conditions</a> and <a href="#" className="underline text-blue-400">Privacy Policy</a>.
                </p>
              </motion.div>
            </div>

            {/* Right Side - Loan Info */}
            <div className="hidden md:flex w-1/2 bg-[#0f172a] items-center justify-center relative p-12">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Fast & Secure Loans
                  </h3>
                  <p className="text-gray-300 text-lg mb-6">
                    Get approved in minutes with competitive rates
                  </p>
                </motion.div>

                <div className="space-y-4 text-left">
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    <span>Quick approval process</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span>Competitive interest rates</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    <span>Flexible repayment terms</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>24/7 customer support</span>
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
