import { useState } from "react";
import { motion } from "framer-motion";
import { 
    Search, 
    Eye, 
    Download, 
    FileText, 
    Calendar, 
    AlertTriangle, 
    DollarSign,
    Phone,
    MessageSquare,
    Filter,
    RefreshCw,
    TrendingUp,
    Users,
    Clock,
    CheckCircle2,
    XCircle
} from "lucide-react";

const overdueEmiData = [
    { 
        id: "EMI001", 
        customer: "Rajesh Kumar", 
        groupName: "Self Help Group A",
        loanAmount: 60000, 
        emiAmount: 3000, 
        dueDate: "2025-06-17", 
        overdueDays: 23, 
        status: "Overdue", 
        phone: "+91-9000000001",
        totalOutstanding: 59500,
        installment: "5/20",
        lastPaymentDate: "2025-05-17",
        penaltyAmount: 150
    },
    { 
        id: "EMI002", 
        customer: "Priya Sharma", 
        groupName: "Women Collective B",
        loanAmount: 70000, 
        emiAmount: 3500, 
        dueDate: "2025-06-14", 
        overdueDays: 26, 
        status: "Critical", 
        phone: "+91-9000000002",
        totalOutstanding: 71500,
        installment: "8/24",
        lastPaymentDate: "2025-05-14",
        penaltyAmount: 260
    },
    { 
        id: "EMI003", 
        customer: "Amit Patel", 
        groupName: "Farmers Group C",
        loanAmount: 80000, 
        emiAmount: 4000, 
        dueDate: "2025-06-11", 
        overdueDays: 29, 
        status: "Critical", 
        phone: "+91-9000000003",
        totalOutstanding: 83500,
        installment: "12/36",
        lastPaymentDate: "2025-05-11",
        penaltyAmount: 290
    },
    { 
        id: "EMI004", 
        customer: "Sunita Devi", 
        groupName: "Micro Finance D",
        loanAmount: 90000, 
        emiAmount: 4500, 
        dueDate: "2025-06-08", 
        overdueDays: 32, 
        status: "Critical", 
        phone: "+91-9000000004",
        totalOutstanding: 95500,
        installment: "15/24",
        lastPaymentDate: "2025-05-08",
        penaltyAmount: 320
    },
    { 
        id: "EMI005", 
        customer: "Ravi Singh", 
        groupName: "Business Group E",
        loanAmount: 100000, 
        emiAmount: 5000, 
        dueDate: "2025-06-05", 
        overdueDays: 35, 
        status: "Legal Notice", 
        phone: "+91-9000000005",
        totalOutstanding: 107500,
        installment: "18/36",
        lastPaymentDate: "2025-05-05",
        penaltyAmount: 350
    },
];

const collectionData = [
    { 
        id: "COL001", 
        customer: "Meera Joshi", 
        groupName: "Self Help Group F",
        collectedAmount: 3700, 
        collectionDate: "2025-07-09", 
        method: "UPI", 
        status: "Collected", 
        collectorName: "Agent Ramesh",
        remarks: "Full EMI payment received",
        receiptNumber: "RCP001",
        emiMonth: "July 2025"
    },
    { 
        id: "COL002", 
        customer: "Vikash Yadav", 
        groupName: "Farmers Collective G",
        collectedAmount: 4400, 
        collectionDate: "2025-07-08", 
        method: "Cash", 
        status: "Collected", 
        collectorName: "Agent Suresh",
        remarks: "Partial payment - balance pending",
        receiptNumber: "RCP002",
        emiMonth: "July 2025"
    },
    { 
        id: "COL003", 
        customer: "Kavita Singh", 
        groupName: "Women Group H",
        collectedAmount: 5100, 
        collectionDate: "2025-07-07", 
        method: "Bank Transfer", 
        status: "Pending", 
        collectorName: "Agent Mohan",
        remarks: "Bank transfer under verification",
        receiptNumber: "RCP003",
        emiMonth: "July 2025"
    },
    { 
        id: "COL004", 
        customer: "Deepak Kumar", 
        groupName: "Artisan Group I",
        collectedAmount: 5800, 
        collectionDate: "2025-07-06", 
        method: "UPI", 
        status: "Collected", 
        collectorName: "Agent Prakash",
        remarks: "Online payment successful",
        receiptNumber: "RCP004",
        emiMonth: "July 2025"
    },
    { 
        id: "COL005", 
        customer: "Anita Devi", 
        groupName: "Micro Business J",
        collectedAmount: 6500, 
        collectionDate: "2025-07-05", 
        method: "Cheque", 
        status: "Failed", 
        collectorName: "Agent Rajesh",
        remarks: "Cheque bounced - insufficient funds",
        receiptNumber: "RCP005",
        emiMonth: "July 2025"
    },
];

