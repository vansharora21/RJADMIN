    import { BarChart2, DollarSign, Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, Users, ClipboardPlus, LogOut } from "lucide-react";
    import { useState } from "react";
    import { AnimatePresence, motion } from "framer-motion";
    import { Link, useNavigate } from "react-router-dom";
    import logo from './logo.png';

    const SIDEBAR_ITEMS = [
        { name: "User Management", icon: BarChart2, color: "#6366f1", href: "/dashboard" },
        { name: "Contest Management", icon: ShoppingBag, color: "#8B5CF6", href: "/games" },
        { name: "Team & Player Management", icon: Users, color: "#EC4899", href: "/users" },
        { name: "Wallet &Transaction", icon: DollarSign, color: "#10B981", href: "/wallet" },
        { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" }
    ];

    const Sidebar = () => {
        const [isSidebarOpen, setIsSidebarOpen] = useState(true);
        const navigate = useNavigate();
        
        const handleLogout = () => {
            localStorage.removeItem("isAuthenticated");
            navigate("/");
        };

        return (
            
            <motion.div
                className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
                    isSidebarOpen ? "w-64" : "w-20"
                }`}
                animate={{ width: isSidebarOpen ? 256 : 80 }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-800"></div>
                <div className='h-full relative overflow-hidden flex flex-col border-r border-gray-700/50'>
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                        {/* You can replace this with your own background image */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-800"></div>
                        
                        {/* Glass morphism overlay */}
                        <div className="absolute inset-0 backdrop-blur-xl bg-black/20 border border-white/5"></div>
                        
                        {/* Gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
                    </div>

                    {/* Content Container */}
                    <div className="relative z-10 p-4 flex flex-col h-full">
                        {/* Toggle Button */}
                        <div className="flex justify-start mb-6">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className='p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg'
                            >
                                <Menu size={20} className="text-white drop-shadow-sm" />
                            </motion.button>
                        </div>

                        {/* Logo/Brand Area */}
                        <div className="mb-8">
                            <motion.div 
                                className="flex items-center gap-3"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-lg"><img src={logo} alt="" /></span>
                                </div>
                                <AnimatePresence>
                                    {isSidebarOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.3, delay: 0.1 }}
                                            className="overflow-hidden"
                                        >
                                            <h2 className="text-white font-bold text-lg drop-shadow-lg">
                                                DesiStack
                                            </h2>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-grow space-y-4">
  {SIDEBAR_ITEMS.map((item, index) => (
    <Link key={item.href} to={item.href} className="block">
      <motion.div 
        className="flex items-center gap-4 p-4 text-sm font-medium rounded-xl 
                   bg-white/5 backdrop-blur-sm border border-white/10 
                   hover:bg-white/15 hover:border-white/20 
                   transition-all duration-300 shadow-lg hover:shadow-xl group"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{ scale: 1.02, x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        <item.icon
          size={20}
          style={{ color: item.color, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}
          className="group-hover:scale-110 transition-transform duration-200"
        />
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.span
              className="whitespace-nowrap text-white font-medium drop-shadow-sm"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {item.name}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  ))}
</nav>

                        
                        {/* Logout Button */}
                        <div className="mt-6 pt-4 border-t border-white/10">
                            <motion.button
                                onClick={handleLogout}
                                className="w-full flex items-center p-3 text-sm font-medium rounded-xl bg-gradient-to-r from-red-600/20 to-red-700/20 backdrop-blur-sm border border-red-500/30 hover:from-red-600/40 hover:to-red-700/40 hover:border-red-400/50 transition-all duration-300 text-white shadow-lg hover:shadow-xl group"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                            >
                                <LogOut 
                                    size={20} 
                                    className="text-red-400 min-w-[20px] drop-shadow-sm group-hover:scale-110 transition-transform duration-200" 
                                />
                                <AnimatePresence>
                                    {isSidebarOpen && (
                                        <motion.span
                                            className='ml-4 whitespace-nowrap text-red-100 font-medium drop-shadow-sm'
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.2, delay: 0.1 }}
                                        >
                                            Logout
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {/* Logout button glow effect */}
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/0 to-red-600/0 group-hover:from-red-600/10 group-hover:to-red-700/10 transition-all duration-300 pointer-events-none" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-60"></div>
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
            </motion.div>
        );
    };

    export default Sidebar;
