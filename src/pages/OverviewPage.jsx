import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
// import StatCard from "../components/common/StatCard";
import ProductsTable from "../components/overview/Usertable";
import AlertNotifications from "../components/overview/Alert-notifcation";

const OverviewPage = () => {
    return (
        <div className='flex-1 overflow-auto relative z-10'>
            {/* Background with similar styling to sidebar */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-800"></div>
                {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div> */}
                
                {/* Glass morphism overlay */}
                <div className="absolute inset-0 backdrop-blur-sm bg-black/10"></div>
                
                {/* Gradient overlay for content readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10">
                {/* Header with glass morphism styling */}
                <motion.div
                    className="backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Header title='User Management' />
                </motion.div>

                {/* Alert Notifications with enhanced styling */}
                <motion.div
                    className="relative z-10 p-4 lg:p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 shadow-lg">
                        <AlertNotifications />
                    </div>
                </motion.div>

                {/* Main Content */}
                <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8 space-y-6'>
                    {/* Stats Cards Section */}

                    {/* Products Table Section */}
                    <motion.div
                        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-lg overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {/* Table Header */}
                        <div className="p-6 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl backdrop-blur-sm border border-indigo-500/30">
                                    <BarChart2 size={20} className="text-indigo-400 drop-shadow-sm" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white drop-shadow-lg">User Management Table</h3>
                                    <p className="text-gray-400 text-sm">Manage and monitor all user activities</p>
                                </div>
                            </div>
                        </div>

                        {/* Table Content */}
                        <div className="p-6">
                            <ProductsTable />
                        </div>
                    </motion.div>

                    {/* Additional Content Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Quick Actions Panel */}
                        <motion.div
                            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl backdrop-blur-sm border border-green-500/30">
                                    <Zap size={20} className="text-green-400 drop-shadow-sm" />
                                </div>
                                <h3 className="text-lg font-bold text-white drop-shadow-lg">Quick Actions</h3>
                            </div>
                            
                            <div className="space-y-3">
                                <motion.button
                                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-white text-sm font-medium text-left backdrop-blur-sm shadow-lg"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Add New User
                                </motion.button>
                                <motion.button
                                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-white text-sm font-medium text-left backdrop-blur-sm shadow-lg"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Export Data
                                </motion.button>
                                <motion.button
                                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-white text-sm font-medium text-left backdrop-blur-sm shadow-lg"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Generate Report
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Recent Activity Panel */}
                        <motion.div
                            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl backdrop-blur-sm border border-blue-500/30">
                                    <BarChart2 size={20} className="text-blue-400 drop-shadow-sm" />
                                </div>
                                <h3 className="text-lg font-bold text-white drop-shadow-lg">Recent Activity</h3>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                                    <p className="text-white text-sm font-medium">New user registered</p>
                                    <p className="text-gray-400 text-xs">2 minutes ago</p>
                                </div>
                                <div className="p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                                    <p className="text-white text-sm font-medium">Contest ended</p>
                                    <p className="text-gray-400 text-xs">15 minutes ago</p>
                                </div>
                                <div className="p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                                    <p className="text-white text-sm font-medium">Payment processed</p>
                                    <p className="text-gray-400 text-xs">1 hour ago</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </main>
            </div>

            {/* Decorative elements similar to sidebar */}
            {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-60"></div> */}
            {/* <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div> */}
        </div>
    );
};

export default OverviewPage;
