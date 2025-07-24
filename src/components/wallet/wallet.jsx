import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, ArrowDownCircle, ArrowUpCircle, RefreshCcw, CheckCircle, XCircle, DollarSign, CreditCard, Wallet, TrendingUp } from "lucide-react";

const MOCK_USERS = [
  { id: 1, name: "John Doe", balance: 150.25, status: "Active" },
  { id: 2, name: "Jane Smith", balance: 82.5, status: "Active" },
  { id: 3, name: "Mike Johnson", balance: 0.0, status: "Blocked" },
];

const MOCK_TRANSACTIONS = [
  { id: 101, user: "John Doe", type: "Add Money", amount: 100, reference: "TXN123", status: "Success", date: "2025-07-13" },
  { id: 102, user: "Jane Smith", type: "Withdrawal", amount: 50, reference: "TXN124", status: "Pending", date: "2025-07-14" },
  { id: 103, user: "Mike Johnson", type: "Winnings", amount: 75, reference: "TXN125", status: "Success", date: "2025-07-12" },
];

const MOCK_WITHDRAWALS = [
  { id: 1, user: "Jane Smith", amount: 50.0, requestDate: "2025-07-14", method: "Bank Transfer" },
  { id: 2, user: "John Doe", amount: 25.0, requestDate: "2025-07-13", method: "PayPal" },
];

