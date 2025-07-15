import Header from "../components/common/Header";
import { motion } from "framer-motion";
import { 
	FileText, 
	Download, 
	Calendar, 
	Activity, 
	AlertCircle, 
	Database,
	Search,
	Filter,
	Eye,
	MoreHorizontal
} from "lucide-react";
import { useState } from "react";

import OverviewCards from "../components/analytics/OverviewCards";
import RevenueChart from "../components/analytics/RevenueChart";
import ChannelPerformance from "../components/analytics/ChannelPerformance";
import ProductPerformance from "../components/analytics/ProductPerformance";
import UserRetention from "../components/analytics/UserRetention";
import CustomerSegmentation from "../components/analytics/CustomerSegmentation";
import AIPoweredInsights from "../components/analytics/AIPoweredInsights";

const Reports = () => {
	const [activeTab, setActiveTab] = useState("analytics");
	const [dateRange, setDateRange] = useState("last7days");

	const tabs = [
		{ id: "analytics", label: "Analytics", icon: FileText },
		{ id: "reports", label: "Reports", icon: FileText },
		{ id: "logs", label: "System Logs", icon: Activity },
		{ id: "audit", label: "Audit Trail", icon: Database },
		{ id: "errors", label: "Error Logs", icon: AlertCircle }
	];

	const reportsData = [
		{ id: 1, name: "Monthly EMI Report", type: "EMI", date: "2025-07-10", status: "Completed" },
		{ id: 2, name: "Collection Summary", type: "Collection", date: "2025-07-09", status: "Processing" },
		{ id: 3, name: "Overdue Analysis", type: "Analysis", date: "2025-07-08", status: "Completed" },
		{ id: 4, name: "Customer Report", type: "Customer", date: "2025-07-07", status: "Completed" },
	];

	const logsData = [
		{ id: 1, timestamp: "2025-07-10 12:30:45", user: "admin", action: "User Login", status: "Success" },
		{ id: 2, timestamp: "2025-07-10 12:25:12", user: "john.doe", action: "Report Generated", status: "Success" },
		{ id: 3, timestamp: "2025-07-10 12:20:33", user: "jane.smith", action: "Data Export", status: "Success" },
		{ id: 4, timestamp: "2025-07-10 12:15:21", user: "system", action: "Backup Created", status: "Success" },
	];

	const auditData = [
		{ id: 1, timestamp: "2025-07-10 12:30:45", user: "admin", action: "User Created", details: "New user account created" },
		{ id: 2, timestamp: "2025-07-10 12:25:12", user: "john.doe", action: "Report Modified", details: "EMI report updated" },
		{ id: 3, timestamp: "2025-07-10 12:20:33", user: "jane.smith", action: "Settings Changed", details: "System preferences updated" },
		{ id: 4, timestamp: "2025-07-10 12:15:21", user: "admin", action: "User Deleted", details: "Inactive user removed" },
	];

	const errorData = [
		{ id: 1, timestamp: "2025-07-10 12:30:45", level: "Error", message: "Database connection timeout", source: "API" },
		{ id: 2, timestamp: "2025-07-10 12:25:12", level: "Warning", message: "High memory usage detected", source: "System" },
		{ id: 3, timestamp: "2025-07-10 12:20:33", level: "Error", message: "Failed to send email notification", source: "Email Service" },
		{ id: 4, timestamp: "2025-07-10 12:15:21", level: "Info", message: "Scheduled maintenance completed", source: "System" },
	];

	const handleExportAll = () => {
		alert("Exporting all reports and logs...");
	};

	const renderContent = () => {
		switch (activeTab) {
			case "analytics":
				return (
					<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
						<OverviewCards />
						<RevenueChart />

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
							<ChannelPerformance />
							<ProductPerformance />
							<UserRetention />
							<CustomerSegmentation />
						</div>

						<AIPoweredInsights />
					</main>
				);

			case "reports":
				return (
					<div className="max-w-6xl mx-auto py-6 px-4">
						{/* Quick Actions */}
						<div className="flex flex-wrap gap-3 mb-6">
							<button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
								<FileText size={16} />
								Generate Report
							</button>
							<button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors">
								<Search size={16} />
								Search Reports
							</button>
							<button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors">
								<Filter size={16} />
								Filter
							</button>
						</div>

						{/* Reports Table */}
						<div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 overflow-hidden">
							<table className="min-w-full divide-y divide-gray-700">
								<thead className="bg-gray-700">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
											Report Name
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
											Type
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
											Date Created
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
											Status
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-700">
									{reportsData.map((report) => (
										<tr key={report.id} className="hover:bg-gray-700/50">
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
												{report.name}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
												{report.type}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
												{report.date}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
													report.status === 'Completed' 
														? 'bg-green-900 text-green-300' 
														: 'bg-yellow-900 text-yellow-300'
												}`}>
													{report.status}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
												<button className="text-blue-400 hover:text-blue-300 mr-3">
													<Eye size={16} />
												</button>
												<button className="text-gray-400 hover:text-gray-300">
													<MoreHorizontal size={16} />
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				);

			case "logs":
				return (
					<div className="max-w-6xl mx-auto py-6 px-4">
						<div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 overflow-hidden">
							<table className="min-w-full divide-y divide-gray-700">
								<thead className="bg-gray-700">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
											Timestamp
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
											User
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
											Action
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
											Status
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-700">
									{logsData.map((log) => (
										<tr key={log.id} className="hover:bg-gray-700/50">
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
												{log.timestamp}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
												{log.user}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
												{log.action}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-900 text-green-300">
													{log.status}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				);

			case "audit":
				return (
					<div className="max-w-6xl mx-auto py-6 px-4">
						<div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 overflow-hidden">
							<table className="min-w-full divide-y divide-gray-700">
								<thead className="bg-gray-700">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
											Timestamp
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
											User
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
											Action
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
											Details
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-700">
									{auditData.map((audit) => (
										<tr key={audit.id} className="hover:bg-gray-700/50">
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
												{audit.timestamp}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
												{audit.user}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
												{audit.action}
											</td>
											<td className="px-6 py-4 text-sm text-gray-300">
												{audit.details}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				);

			case "errors":
				return (
					<div className="max-w-6xl mx-auto py-6 px-4">
						<div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 overflow-hidden">
							<table className="min-w-full divide-y divide-gray-700">
								<thead className="bg-gray-700">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
											Timestamp
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
											Level
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
											Message
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
											Source
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-700">
									{errorData.map((error) => (
										<tr key={error.id} className="hover:bg-gray-700/50">
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
												{error.timestamp}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
													error.level === 'Error' 
														? 'bg-red-900 text-red-300' 
														: error.level === 'Warning'
														? 'bg-yellow-900 text-yellow-300'
														: 'bg-blue-900 text-blue-300'
												}`}>
													{error.level}
												</span>
											</td>
											<td className="px-6 py-4 text-sm text-gray-300">
												{error.message}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
												{error.source}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title="Reports & Logs" />

			{/* Header Controls */}
			<div className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
				<div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-6">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
						<div>
							<h1 className="text-2xl font-semibold text-gray-100 mb-1">Reports & Logs Dashboard</h1>
							<p className="text-gray-400">Comprehensive analytics and system monitoring</p>
						</div>
						
						<div className="flex gap-3">
							<select
								value={dateRange}
								onChange={(e) => setDateRange(e.target.value)}
								className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
							>
								<option value="today">Today</option>
								<option value="last7days">Last 7 Days</option>
								<option value="last30days">Last 30 Days</option>
								<option value="last90days">Last 90 Days</option>
							</select>

							<button
								onClick={handleExportAll}
								className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
							>
								<Download size={16} />
								Export
							</button>
						</div>
					</div>
				</div>

				{/* Tab Navigation */}
				<div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-2 border border-gray-700 mb-6">
					<div className="flex flex-wrap gap-2">
						{tabs.map((tab) => {
							const Icon = tab.icon;
							return (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
										activeTab === tab.id
											? "bg-blue-600 text-white"
											: "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
									}`}
								>
									<Icon size={16} />
									{tab.label}
								</button>
							);
						})}
					</div>
				</div>
			</div>

			{/* Tab Content */}
			<motion.div
				key={activeTab}
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.3 }}
			>
				{renderContent()}
			</motion.div>
		</div>
	);
};

export default Reports;
