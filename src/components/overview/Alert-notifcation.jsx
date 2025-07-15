import { useEffect, useState } from "react";
import { Bell, X, Check, AlertTriangle, Info, Trash2, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/common/Header";
import { toast } from "react-toastify";

const AlertNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [showNotifications, setShowNotifications] = useState(true);
  const [showAlerts, setShowAlerts] = useState(true);
  const [filter, setFilter] = useState('all'); // all, read, unread
  const [alertFilter, setAlertFilter] = useState('all'); // all, info, warning, error, success

  // Dummy notification data
  const dummyNotifications = [
    {
      id: 1,
      title: "New Course Enrollment",
      message: "John Doe has enrolled in React Development course",
      type: "info",
      isRead: false,
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      avatar: "https://ui-avatars.com/api/?name=John+Doe&background=4f46e5&color=fff"
    },
    {
      id: 2,
      title: "Payment Received",
      message: "Payment of $299 received for Web Development course",
      type: "success",
      isRead: false,
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      avatar: null
    },
    {
      id: 3,
      title: "Course Completion",
      message: "Sarah Smith completed JavaScript Fundamentals course",
      type: "success",
      isRead: true,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      avatar: "https://ui-avatars.com/api/?name=Sarah+Smith&background=10b981&color=fff"
    },
    {
      id: 4,
      title: "New Message",
      message: "You have a new message from instructor Mike Johnson",
      type: "info",
      isRead: true,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      avatar: "https://ui-avatars.com/api/?name=Mike+Johnson&background=f59e0b&color=fff"
    },
    {
      id: 5,
      title: "System Update",
      message: "Platform maintenance scheduled for tonight at 2 AM",
      type: "warning",
      isRead: false,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      avatar: null
    }
  ];

  // Dummy alert data
  const dummyAlerts = [
    {
      id: 1,
      title: "Server Performance Warning",
      message: "Server response time is above normal threshold (2.5s average)",
      type: "warning",
      severity: "medium",
      isActive: true,
      timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      source: "System Monitor"
    },
    {
      id: 2,
      title: "Low Storage Space",
      message: "Storage usage is at 85%. Consider upgrading your plan.",
      type: "error",
      severity: "high",
      isActive: true,
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      source: "Storage Monitor"
    },
    {
      id: 3,
      title: "Backup Completed",
      message: "Daily backup completed successfully. All data secured.",
      type: "success",
      severity: "low",
      isActive: true,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      source: "Backup Service"
    },
    {
      id: 4,
      title: "New Feature Available",
      message: "Video conferencing feature is now available for all courses",
      type: "info",
      severity: "low",
      isActive: true,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      source: "Product Team"
    },
    {
      id: 5,
      title: "Security Alert",
      message: "Unusual login activity detected from IP 192.168.1.100",
      type: "error",
      severity: "high",
      isActive: false,
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      source: "Security Monitor"
    }
  ];

  useEffect(() => {
    setNotifications(dummyNotifications);
    setAlerts(dummyAlerts);
  }, []);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-green-500 bg-green-900/20';
      case 'warning':
        return 'border-yellow-500 bg-yellow-900/20';
      case 'error':
        return 'border-red-500 bg-red-900/20';
      default:
        return 'border-blue-500 bg-blue-900/20';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-600';
      case 'medium':
        return 'bg-yellow-600';
      default:
        return 'bg-green-600';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
    toast.success("Notification marked as read");
  };

  const markAsUnread = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: false } : notif
      )
    );
    toast.success("Notification marked as unread");
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast.success("Notification deleted");
  };

  const dismissAlert = (id) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, isActive: false } : alert
      )
    );
    toast.success("Alert dismissed");
  };

  const deleteAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    toast.success("Alert deleted");
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'read') return notif.isRead;
    if (filter === 'unread') return !notif.isRead;
    return true;
  });

  const filteredAlerts = alerts.filter(alert => {
    if (alertFilter === 'all') return true;
    return alert.type === alertFilter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const activeAlertsCount = alerts.filter(a => a.isActive).length;

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Alerts & Notifications" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center">
              <Bell className="w-8 h-8 text-blue-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Notifications</p>
                <p className="text-2xl font-bold text-white">{notifications.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{unreadCount}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Unread</p>
                <p className="text-2xl font-bold text-white">{unreadCount}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Active Alerts</p>
                <p className="text-2xl font-bold text-white">{activeAlertsCount}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center">
              <Check className="w-8 h-8 text-green-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Resolved</p>
                <p className="text-2xl font-bold text-white">{alerts.filter(a => !a.isActive).length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Notifications Section */}
          <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                  {unreadCount > 0 && (
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </h2>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="text-gray-400 hover:text-white transition"
                >
                  {showNotifications ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-md text-sm transition ${
                    filter === 'all' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-3 py-1 rounded-md text-sm transition ${
                    filter === 'unread' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Unread
                </button>
                <button
                  onClick={() => setFilter('read')}
                  className={`px-3 py-1 rounded-md text-sm transition ${
                    filter === 'read' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Read
                </button>
              </div>
            </div>

            {showNotifications && (
              <div className="max-h-96 overflow-y-auto">
                <AnimatePresence>
                  {filteredNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className={`p-4 border-b border-gray-700 hover:bg-gray-700/50 transition ${
                        !notification.isRead ? 'bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {notification.avatar ? (
                          <img
                            src={notification.avatar}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                            {getTypeIcon(notification.type)}
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className={`text-sm font-medium ${
                              notification.isRead ? 'text-gray-300' : 'text-white'
                            }`}>
                              {notification.title}
                            </h3>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          
                          <div className="flex gap-2 mt-2">
                            {notification.isRead ? (
                              <button
                                onClick={() => markAsUnread(notification.id)}
                                className="text-xs text-blue-400 hover:text-blue-300 transition"
                              >
                                Mark Unread
                              </button>
                            ) : (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-green-400 hover:text-green-300 transition"
                              >
                                Mark Read
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-xs text-red-400 hover:text-red-300 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* Alerts Section */}
          <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  System Alerts
                  {activeAlertsCount > 0 && (
                    <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
                      {activeAlertsCount}
                    </span>
                  )}
                </h2>
                <button
                  onClick={() => setShowAlerts(!showAlerts)}
                  className="text-gray-400 hover:text-white transition"
                >
                  {showAlerts ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setAlertFilter('all')}
                  className={`px-3 py-1 rounded-md text-sm transition ${
                    alertFilter === 'all' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setAlertFilter('error')}
                  className={`px-3 py-1 rounded-md text-sm transition ${
                    alertFilter === 'error' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Error
                </button>
                <button
                  onClick={() => setAlertFilter('warning')}
                  className={`px-3 py-1 rounded-md text-sm transition ${
                    alertFilter === 'warning' 
                      ? 'bg-yellow-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Warning
                </button>
                <button
                  onClick={() => setAlertFilter('success')}
                  className={`px-3 py-1 rounded-md text-sm transition ${
                    alertFilter === 'success' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Success
                </button>
              </div>
            </div>

            {showAlerts && (
              <div className="max-h-96 overflow-y-auto">
                <AnimatePresence>
                  {filteredAlerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className={`p-4 border-b border-gray-700 hover:bg-gray-700/50 transition ${
                        getTypeColor(alert.type)
                      } ${!alert.isActive ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          {getTypeIcon(alert.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-medium text-white">
                                {alert.title}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs text-white ${
                                getSeverityColor(alert.severity)
                              }`}>
                                {alert.severity}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                              {formatTimeAgo(alert.timestamp)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-300 mt-1">
                            {alert.message}
                          </p>
                          
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-500">
                              Source: {alert.source}
                            </span>
                            
                            <div className="flex gap-2">
                              {alert.isActive && (
                                <button
                                  onClick={() => dismissAlert(alert.id)}
                                  className="text-xs text-yellow-400 hover:text-yellow-300 transition"
                                >
                                  Dismiss
                                </button>
                              )}
                              <button
                                onClick={() => deleteAlert(alert.id)}
                                className="text-xs text-red-400 hover:text-red-300 transition"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AlertNotifications;