const WalletManager = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [withdrawals, setWithdrawals] = useState(MOCK_WITHDRAWALS);
  const [search, setSearch] = useState("");
  const [actionUser, setActionUser] = useState(null);
  const [showAction, setShowAction] = useState(false);
  const [actionType, setActionType] = useState("credit");
  const [amount, setAmount] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search)
  );

  const openAction = (user, type) => {
    setActionUser(user);
    setActionType(type);
    setShowAction(true);
    setAmount("");
  };

  const handleTransaction = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    const updatedUsers = users.map((user) => {
      if (user.id === actionUser.id) {
        let newBalance =
          actionType === "credit"
            ? user.balance + Number(amount)
            : Math.max(user.balance - Number(amount), 0);
        return { ...user, balance: newBalance };
      }
      return user;
    });

    const newTransaction = {
      id: transactions.length + 100,
      user: actionUser.name,
      type: actionType === "credit" ? "Manual Credit" : "Manual Debit",
      amount: Number(amount),
      reference: `MNL-${Date.now()}`,
      status: "Success",
      date: new Date().toISOString().split("T")[0],
    };

    setUsers(updatedUsers);
    setTransactions([newTransaction, ...transactions]);
    setShowAction(false);
  };

  const handleWithdrawal = (id, action) => {
    setWithdrawals(withdrawals.filter(w => w.id !== id));
    // In real app, you'd also update the transaction history
  };

  // Calculate total statistics
  const totalBalance = users.reduce((sum, user) => sum + user.balance, 0);
  const activeUsers = users.filter(user => user.status === "Active").length;
  const pendingWithdrawals = withdrawals.reduce((sum, w) => sum + w.amount, 0);

  return (
    <div className="space-y-6">
      {/* Wallet Statistics */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.div
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-white/10 transition-all duration-300 group"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm font-medium drop-shadow-sm">Total Balance</p>
              <p className="text-2xl font-bold text-white drop-shadow-lg">${totalBalance.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl backdrop-blur-sm border border-green-500/30">
              <Wallet size={24} className="text-green-400 drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-white/10 transition-all duration-300 group"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm font-medium drop-shadow-sm">Active Users</p>
              <p className="text-2xl font-bold text-white drop-shadow-lg">{activeUsers}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl backdrop-blur-sm border border-blue-500/30">
              <CreditCard size={24} className="text-blue-400 drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-white/10 transition-all duration-300 group"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm font-medium drop-shadow-sm">Pending Withdrawals</p>
              <p className="text-2xl font-bold text-white drop-shadow-lg">${pendingWithdrawals.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl backdrop-blur-sm border border-yellow-500/30">
              <ArrowUpCircle size={24} className="text-yellow-400 drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-white/10 transition-all duration-300 group"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm font-medium drop-shadow-sm">Total Transactions</p>
              <p className="text-2xl font-bold text-white drop-shadow-lg">{transactions.length}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl backdrop-blur-sm border border-purple-500/30">
              <TrendingUp size={24} className="text-purple-400 drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* User Wallets Section */}
      <motion.div
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl backdrop-blur-sm border border-green-500/30">
                <Wallet size={24} className="text-green-400 drop-shadow-sm" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">User Wallets</h2>
                <p className="text-gray-400 text-sm">Manage user balances and transactions</p>
              </div>
            </div>
            
            <div className="relative w-full lg:w-80">
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/30 focus:outline-none transition-all duration-300 backdrop-blur-sm"
              />
              <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead className="bg-gradient-to-r from-green-800/50 to-emerald-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-200 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-200 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-200 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-200 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    className="hover:bg-white/5 transition-colors duration-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white font-medium">{user.name}</div>
                          <div className="text-gray-400 text-sm">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-green-400" />
                        <span className="text-white font-bold text-lg">${user.balance.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${
                        user.status === "Active"
                          ? "bg-green-900/50 text-green-400 border-green-500/30"
                          : "bg-red-900/50 text-red-400 border-red-500/30"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => openAction(user, "credit")}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm border border-green-500/30 hover:from-green-600/40 hover:to-emerald-600/40 text-green-400 rounded-xl transition-all duration-300 text-sm font-semibold"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ArrowDownCircle size={16} /> Credit
                        </motion.button>
                        <motion.button
                          onClick={() => openAction(user, "debit")}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600/20 to-rose-600/20 backdrop-blur-sm border border-red-500/30 hover:from-red-600/40 hover:to-rose-600/40 text-red-400 rounded-xl transition-all duration-300 text-sm font-semibold"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ArrowUpCircle size={16} /> Debit
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="block lg:hidden p-6 space-y-4">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              className="bg-black/10 rounded-xl p-4 border border-white/10 hover:bg-white/5 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{user.name}</h3>
                    <p className="text-gray-400 text-sm">ID: {user.id}</p>
                  </div>
                </div>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${
                  user.status === "Active"
                    ? "bg-green-900/50 text-green-400 border-green-500/30"
                    : "bg-red-900/50 text-red-400 border-red-500/30"
                }`}>
                  {user.status}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <DollarSign size={16} className="text-green-400" />
                <span className="text-white font-bold text-xl">${user.balance.toFixed(2)}</span>
              </div>

              <div className="flex gap-2 pt-3 border-t border-white/10">
                <motion.button
                  onClick={() => openAction(user, "credit")}
                  className="flex-1 inline-flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm border border-green-500/30 hover:from-green-600/40 hover:to-emerald-600/40 text-green-400 rounded-xl transition-all duration-300 text-sm font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowDownCircle size={16} /> Credit
                </motion.button>
                <motion.button
                  onClick={() => openAction(user, "debit")}
                  className="flex-1 inline-flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-red-600/20 to-rose-600/20 backdrop-blur-sm border border-red-500/30 hover:from-red-600/40 hover:to-rose-600/40 text-red-400 rounded-xl transition-all duration-300 text-sm font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowUpCircle size={16} /> Debit
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Transaction History Section */}
      <motion.div
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl backdrop-blur-sm border border-blue-500/30">
              <TrendingUp size={24} className="text-blue-400 drop-shadow-sm" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">Transaction History</h2>
              <p className="text-gray-400 text-sm">Recent wallet transactions and activities</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead className="bg-gradient-to-r from-blue-800/50 to-cyan-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200 uppercase tracking-wider">Reference</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((txn, index) => (
                <motion.tr
                  key={txn.id}
                  className="hover:bg-white/5 transition-colors duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="px-6 py-4 text-gray-300">{txn.date}</td>
                  <td className="px-6 py-4 text-white font-medium">{txn.user}</td>
                  <td className="px-6 py-4">
                    <span className="text-blue-400 font-medium">{txn.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <DollarSign size={14} className="text-green-400" />
                      <span className="text-white font-semibold">${txn.amount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 font-mono text-sm">{txn.reference}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${
                      txn.status === "Success"
                        ? "bg-green-900/50 text-green-400 border-green-500/30"
                        : txn.status === "Pending"
                        ? "bg-yellow-900/50 text-yellow-400 border-yellow-500/30"
                        : "bg-red-900/50 text-red-400 border-red-500/30"
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Withdrawal Requests Section */}
      <motion.div
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl backdrop-blur-sm border border-yellow-500/30">
              <ArrowUpCircle size={24} className="text-yellow-400 drop-shadow-sm" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">Withdrawal Requests</h2>
              <p className="text-gray-400 text-sm">Pending withdrawal requests for approval</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead className="bg-gradient-to-r from-yellow-800/50 to-orange-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-200 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-200 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-200 uppercase tracking-wider">Method</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-200 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-yellow-200 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {withdrawals.map((request, index) => (
                <motion.tr
                  key={request.id}
                  className="hover:bg-white/5 transition-colors duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                        {request.user.charAt(0)}
                      </div>
                      <span className="text-white font-medium">{request.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-green-400" />
                      <span className="text-white font-bold">${request.amount.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{request.method}</td>
                  <td className="px-6 py-4 text-gray-300">{request.requestDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleWithdrawal(request.id, 'approve')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm border border-green-500/30 hover:from-green-600/40 hover:to-emerald-600/40 text-green-400 rounded-xl transition-all duration-300 text-sm font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <CheckCircle size={16} /> Approve
                      </motion.button>
                      <motion.button
                        onClick={() => handleWithdrawal(request.id, 'reject')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600/20 to-rose-600/20 backdrop-blur-sm border border-red-500/30 hover:from-red-600/40 hover:to-rose-600/40 text-red-400 rounded-xl transition-all duration-300 text-sm font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <XCircle size={16} /> Reject
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Enhanced Credit / Debit Modal */}
      {showAction && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            className="w-full max-w-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl backdrop-blur-sm border ${
                  actionType === "credit"
                    ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30"
                    : "bg-gradient-to-r from-red-500/20 to-rose-500/20 border-red-500/30"
                }`}>
                  {actionType === "credit" ? (
                    <ArrowDownCircle size={20} className="text-green-400" />
                  ) : (
                    <ArrowUpCircle size={20} className="text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white drop-shadow-lg">
                    {actionType === "credit" ? "Credit Wallet" : "Debit Wallet"}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {actionType === "credit" ? "Add money to" : "Deduct money from"} {actionUser?.name}'s wallet
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {actionType === "credit" ? "Credit Amount" : "Debit Amount"}
                  </label>
                  <div className="relative">
                    <DollarSign size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-black/20 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Current Balance:</span>
                    <span className="text-white font-semibold">${actionUser?.balance.toFixed(2)}</span>
                  </div>
                  {amount && !isNaN(amount) && Number(amount) > 0 && (
                    <div className="flex justify-between items-center text-sm mt-2 pt-2 border-t border-white/10">
                      <span className="text-gray-400">New Balance:</span>
                      <span className="text-white font-bold">
                        ${actionType === "credit" 
                          ? (actionUser?.balance + Number(amount)).toFixed(2)
                          : Math.max(actionUser?.balance - Number(amount), 0).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 justify-end mt-8">
                <motion.button
                  type="button"
                  className="px-6 py-3 rounded-xl bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 font-medium backdrop-blur-sm"
                  onClick={() => setShowAction(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className={`px-6 py-3 rounded-xl border text-white transition-all duration-300 font-semibold backdrop-blur-sm shadow-lg ${
                    actionType === "credit"
                      ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30 hover:from-green-600/40 hover:to-emerald-600/40 hover:border-green-400/50"
                      : "bg-gradient-to-r from-red-600/20 to-rose-600/20 border-red-500/30 hover:from-red-600/40 hover:to-rose-600/40 hover:border-red-400/50"
                  }`}
                  onClick={handleTransaction}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Confirm {actionType === "credit" ? "Credit" : "Debit"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WalletManager;