const EmiCollectionReports = () => {
    const [emiSearchTerm, setEmiSearchTerm] = useState("");
    const [collectionSearchTerm, setCollectionSearchTerm] = useState("");
    const [filteredEmiData, setFilteredEmiData] = useState(overdueEmiData);
    const [filteredCollectionData, setFilteredCollectionData] = useState(collectionData);
    const [emiStatusFilter, setEmiStatusFilter] = useState("all");
    const [collectionStatusFilter, setCollectionStatusFilter] = useState("all");
    const [selectedDateRange, setSelectedDateRange] = useState("all");

    const handleEmiSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setEmiSearchTerm(term);
        filterEmiData(term, emiStatusFilter);
    };

    const handleCollectionSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setCollectionSearchTerm(term);
        filterCollectionData(term, collectionStatusFilter);
    };

    const filterEmiData = (searchTerm, statusFilter) => {
        let filtered = overdueEmiData.filter(
            (emi) => 
                emi.id.toLowerCase().includes(searchTerm) || 
                emi.customer.toLowerCase().includes(searchTerm) ||
                emi.groupName.toLowerCase().includes(searchTerm)
        );

        if (statusFilter !== "all") {
            filtered = filtered.filter(emi => emi.status.toLowerCase() === statusFilter.toLowerCase());
        }

        setFilteredEmiData(filtered);
    };

    const filterCollectionData = (searchTerm, statusFilter) => {
        let filtered = collectionData.filter(
            (collection) => 
                collection.id.toLowerCase().includes(searchTerm) || 
                collection.customer.toLowerCase().includes(searchTerm) ||
                collection.groupName.toLowerCase().includes(searchTerm)
        );

        if (statusFilter !== "all") {
            filtered = filtered.filter(collection => collection.status.toLowerCase() === statusFilter.toLowerCase());
        }

        setFilteredCollectionData(filtered);
    };

    const handleEmiStatusFilter = (status) => {
        setEmiStatusFilter(status);
        filterEmiData(emiSearchTerm, status);
    };

    const handleCollectionStatusFilter = (status) => {
        setCollectionStatusFilter(status);
        filterCollectionData(collectionSearchTerm, status);
    };

    const handleExportExcel = (type) => {
        // Enhanced export with current filters
        const timestamp = new Date().toISOString().split('T')[0];
        alert(`Exporting ${type} report to Excel (${timestamp})...`);
    };

    const handleExportPDF = (type) => {
        // Enhanced export with current filters
        const timestamp = new Date().toISOString().split('T')[0];
        alert(`Exporting ${type} report to PDF (${timestamp})...`);
    };

    const handleFollowUp = (customer, phone) => {
        alert(`Initiating follow-up call to ${customer} at ${phone}`);
    };

    const handleSendReminder = (customer, phone) => {
        alert(`Sending SMS reminder to ${customer} at ${phone}`);
    };

    // Calculate summary statistics
    const totalOverdueAmount = filteredEmiData.reduce((sum, emi) => sum + emi.emiAmount, 0);
    const totalCollectedAmount = filteredCollectionData
        .filter(col => col.status === "Collected")
        .reduce((sum, col) => sum + col.collectedAmount, 0);

    return (
        <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <motion.div
                    className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-xl text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-red-100">Total Overdue EMIs</p>
                            <p className="text-2xl font-bold">{filteredEmiData.length}</p>
                        </div>
                        <AlertTriangle size={32} />
                    </div>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-orange-100">Overdue Amount</p>
                            <p className="text-2xl font-bold">₹{totalOverdueAmount.toLocaleString()}</p>
                        </div>
                        <DollarSign size={32} />
                    </div>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100">Collected Today</p>
                            <p className="text-2xl font-bold">₹{totalCollectedAmount.toLocaleString()}</p>
                        </div>
                        <CheckCircle2 size={32} />
                    </div>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100">Collection Rate</p>
                            <p className="text-2xl font-bold">87.5%</p>
                        </div>
                        <TrendingUp size={32} />
                    </div>
                </motion.div>
            </div>

            {/* Overdue EMI Reports Table */}
            <motion.div
                className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                    <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
                        <AlertTriangle className="text-red-400" size={24} />
                        Overdue EMI Reports
                    </h2>
                    
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <Filter size={16} className="text-gray-400" />
                            <select
                                value={emiStatusFilter}
                                onChange={(e) => handleEmiStatusFilter(e.target.value)}
                                className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="overdue">Overdue</option>
                                <option value="critical">Critical</option>
                                <option value="legal notice">Legal Notice</option>
                            </select>
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search EMI records..."
                                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={emiSearchTerm}
                                onChange={handleEmiSearch}
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        </div>

                        {/* Export Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleExportExcel('Overdue EMI')}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors"
                            >
                                <Download size={16} />
                                Excel
                            </button>
                            <button
                                onClick={() => handleExportPDF('Overdue EMI')}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors"
                            >
                                <FileText size={16} />
                                PDF
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Customer Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Loan Info
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    EMI Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Overdue Info
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Outstanding
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-700">
                            {filteredEmiData.map((emi) => (
                                <motion.tr
                                    key={emi.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="hover:bg-gray-700 hover:bg-opacity-50"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-100">{emi.customer}</div>
                                            <div className="text-xs text-gray-400">{emi.groupName}</div>
                                            <div className="text-xs text-gray-400">{emi.phone}</div>
                                            <div className="text-xs text-blue-400">{emi.id}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-300">₹{emi.loanAmount.toLocaleString()}</div>
                                        <div className="text-xs text-gray-400">Installment: {emi.installment}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-100">₹{emi.emiAmount.toLocaleString()}</div>
                                        <div className="text-xs text-gray-400">Due: {emi.dueDate}</div>
                                        <div className="text-xs text-gray-400">Last Paid: {emi.lastPaymentDate}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            emi.overdueDays > 30 ? 'bg-red-900 text-red-300' :
                                            emi.overdueDays > 15 ? 'bg-orange-900 text-orange-300' :
                                            'bg-yellow-900 text-yellow-300'
                                        }`}>
                                            {emi.overdueDays} days
                                        </span>
                                        <div className="text-xs text-red-400 mt-1">Penalty: ₹{emi.penaltyAmount}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-100">₹{emi.totalOutstanding.toLocaleString()}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            emi.status === "Legal Notice" ? "bg-purple-900 text-purple-300" :
                                            emi.status === "Critical" ? "bg-red-900 text-red-300" : 
                                            "bg-orange-900 text-orange-300"
                                        }`}>
                                            {emi.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex space-x-2">
                                            <button 
                                                className="text-blue-400 hover:text-blue-300 p-1"
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleFollowUp(emi.customer, emi.phone)}
                                                className="text-green-400 hover:text-green-300 p-1"
                                                title="Follow Up Call"
                                            >
                                                <Phone size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleSendReminder(emi.customer, emi.phone)}
                                                className="text-yellow-400 hover:text-yellow-300 p-1"
                                                title="Send SMS Reminder"
                                            >
                                                <MessageSquare size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Collection Reports Table */}
            <motion.div
                className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                    <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
                        <DollarSign className="text-green-400" size={24} />
                        Collection Reports
                    </h2>
                    
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <Filter size={16} className="text-gray-400" />
                            <select
                                value={collectionStatusFilter}
                                onChange={(e) => handleCollectionStatusFilter(e.target.value)}
                                className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="collected">Collected</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search collections..."
                                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={collectionSearchTerm}
                                onChange={handleCollectionSearch}
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        </div>

                        {/* Export Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleExportExcel('Collection')}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors"
                            >
                                <Download size={16} />
                                Excel
                            </button>
                            <button
                                onClick={() => handleExportPDF('Collection')}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors"
                            >
                                <FileText size={16} />
                                PDF
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Customer Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Collection Info
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Payment Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Collector
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Remarks
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-700">
                            {filteredCollectionData.map((collection) => (
                                <motion.tr
                                    key={collection.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="hover:bg-gray-700 hover:bg-opacity-50"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-100">{collection.customer}</div>
                                            <div className="text-xs text-gray-400">{collection.groupName}</div>
                                            <div className="text-xs text-blue-400">{collection.id}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-100">₹{collection.collectedAmount.toLocaleString()}</div>
                                        <div className="text-xs text-gray-400">{collection.collectionDate}</div>
                                        <div className="text-xs text-gray-400">EMI: {collection.emiMonth}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            collection.method === 'UPI' ? 'bg-purple-900 text-purple-300' :
                                            collection.method === 'Cash' ? 'bg-green-900 text-green-300' :
                                            collection.method === 'Bank Transfer' ? 'bg-blue-900 text-blue-300' :
                                            'bg-orange-900 text-orange-300'
                                        }`}>
                                            {collection.method}
                                        </span>
                                        {collection.receiptNumber && (
                                            <div className="text-xs text-gray-400 mt-1">Receipt: {collection.receiptNumber}</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {collection.collectorName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            collection.status === "Collected" ? "bg-green-900 text-green-300" : 
                                            collection.status === "Pending" ? "bg-yellow-900 text-yellow-300" :
                                            "bg-red-900 text-red-300"
                                        }`}>
                                            {collection.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-300 max-w-xs">
                                        <div className="truncate" title={collection.remarks}>
                                            {collection.remarks}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex space-x-2">
                                            <button 
                                                className="text-blue-400 hover:text-blue-300 p-1"
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button 
                                                className="text-green-400 hover:text-green-300 p-1"
                                                title="Download Receipt"
                                            >
                                                <Download size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default EmiCollectionReports;
