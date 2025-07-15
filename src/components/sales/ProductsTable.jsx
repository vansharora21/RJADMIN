import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, ArrowDownCircle, ArrowUpCircle, RefreshCcw, CheckCircle, XCircle } from "lucide-react";

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

const WalletManager = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
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
            : Math.max(user.balance - Number(amount), 0); // prevent negative
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

  return (
    <div className="space-y-10">
      {/* Wallet Section */}
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-100">User Wallets</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={handleSearch}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">User</th>
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Balance</th>
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Status</th>
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t border-gray-700">
                  <td className="py-2 px-4 text-white">{user.name}</td>
                  <td className="py-2 px-4 text-green-300">${user.balance.toFixed(2)}</td>
                  <td className="py-2 px-4 text-yellow-300">{user.status}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => openAction(user, "credit")}
                      className="inline-flex items-center gap-1 text-white px-3 py-1 bg-green-600 rounded hover:bg-green-700 mr-2 text-sm"
                    >
                      <ArrowDownCircle size={16} /> Credit
                    </button>
                    <button
                      onClick={() => openAction(user, "debit")}
                      className="inline-flex items-center gap-1 text-white px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-sm"
                    >
                      <ArrowUpCircle size={16} /> Debit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Transaction History */}
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-gray-100 mb-4">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Date</th>
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">User</th>
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Type</th>
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Amount</th>
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Reference</th>
                <th className="text-left py-2 px-4 text-gray-400 text-xs uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id} className="border-t border-gray-700">
                  <td className="py-2 px-4 text-gray-300">{txn.date}</td>
                  <td className="py-2 px-4 text-white">{txn.user}</td>
                  <td className="py-2 px-4 text-blue-300">{txn.type}</td>
                  <td className="py-2 px-4 text-green-300">${txn.amount}</td>
                  <td className="py-2 px-4 text-gray-400">{txn.reference}</td>
                  <td className="py-2 px-4 text-yellow-300">{txn.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Withdrawal Requests & Refund Processing */}
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-gray-100 mb-4">Withdrawal Requests</h2>
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="text-left text-sm px-4 py-2 text-gray-400 uppercase">User</th>
              <th className="text-left text-sm px-4 py-2 text-gray-400 uppercase">Amount</th>
              <th className="text-left text-sm px-4 py-2 text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder example */}
            <tr className="border-t border-gray-600">
              <td className="px-4 py-2 text-white">Jane Smith</td>
              <td className="px-4 py-2 text-green-300">$50.00</td>
              <td className="px-4 py-2 flex gap-2">
                <button className="bg-green-600 px-3 py-1 text-sm rounded text-white hover:bg-green-700 flex items-center gap-1">
                  <CheckCircle size={16} /> Approve
                </button>
                <button className="bg-red-600 px-3 py-1 text-sm rounded text-white hover:bg-red-700 flex items-center gap-1">
                  <XCircle size={16} /> Reject
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      {/* Credit / Debit Modal */}
      {showAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 border border-gray-700 w-full max-w-sm"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-lg text-white font-semibold">
              {actionType === "credit" ? "Credit" : "Debit"} Wallet - {actionUser.name}
            </h3>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-600 px-4 py-2 text-white rounded hover:bg-gray-700"
                onClick={() => setShowAction(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-700 px-4 py-2 text-white rounded hover:bg-green-800"
                onClick={handleTransaction}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WalletManager;
