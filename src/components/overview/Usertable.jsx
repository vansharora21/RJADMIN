import { useState } from "react";

const USERS = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    status: "Active",
    kycStatus: "Approved",
    lastLogin: "2025-07-14 10:23",
    registeredAt: "2024-01-10",
    referrals: 5,
    banned: false,
    documentType: "ID Card",
    documentUploaded: "2025-07-10",
    activity: [
      { date: "2025-07-14 10:00", action: "Login" },
      { date: "2025-07-14 10:05", action: "Placed Football Bet" },
      { date: "2025-07-14 10:15", action: "Deposited $100" },
    ],
    referralCode: "REF123",
    referralReward: 50,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "Suspended",
    kycStatus: "Pending",
    lastLogin: "2025-07-10 15:45",
    registeredAt: "2023-11-05",
    referrals: 2,
    banned: true,
    documentType: "Passport",
    documentUploaded: "2025-07-10",
    activity: [
      { date: "2025-07-10 15:00", action: "Login" },
      { date: "2025-07-10 15:10", action: "Uploaded KYC Document" },
    ],
    referralCode: "REF456",
    referralReward: 20,
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    status: "Active",
    kycStatus: "Rejected",
    lastLogin: "2025-07-13 08:12",
    registeredAt: "2024-05-22",
    referrals: 0,
    banned: false,
    documentType: "Driver's License",
    documentUploaded: "2025-07-10",
    activity: [
      { date: "2025-07-13 08:00", action: "Login Failed" },
      { date: "2025-07-13 08:05", action: "Login Successful" },
    ],
    referralCode: "REF789",
    referralReward: 0,
  },
];

