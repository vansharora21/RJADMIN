import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import { Bell, AlertTriangle, Info, Check, X, Clock } from "lucide-react";
import { useState } from "react";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const SALES_CHANNEL_DATA = [
	{ name: "Website", value: 45600 },
	{ name: "Mobile App", value: 38200 },
	{ name: "Marketplace", value: 29800 },
	{ name: "Social Media", value: 18700 },
];

// Dummy notification and alert data
const NOTIFICATIONS_DATA = [
	{
		id: 1,
		type: "success",
		title: "EMI Collection Complete",
		message: "Website channel collected ₹45,600 - target achieved",
		timestamp: "2 min ago",
		isRead: false
	},
	{
		id: 2,
		type: "warning",
		title: "Low Collection Alert",
		message: "Social Media channel below target by 15%",
		timestamp: "5 min ago",
		isRead: false
	},
	{
		id: 3,
		type: "info",
		title: "Monthly Report Ready",
		message: "EMI collection summary for December is available",
		timestamp: "1 hour ago",
		isRead: true
	}
];

const ALERTS_DATA = [
	{
		id: 1,
		type: "error",
		severity: "high",
		title: "Payment Gateway Issue",
		message: "Mobile App payments experiencing delays",
		source: "Payment System",
		timestamp: "10 min ago",
		isActive: true
	},
	{
		id: 2,
		type: "warning",
		severity: "medium",
		title: "Collection Target",
		message: "Marketplace channel 8% below monthly target",
		source: "Analytics",
		timestamp: "30 min ago",
		isActive: true
	}
];

const SalesChannelChart = () => {
	const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
	const [alerts, setAlerts] = useState(ALERTS_DATA);

	const getTypeIcon = (type) => {
		switch (type) {
			case 'success':
				return <Check className="w-4 h-4 text-green-400" />;
			case 'warning':
				return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
			case 'error':
				return <AlertTriangle className="w-4 h-4 text-red-400" />;
			default:
				return <Info className="w-4 h-4 text-blue-400" />;
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
	};

	const dismissAlert = (id) => {
		setAlerts(prev =>
			prev.map(alert =>
				alert.id === id ? { ...alert, isActive: false } : alert
			)
		);
	};

	const unreadCount = notifications.filter(n => !n.isRead).length;
	const activeAlertsCount = alerts.filter(a => a.isActive).length;

	return (
		<div className="space-y-6">
			{/* Original Chart */}
			<motion.div
				className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
			>
				<h2 className='text-lg font-medium mb-4 text-gray-100'>EMI Collected Summary</h2>

				<div className='h-80'>
					<ResponsiveContainer>
						<BarChart data={SALES_CHANNEL_DATA}>
							<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
							<XAxis dataKey='name' stroke='#9CA3AF' />
							<YAxis stroke='#9CA3AF' />
							<Tooltip
								contentStyle={{
									backgroundColor: "rgba(31, 41, 55, 0.8)",
									borderColor: "#4B5563",
								}}
								itemStyle={{ color: "#E5E7EB" }}
							/>
							<Legend />
							<Bar dataKey={"value"} fill='#8884d8'>
								{SALES_CHANNEL_DATA.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</motion.div>

			{/* Notifications and Alerts Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				
				{/* Notifications Panel */}
				<motion.div
					className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700"
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.6 }}
				>
					<div className="p-4 border-b border-gray-700">
						<h3 className="text-lg font-medium text-gray-100 flex items-center gap-2">
							<Bell className="w-5 h-5" />
							Notifications
							{unreadCount > 0 && (
								<span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
									{unreadCount}
								</span>
							)}
						</h3>
					</div>
					
					<div className="max-h-64 overflow-y-auto">
						{notifications.map((notification) => (
							<div
								key={notification.id}
								className={`p-4 border-b border-gray-700 hover:bg-gray-700/50 transition cursor-pointer ${
									!notification.isRead ? 'bg-blue-900/20' : ''
								}`}
								onClick={() => markAsRead(notification.id)}
							>
								<div className="flex items-start gap-3">
									<div className="flex-shrink-0 mt-1">
										{getTypeIcon(notification.type)}
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex justify-between items-start">
											<h4 className={`text-sm font-medium ${
												notification.isRead ? 'text-gray-300' : 'text-white'
											}`}>
												{notification.title}
											</h4>
											<span className="text-xs text-gray-500 whitespace-nowrap ml-2">
												{notification.timestamp}
											</span>
										</div>
										<p className="text-sm text-gray-400 mt-1">
											{notification.message}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</motion.div>

				{/* Alerts Panel */}
				<motion.div
					className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700"
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.8 }}
				>
					<div className="p-4 border-b border-gray-700">
						<h3 className="text-lg font-medium text-gray-100 flex items-center gap-2">
							<AlertTriangle className="w-5 h-5" />
							System Alerts
							{activeAlertsCount > 0 && (
								<span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
									{activeAlertsCount}
								</span>
							)}
						</h3>
					</div>
					
					<div className="max-h-64 overflow-y-auto">
						{alerts.filter(alert => alert.isActive).map((alert) => (
							<div
								key={alert.id}
								className="p-4 border-b border-gray-700 hover:bg-gray-700/50 transition"
							>
								<div className="flex items-start gap-3">
									<div className="flex-shrink-0 mt-1">
										{getTypeIcon(alert.type)}
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex justify-between items-start">
											<div className="flex items-center gap-2">
												<h4 className="text-sm font-medium text-white">
													{alert.title}
												</h4>
												<span className={`px-2 py-1 rounded-full text-xs text-white ${
													getSeverityColor(alert.severity)
												}`}>
													{alert.severity}
												</span>
											</div>
											<button
												onClick={() => dismissAlert(alert.id)}
												className="text-gray-400 hover:text-white transition"
											>
												<X className="w-4 h-4" />
											</button>
										</div>
										<p className="text-sm text-gray-400 mt-1">
											{alert.message}
										</p>
										<div className="flex justify-between items-center mt-2">
											<span className="text-xs text-gray-500">
												{alert.source} • {alert.timestamp}
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default SalesChannelChart;
