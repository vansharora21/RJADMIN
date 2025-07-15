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
    documentType: "Driver’s License",
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

  // Dynamic state for search/filter per table
  const [profileSearch, setProfileSearch] = useState("");
  const [kycSearch, setKycSearch] = useState("");
  const [banSearch, setBanSearch] = useState("");
  const [referralSearch, setReferralSearch] = useState("");
  const [activitySearch, setActivitySearch] = useState("");

  // Handler for ban/unban toggling with confirmation
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

  // Handler for KYC status update
  const updateKycStatus = (userId, status) => {
    setUsers(users.map((u) =>
      u.id === userId
        ? { ...u, kycStatus: status }
        : u
    ));
  };

  // Dynamic filters for each table
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
    <div className="p-6 text-white space-y-12 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">👤 User Management Dashboard</h1>

      {/* 1. View & Manage Profiles */}
      <section>
        <h2 className="text-xl font-semibold mb-2">📋 User Profiles</h2>
        <input
          className="mb-4 px-2 py-1 rounded text-black"
          placeholder="Search by name or email..."
          value={profileSearch}
          onChange={e => setProfileSearch(e.target.value)}
        />
        <table className="w-full table-auto border rounded border-gray-700 divide-y divide-gray-700 text-sm">
          <thead className="bg-gray-800 text-left uppercase text-gray-400">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>KYC</th>
              <th>Registered</th>
              <th>Last Login</th>
              <th>Referrals</th>
              <th>Banned</th>
            </tr>
          </thead>
          <tbody>
            {filteredProfiles.map((u) => (
              <tr key={u.id} className="hover:bg-gray-800">
                <td className="p-3">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.status}</td>
                <td>{u.kycStatus}</td>
                <td>{u.registeredAt}</td>
                <td>{u.lastLogin}</td>
                <td>{u.referrals}</td>
                <td>{u.banned ? "Yes" : "No"}</td>
              </tr>
            ))}
            {filteredProfiles.length === 0 && (
              <tr><td colSpan={8} className="italic text-center text-gray-400 p-2">No matching users.</td></tr>
            )}
          </tbody>
        </table>
      </section>

      {/* 2. KYC Verification */}
      <section>
        <h2 className="text-xl font-semibold mb-2">🔍 KYC Approvals</h2>
        <input
          className="mb-4 px-2 py-1 rounded text-black"
          placeholder="Search KYC users..."
          value={kycSearch}
          onChange={e => setKycSearch(e.target.value)}
        />
        <table className="w-full table-auto border rounded border-gray-700 divide-y divide-gray-700 text-sm">
          <thead className="bg-gray-800 text-left uppercase text-gray-400">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>KYC Status</th>
              <th>Document Type</th>
              <th>Uploaded</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredKyc.map((u) => (
              <tr key={u.id} className="hover:bg-gray-800">
                <td className="p-3">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.kycStatus}</td>
                <td>{u.documentType}</td>
                <td>{u.documentUploaded}</td>
                <td>
                  <button
                    onClick={() => updateKycStatus(u.id, "Approved")}
                    className="bg-green-600 px-2 py-1 rounded text-xs mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateKycStatus(u.id, "Rejected")}
                    className="bg-red-600 px-2 py-1 rounded text-xs"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {filteredKyc.length === 0 && (
              <tr><td colSpan={6} className="italic text-center text-gray-400 p-2">No KYC records found.</td></tr>
            )}
          </tbody>
        </table>
      </section>

      {/* 3. Ban/Suspend */}
      <section>
        <h2 className="text-xl font-semibold mb-2">🚫 Ban / Suspend Users</h2>
        <input
          className="mb-4 px-2 py-1 rounded text-black"
          placeholder="Search users for ban/suspend..."
          value={banSearch}
          onChange={e => setBanSearch(e.target.value)}
        />
        <table className="w-full table-auto border rounded border-gray-700 divide-y divide-gray-700 text-sm">
          <thead className="bg-gray-800 text-left uppercase text-gray-400">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Banned</th>
              <th>Last Login</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBan.map((u) => (
              <tr key={u.id} className="hover:bg-gray-800">
                <td className="p-3">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.status}</td>
                <td>{u.banned ? "Yes" : "No"}</td>
                <td>{u.lastLogin}</td>
                <td>
                  <button
                    onClick={() => toggleBan(u.id)}
                    className={`${
                      u.banned ? "bg-blue-600" : "bg-red-600"
                    } px-2 py-1 rounded text-xs`}
                  >
                    {u.banned ? "Unban" : "Ban"}
                  </button>
                </td>
              </tr>
            ))}
            {filteredBan.length === 0 && (
              <tr><td colSpan={6} className="italic text-center text-gray-400 p-2">No users found for ban/suspend.</td></tr>
            )}
          </tbody>
        </table>
      </section>

      {/* 4. Activity Logs */}
      <section>
        <h2 className="text-xl font-semibold mb-2">📂 User Activity Logs</h2>
        <input
          className="mb-4 px-2 py-1 rounded text-black"
          placeholder="Search logs by text or date..."
          value={activitySearch}
          onChange={e => setActivitySearch(e.target.value)}
        />
        <div className="space-y-4">
          {filteredActivity.map((u) => (
            <div key={u.id}>
              <h4 className="font-semibold mb-2">{u.name}</h4>
              <table className="w-full table-auto mb-4 border border-gray-700 text-sm">
                <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
                  <tr>
                    <th className="p-2">Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {u.activity.map((act, idx) => (
                    <tr key={idx} className="hover:bg-gray-800">
                      <td className="p-2">{act.date}</td>
                      <td>{act.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          {filteredActivity.length === 0 && (
            <div className="italic text-center text-gray-400">No matching activity logs.</div>
          )}
        </div>
      </section>

      {/* 5. Referral Tracking */}
      <section>
        <h2 className="text-xl font-semibold mb-2">🎁 Referral System</h2>
        <input
          className="mb-4 px-2 py-1 rounded text-black"
          placeholder="Search referrals..."
          value={referralSearch}
          onChange={e => setReferralSearch(e.target.value)}
        />
        <table className="w-full table-auto border rounded border-gray-700 divide-y divide-gray-700 text-sm">
          <thead className="bg-gray-800 text-left uppercase text-gray-400">
            <tr>
              <th className="p-3">User</th>
              <th>Code</th>
              <th>Referrals</th>
              <th>Reward ($)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredReferral.map((u) => (
              <tr key={u.id} className="hover:bg-gray-800">
                <td className="p-3">{u.name}</td>
                <td>{u.referralCode}</td>
                <td>{u.referrals}</td>
                <td>{u.referralReward}</td>
                <td>{u.referralReward > 0 ? "Eligible" : "None"}</td>
              </tr>
            ))}
            {filteredReferral.length === 0 && (
              <tr><td colSpan={5} className="italic text-center text-gray-400 p-2">No referrals found.</td></tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