export default function UserManagementDashboard() {
  const [users, setUsers] = useState(USERS);
  const [profileSearch, setProfileSearch] = useState("");
  const [kycSearch, setKycSearch] = useState("");
  const [banSearch, setBanSearch] = useState("");
  const [referralSearch, setReferralSearch] = useState("");
  const [activitySearch, setActivitySearch] = useState("");

  const toggleBan = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (window.confirm(`Are you sure you want to ${user.banned ? "unban" : "ban"} ${user.name}?`)) {
      setUsers(users.map((u) =>
        u.id === userId
          ? { ...u, banned: !u.banned, status: u.banned ? "Active" : "Suspended" }
          : u
      ));
    }
  };

  const updateKycStatus = (userId, status) => {
    setUsers(users.map((u) =>
      u.id === userId ? { ...u, kycStatus: status } : u
    ));
  };

  const filteredProfiles = users.filter(
    u =>
      u.name.toLowerCase().includes(profileSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(profileSearch.toLowerCase())
  );

  const filteredKyc = users.filter(
    u =>
      u.kycStatus !== "Approved" &&
      (u.name.toLowerCase().includes(kycSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(kycSearch.toLowerCase()) ||
        u.kycStatus.toLowerCase().includes(kycSearch.toLowerCase()))
  );

  const filteredBan = users.filter(
    u =>
      u.name.toLowerCase().includes(banSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(banSearch.toLowerCase()) ||
      (u.banned ? "banned" : "not banned").includes(banSearch.toLowerCase())
  );

  const filteredReferral = users.filter(
    u =>
      u.name.toLowerCase().includes(referralSearch.toLowerCase()) ||
      (u.referralCode && u.referralCode.toLowerCase().includes(referralSearch.toLowerCase()))
  );

  const filteredActivity = users
    .map(u => ({
      ...u,
      activity: u.activity.filter(a =>
        a.action.toLowerCase().includes(activitySearch.toLowerCase()) ||
        a.date.includes(activitySearch)
      ),
    }))
    .filter(u => u.activity.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23374151" fill-opacity="0.05"%3E%3Cpath d="M20 20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm0-20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z"/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div> */}
      
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 lg:space-y-10">
        {/* Header */}
        {/* <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 sm:mb-6 shadow-2xl">
            <span className="text-2xl sm:text-3xl">👤</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2 sm:mb-4 px-4">
            User Management Dashboard
          </h1>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Comprehensive user management system with advanced filtering and analytics
          </p>
        </div> */}

        {/* User Profiles Section */}
        <section className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl">
                <span className="text-xl sm:text-2xl">📋</span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">User Profiles</h2>
                <p className="text-gray-400 text-sm sm:text-base">Manage and view all user profiles</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-2xl sm:text-3xl font-bold text-white">{filteredProfiles.length}</div>
              <div className="text-xs sm:text-sm text-gray-400">Total Users</div>
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <div className="relative w-full sm:max-w-md">
              <input
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-black/20 border border-white/20 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none transition-all duration-300 text-sm sm:text-base"
                placeholder="Search by name or email..."
                value={profileSearch}
                onChange={e => setProfileSearch(e.target.value)}
              />
              <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile Cards View */}
          <div className="block lg:hidden space-y-4">
            {filteredProfiles.map((u) => (
              <div key={u.id} className="bg-black/10 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {u.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate">{u.name}</div>
                    <div className="text-gray-300 text-sm truncate">{u.email}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-400">Status:</span>
                    <span className={`ml-1 inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      u.status === 'Active' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
                    }`}>
                      {u.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">KYC:</span>
                    <span className={`ml-1 inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      u.kycStatus === 'Approved' ? 'bg-green-900/50 text-green-400' :
                      u.kycStatus === 'Pending' ? 'bg-yellow-900/50 text-yellow-400' :
                      'bg-red-900/50 text-red-400'
                    }`}>
                      {u.kycStatus}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Referrals:</span>
                    <span className="ml-1 text-blue-400 font-semibold">{u.referrals}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Banned:</span>
                    <span className={`ml-1 inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      u.banned ? 'bg-red-900/50 text-red-400' : 'bg-green-900/50 text-green-400'
                    }`}>
                      {u.banned ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 text-xs text-gray-400 space-y-1">
                  <div>Registered: {u.registeredAt}</div>
                  <div>Last Login: {u.lastLogin}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-hidden rounded-2xl border border-white/10 bg-black/10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-gradient-to-r from-gray-800/50 to-gray-700/50">
                  <tr>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">KYC</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Registered</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Last Login</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Referrals</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Banned</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredProfiles.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors duration-200">
                      <td className="px-4 xl:px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 xl:w-10 xl:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xs xl:text-sm mr-3">
                            {u.name.charAt(0)}
                          </div>
                          <div className="text-white font-medium text-sm xl:text-base">{u.name}</div>
                        </div>
                      </td>
                      <td className="px-4 xl:px-6 py-4 text-gray-300 text-sm xl:text-base">{u.email}</td>
                      <td className="px-4 xl:px-6 py-4">
                        <span className={`inline-flex px-2 xl:px-3 py-1 rounded-full text-xs font-semibold ${
                          u.status === 'Active' ? 'bg-green-900/50 text-green-400 border border-green-500/30' : 'bg-red-900/50 text-red-400 border border-red-500/30'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-4 xl:px-6 py-4">
                        <span className={`inline-flex px-2 xl:px-3 py-1 rounded-full text-xs font-semibold ${
                          u.kycStatus === 'Approved' ? 'bg-green-900/50 text-green-400 border border-green-500/30' :
                          u.kycStatus === 'Pending' ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-500/30' :
                          'bg-red-900/50 text-red-400 border border-red-500/30'
                        }`}>
                          {u.kycStatus}
                        </span>
                      </td>
                      <td className="px-4 xl:px-6 py-4 text-gray-300 text-sm xl:text-base">{u.registeredAt}</td>
                      <td className="px-4 xl:px-6 py-4 text-gray-300 text-sm xl:text-base">{u.lastLogin}</td>
                      <td className="px-4 xl:px-6 py-4">
                        <span className="inline-flex items-center justify-center w-6 h-6 xl:w-8 xl:h-8 bg-blue-900/50 text-blue-400 rounded-full text-xs xl:text-sm font-semibold border border-blue-500/30">
                          {u.referrals}
                        </span>
                      </td>
                      <td className="px-4 xl:px-6 py-4">
                        <span className={`inline-flex px-2 xl:px-3 py-1 rounded-full text-xs font-semibold ${
                          u.banned ? 'bg-red-900/50 text-red-400 border border-red-500/30' : 'bg-green-900/50 text-green-400 border border-green-500/30'
                        }`}>
                          {u.banned ? "Yes" : "No"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredProfiles.length === 0 && (
            <div className="py-8 sm:py-12 text-center text-gray-400">
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-600 mb-2 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-base sm:text-lg font-medium">No matching users found</p>
                <p className="text-xs sm:text-sm">Try adjusting your search criteria</p>
              </div>
            </div>
          )}
        </section>

        {/* KYC Section */}
        <section className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl">
                <span className="text-xl sm:text-2xl">🔍</span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">KYC Approvals</h2>
                <p className="text-gray-400 text-sm sm:text-base">Verify and approve user documents</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-2xl sm:text-3xl font-bold text-white">{filteredKyc.length}</div>
              <div className="text-xs sm:text-sm text-gray-400">Pending KYC</div>
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <div className="relative w-full sm:max-w-md">
              <input
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-black/20 border border-white/20 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/30 focus:outline-none transition-all duration-300 text-sm sm:text-base"
                placeholder="Search KYC users..."
                value={kycSearch}
                onChange={e => setKycSearch(e.target.value)}
              />
              <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile Cards View for KYC */}
          <div className="block lg:hidden space-y-4">
            {filteredKyc.map((u) => (
              <div key={u.id} className="bg-black/10 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {u.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate">{u.name}</div>
                    <div className="text-gray-300 text-sm truncate">{u.email}</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Status:</span>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      u.kycStatus === 'Pending' ? 'bg-yellow-900/50 text-yellow-400' : 'bg-red-900/50 text-red-400'
                    }`}>
                      {u.kycStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Document:</span>
                    <span className="text-gray-300">{u.documentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Uploaded:</span>
                    <span className="text-gray-300">{u.documentUploaded}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => updateKycStatus(u.id, "Approved")}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Approve
                  </button>
                  <button
                    onClick={() => updateKycStatus(u.id, "Rejected")}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View for KYC */}
          <div className="hidden lg:block overflow-hidden rounded-2xl border border-white/10 bg-black/10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-gradient-to-r from-emerald-800/50 to-green-700/50">
                  <tr>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-emerald-200 uppercase tracking-wider">Name</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-emerald-200 uppercase tracking-wider">Email</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-emerald-200 uppercase tracking-wider">KYC Status</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-emerald-200 uppercase tracking-wider">Document Type</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-emerald-200 uppercase tracking-wider">Uploaded</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-emerald-200 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredKyc.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors duration-200">
                      <td className="px-4 xl:px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 xl:w-10 xl:h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold text-xs xl:text-sm mr-3">
                            {u.name.charAt(0)}
                          </div>
                          <div className="text-white font-medium text-sm xl:text-base">{u.name}</div>
                        </div>
                      </td>
                      <td className="px-4 xl:px-6 py-4 text-gray-300 text-sm xl:text-base">{u.email}</td>
                      <td className="px-4 xl:px-6 py-4">
                        <span className={`inline-flex px-2 xl:px-3 py-1 rounded-full text-xs font-semibold ${
                          u.kycStatus === 'Pending' ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-500/30' :
                          'bg-red-900/50 text-red-400 border border-red-500/30'
                        }`}>
                          {u.kycStatus}
                        </span>
                      </td>
                      <td className="px-4 xl:px-6 py-4 text-gray-300 text-sm xl:text-base">{u.documentType}</td>
                      <td className="px-4 xl:px-6 py-4 text-gray-300 text-sm xl:text-base">{u.documentUploaded}</td>
                      <td className="px-4 xl:px-6 py-4">
                        <div className="flex flex-col xl:flex-row space-y-2 xl:space-y-0 xl:space-x-3">
                          <button
                            onClick={() => updateKycStatus(u.id, "Approved")}
                            className="inline-flex items-center px-3 xl:px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xs xl:text-sm font-semibold rounded-lg xl:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                          >
                            <svg className="w-3 h-3 xl:w-4 xl:h-4 mr-1 xl:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Approve
                          </button>
                          <button
                            onClick={() => updateKycStatus(u.id, "Rejected")}
                            className="inline-flex items-center px-3 xl:px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs xl:text-sm font-semibold rounded-lg xl:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                          >
                            <svg className="w-3 h-3 xl:w-4 xl:h-4 mr-1 xl:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredKyc.length === 0 && (
            <div className="py-8 sm:py-12 text-center text-gray-400">
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-600 mb-2 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-base sm:text-lg font-medium">No KYC records found</p>
                <p className="text-xs sm:text-sm">All documents are processed</p>
              </div>
            </div>
          )}
        </section>

        {/* Ban/Suspend Section */}
        <section className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-red-500/20 to-rose-500/20 rounded-xl">
                <span className="text-xl sm:text-2xl">🚫</span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Ban / Suspend Users</h2>
                <p className="text-gray-400 text-sm sm:text-base">Manage user access and restrictions</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-2xl sm:text-3xl font-bold text-white">{users.filter(u => u.banned).length}</div>
              <div className="text-xs sm:text-sm text-gray-400">Banned Users</div>
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <div className="relative w-full sm:max-w-md">
              <input
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-black/20 border border-white/20 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/30 focus:outline-none transition-all duration-300 text-sm sm:text-base"
                placeholder="Search users for ban/suspend..."
                value={banSearch}
                onChange={e => setBanSearch(e.target.value)}
              />
              <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile Cards View for Ban */}
          <div className="block lg:hidden space-y-4">
            {filteredBan.map((u) => (
              <div key={u.id} className="bg-black/10 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {u.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate">{u.name}</div>
                    <div className="text-gray-300 text-sm truncate">{u.email}</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Status:</span>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      u.status === 'Active' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
                    }`}>
                      {u.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Banned:</span>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      u.banned ? 'bg-red-900/50 text-red-400' : 'bg-green-900/50 text-green-400'
                    }`}>
                      {u.banned ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Login:</span>
                    <span className="text-gray-300 text-xs">{u.lastLogin}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleBan(u.id)}
                  className={`w-full inline-flex items-center justify-center px-4 py-2 ${
                    u.banned 
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700" 
                      : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
                  } text-white text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg`}
                >
                  {u.banned ? (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                      Unban
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                      </svg>
                      Ban
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Desktop Table View for Ban */}
          <div className="hidden lg:block overflow-hidden rounded-2xl border border-white/10 bg-black/10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-gradient-to-r from-red-800/50 to-rose-700/50">
                  <tr>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-red-200 uppercase tracking-wider">Name</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-red-200 uppercase tracking-wider">Email</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-red-200 uppercase tracking-wider">Status</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-red-200 uppercase tracking-wider">Banned</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-red-200 uppercase tracking-wider">Last Login</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-red-200 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredBan.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors duration-200">
                      <td className="px-4 xl:px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 xl:w-10 xl:h-10 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center text-white font-semibold text-xs xl:text-sm mr-3">
                            {u.name.charAt(0)}
                          </div>
                          <div className="text-white font-medium text-sm xl:text-base">{u.name}</div>
                        </div>
                      </td>
                      <td className="px-4 xl:px-6 py-4 text-gray-300 text-sm xl:text-base">{u.email}</td>
                      <td className="px-4 xl:px-6 py-4">
                        <span className={`inline-flex px-2 xl:px-3 py-1 rounded-full text-xs font-semibold ${
                          u.status === 'Active' ? 'bg-green-900/50 text-green-400 border border-green-500/30' : 'bg-red-900/50 text-red-400 border border-red-500/30'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-4 xl:px-6 py-4">
                        <span className={`inline-flex px-2 xl:px-3 py-1 rounded-full text-xs font-semibold ${
                          u.banned ? 'bg-red-900/50 text-red-400 border border-red-500/30' : 'bg-green-900/50 text-green-400 border border-green-500/30'
                        }`}>
                          {u.banned ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-4 xl:px-6 py-4 text-gray-300 text-sm xl:text-base">{u.lastLogin}</td>
                      <td className="px-4 xl:px-6 py-4">
                        <button
                          onClick={() => toggleBan(u.id)}
                          className={`inline-flex items-center px-3 xl:px-4 py-2 ${
                            u.banned 
                              ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700" 
                              : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
                          } text-white text-xs xl:text-sm font-semibold rounded-lg xl:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg`}
                        >
                          {u.banned ? (
                            <>
                              <svg className="w-3 h-3 xl:w-4 xl:h-4 mr-1 xl:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                              </svg>
                              Unban
                            </>
                          ) : (
                            <>
                              <svg className="w-3 h-3 xl:w-4 xl:h-4 mr-1 xl:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                              </svg>
                              Ban
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredBan.length === 0 && (
            <div className="py-8 sm:py-12 text-center text-gray-400">
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-600 mb-2 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-base sm:text-lg font-medium">No users found</p>
                <p className="text-xs sm:text-sm">Try adjusting your search criteria</p>
              </div>
            </div>
          )}
        </section>

        {/* Activity Logs Section */}
        <section className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl">
                <span className="text-xl sm:text-2xl">📂</span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">User Activity Logs</h2>
                <p className="text-gray-400 text-sm sm:text-base">Monitor user actions and behavior</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-2xl sm:text-3xl font-bold text-white">{filteredActivity.reduce((acc, u) => acc + u.activity.length, 0)}</div>
              <div className="text-xs sm:text-sm text-gray-400">Total Activities</div>
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <div className="relative w-full sm:max-w-md">
              <input
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-black/20 border border-white/20 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 focus:outline-none transition-all duration-300 text-sm sm:text-base"
                placeholder="Search logs by text or date..."
                value={activitySearch}
                onChange={e => setActivitySearch(e.target.value)}
              />
              <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {filteredActivity.map((u) => (
              <div key={u.id} className="bg-black/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                    {u.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-white">{u.name}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">{u.activity.length} activities found</p>
                  </div>
                </div>
                
                <div className="overflow-hidden rounded-lg sm:rounded-xl border border-white/10">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-full">
                      <thead className="bg-gradient-to-r from-indigo-800/50 to-purple-800/50">
                        <tr>
                          <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-indigo-200 uppercase tracking-wider">Date</th>
                          <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-indigo-200 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {u.activity.map((act, idx) => (
                          <tr key={idx} className="hover:bg-white/5 transition-colors duration-200">
                            <td className="px-3 sm:px-4 py-3 text-gray-300 text-xs sm:text-sm">{act.date}</td>
                            <td className="px-3 sm:px-4 py-3 text-white text-xs sm:text-sm">{act.action}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
            {filteredActivity.length === 0 && (
              <div className="text-center py-12 sm:py-16">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-lg sm:text-xl font-medium text-gray-400 mb-2">No matching activity logs</p>
                <p className="text-sm sm:text-base text-gray-500">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </section>

        {/* Referral System Section */}
        <section className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl">
                <span className="text-xl sm:text-2xl">🎁</span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Referral System</h2>
                <p className="text-gray-400 text-sm sm:text-base">Track referrals and rewards</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-2xl sm:text-3xl font-bold text-white">${users.reduce((acc, u) => acc + u.referralReward, 0)}</div>
              <div className="text-xs sm:text-sm text-gray-400">Total Rewards</div>
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <div className="relative w-full sm:max-w-md">
              <input
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-black/20 border border-white/20 rounded-xl sm:rounded-2xl text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 focus:outline-none transition-all duration-300 text-sm sm:text-base"
                placeholder="Search referrals..."
                value={referralSearch}
                onChange={e => setReferralSearch(e.target.value)}
              />
              <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile Cards View for Referrals */}
          <div className="block lg:hidden space-y-4">
            {filteredReferral.map((u) => (
              <div key={u.id} className="bg-black/10 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {u.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate">{u.name}</div>
                    <div className="text-yellow-400 text-sm font-mono">{u.referralCode}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Referrals:</span>
                    <span className="text-orange-400 font-semibold">{u.referrals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Reward:</span>
                    <span className="text-green-400 font-bold">${u.referralReward}</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                    u.referralReward > 0 ? 'bg-green-900/50 text-green-400 border border-green-500/30' : 'bg-gray-700/50 text-gray-400 border border-gray-500/30'
                  }`}>
                    {u.referralReward > 0 ? "Eligible" : "None"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View for Referrals */}
          <div className="hidden lg:block overflow-hidden rounded-2xl border border-white/10 bg-black/10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-gradient-to-r from-yellow-800/50 to-orange-700/50">
                  <tr>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-yellow-200 uppercase tracking-wider">User</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-yellow-200 uppercase tracking-wider">Code</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-yellow-200 uppercase tracking-wider">Referrals</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-yellow-200 uppercase tracking-wider">Reward ($)</th>
                    <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold text-yellow-200 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredReferral.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors duration-200">
                      <td className="px-4 xl:px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 xl:w-10 xl:h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-xs xl:text-sm mr-3">
                            {u.name.charAt(0)}
                          </div>
                          <div className="text-white font-medium text-sm xl:text-base">{u.name}</div>
                        </div>
                      </td>
                      <td className="px-4 xl:px-6 py-4">
                        <span className="inline-flex items-center px-2 xl:px-3 py-1 bg-yellow-900/50 text-yellow-400 rounded-full text-xs xl:text-sm font-mono border border-yellow-500/30">
                          {u.referralCode}
                        </span>
                      </td>
                      <td className="px-4 xl:px-6 py-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 xl:w-10 xl:h-10 bg-orange-900/50 text-orange-400 rounded-full text-xs xl:text-sm font-semibold border border-orange-500/30">
                          {u.referrals}
                        </span>
                      </td>
                      <td className="px-4 xl:px-6 py-4">
                        <span className="text-xl xl:text-2xl font-bold text-green-400">${u.referralReward}</span>
                      </td>
                      <td className="px-4 xl:px-6 py-4">
                        <span className={`inline-flex px-2 xl:px-3 py-1 rounded-full text-xs font-semibold ${
                          u.referralReward > 0 ? 'bg-green-900/50 text-green-400 border border-green-500/30' : 'bg-gray-700/50 text-gray-400 border border-gray-500/30'
                        }`}>
                          {u.referralReward > 0 ? "Eligible" : "None"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredReferral.length === 0 && (
            <div className="py-8 sm:py-12 text-center text-gray-400">
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-600 mb-2 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                <p className="text-base sm:text-lg font-medium">No referrals found</p>
                <p className="text-xs sm:text-sm">Try adjusting your search criteria</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
