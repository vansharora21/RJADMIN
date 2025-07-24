import { motion } from "framer-motion";
import { Edit, Search, Trash2, Plus, Trophy, DollarSign, Users, Calendar } from "lucide-react";
import { useState } from "react";

// Example contests data
const INITIAL_CONTESTS = [
  {
    id: 1,
    name: "Weekly Trivia Showdown",
    entryFee: 10,
    prizePool: 1000,
    maxParticipants: 200,
    status: "Upcoming",
  },
  {
    id: 2,
    name: "Grand Sports Bonanza",
    entryFee: 20,
    prizePool: 5000,
    maxParticipants: 300,
    status: "Live",
  },
  {
    id: 3,
    name: "Coding Championship",
    entryFee: 15,
    prizePool: 1500,
    maxParticipants: 150,
    status: "Completed",
  },
  {
    id: 4,
    name: "Weekend Puzzle Frenzy",
    entryFee: 5,
    prizePool: 300,
    maxParticipants: 100,
    status: "Upcoming",
  },
  {
    id: 5,
    name: "Live Sports Clash",
    entryFee: 25,
    prizePool: 2500,
    maxParticipants: 250,
    status: "Live",
  },
  {
    id: 6,
    name: "Monthly Mega Quiz",
    entryFee: 8,
    prizePool: 800,
    maxParticipants: 120,
    status: "Completed",
  },
  {
    id: 7,
    name: "Speed Coding Race",
    entryFee: 12,
    prizePool: 1200,
    maxParticipants: 180,
    status: "Upcoming",
  },
  {
    id: 8,
    name: "Trivia Time Trial",
    entryFee: 6,
    prizePool: 600,
    maxParticipants: 90,
    status: "Live",
  },
  {
    id: 9,
    name: "Fantasy Sports League",
    entryFee: 30,
    prizePool: 3000,
    maxParticipants: 350,
    status: "Live",
  },
  {
    id: 10,
    name: "Ultimate Brain Bash",
    entryFee: 18,
    prizePool: 1800,
    maxParticipants: 160,
    status: "Completed",
  },
  {
    id: 11,
    name: "Lucky Draw Night",
    entryFee: 3,
    prizePool: 500,
    maxParticipants: 80,
    status: "Upcoming",
  },
  {
    id: 12,
    name: "Strategy Sprint",
    entryFee: 14,
    prizePool: 1400,
    maxParticipants: 170,
    status: "Upcoming",
  },
  {
    id: 13,
    name: "Night Owl Challenge",
    entryFee: 9,
    prizePool: 900,
    maxParticipants: 120,
    status: "Live",
  },
  {
    id: 14,
    name: "Elite Coder Cup",
    entryFee: 20,
    prizePool: 4000,
    maxParticipants: 200,
    status: "Completed",
  },
  {
    id: 15,
    name: "Pop Culture Trivia",
    entryFee: 7,
    prizePool: 700,
    maxParticipants: 110,
    status: "Upcoming",
  },
];

const STATUS_OPTIONS = ["Upcoming", "Live", "Completed"];

const ContestsTable = () => {
  const [contests, setContests] = useState(INITIAL_CONTESTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name: "",
    entryFee: "",
    prizePool: "",
    maxParticipants: "",
    status: "Upcoming",
  });

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Open add form
  const openAdd = () => {
    setForm({
      id: null,
      name: "",
      entryFee: "",
      prizePool: "",
      maxParticipants: "",
      status: "Upcoming",
    });
    setShowAdd(true);
  };

  // Open edit form
  const openEdit = (contest) => {
    setForm({
      ...contest,
    });
    setShowAdd(true);
  };

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update contest
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.entryFee ||
      !form.prizePool ||
      !form.maxParticipants ||
      !form.status
    ) {
      alert("Fill all fields.");
      return;
    }
    if (form.id) {
      // Edit
      setContests((prev) =>
        prev.map((c) => (c.id === form.id ? { ...form, entryFee: Number(form.entryFee), prizePool: Number(form.prizePool), maxParticipants: Number(form.maxParticipants) } : c))
      );
    } else {
      // Create
      setContests((prev) => [
        ...prev,
        {
          ...form,
          id: prev.length ? Math.max(...prev.map((c) => c.id)) + 1 : 1,
          entryFee: Number(form.entryFee),
          prizePool: Number(form.prizePool),
          maxParticipants: Number(form.maxParticipants),
        },
      ]);
    }
    setShowAdd(false);
  };

  // Delete contest
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this contest?")) {
      setContests((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // Filter contests for search
  const filteredContests = contests.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm) ||
      c.status.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <motion.div
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl backdrop-blur-sm border border-purple-500/30">
              <Trophy size={24} className="text-purple-400 drop-shadow-sm" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">Contests Manager</h2>
              <p className="text-gray-400 text-sm">Manage all fantasy contests and competitions</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full lg:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search contests..."
                className="w-full sm:w-80 pl-12 pr-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                onChange={handleSearch}
                value={searchTerm}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <motion.button
              onClick={openAdd}
              className="inline-flex gap-2 items-center justify-center bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm border border-green-500/30 hover:from-green-600/40 hover:to-emerald-600/40 hover:border-green-400/50 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={18} /> New Contest
            </motion.button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-hidden rounded-xl border border-white/10 bg-black/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead className="bg-gradient-to-r from-gray-800/50 to-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Contest Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Entry Fee</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Prize Pool</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Max Participants</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredContests.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                      <div className="flex flex-col items-center">
                        <Trophy className="w-12 h-12 text-gray-600 mb-4" />
                        <p className="text-lg font-medium">No contests found</p>
                        <p className="text-sm">Try adjusting your search criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredContests.map((contest, index) => (
                    <motion.tr
                      key={contest.id}
                      className="hover:bg-white/5 transition-colors duration-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                            {contest.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-white font-medium">{contest.name}</div>
                            <div className="text-gray-400 text-sm">Contest #{contest.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <DollarSign size={16} className="text-green-400" />
                          <span className="text-white font-semibold">${contest.entryFee}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Trophy size={16} className="text-yellow-400" />
                          <span className="text-white font-semibold">${contest.prizePool.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-blue-400" />
                          <span className="text-white">{contest.maxParticipants}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${
                          contest.status === "Upcoming"
                            ? "bg-blue-900/50 text-blue-400 border-blue-500/30"
                            : contest.status === "Live"
                            ? "bg-green-900/50 text-green-400 border-green-500/30"
                            : "bg-gray-900/50 text-gray-400 border-gray-500/30"
                        }`}>
                          {contest.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <motion.button
                            className="p-2 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 rounded-lg border border-indigo-500/30 transition-all duration-300"
                            onClick={() => openEdit(contest)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Edit size={16} />
                          </motion.button>
                          <motion.button
                            className="p-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg border border-red-500/30 transition-all duration-300"
                            onClick={() => handleDelete(contest.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="block lg:hidden space-y-4">
          {filteredContests.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-lg font-medium">No contests found</p>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
          ) : (
            filteredContests.map((contest, index) => (
              <motion.div
                key={contest.id}
                className="bg-black/10 rounded-xl p-4 border border-white/10 hover:bg-white/5 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {contest.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{contest.name}</h3>
                      <p className="text-gray-400 text-sm">Contest #{contest.id}</p>
                    </div>
                  </div>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${
                    contest.status === "Upcoming"
                      ? "bg-blue-900/50 text-blue-400 border-blue-500/30"
                      : contest.status === "Live"
                      ? "bg-green-900/50 text-green-400 border-green-500/30"
                      : "bg-gray-900/50 text-gray-400 border-gray-500/30"
                  }`}>
                    {contest.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign size={14} className="text-green-400" />
                    <span className="text-gray-400 text-sm">Entry:</span>
                    <span className="text-white text-sm font-semibold">${contest.entryFee}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy size={14} className="text-yellow-400" />
                    <span className="text-gray-400 text-sm">Prize:</span>
                    <span className="text-white text-sm font-semibold">${contest.prizePool.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <Users size={14} className="text-blue-400" />
                    <span className="text-gray-400 text-sm">Max Participants:</span>
                    <span className="text-white text-sm">{contest.maxParticipants}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-white/10">
                  <motion.button
                    className="flex-1 p-2 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 rounded-lg border border-indigo-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={() => openEdit(contest)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Edit size={14} />
                    <span className="text-sm font-medium">Edit</span>
                  </motion.button>
                  <motion.button
                    className="flex-1 p-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg border border-red-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={() => handleDelete(contest.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Trash2 size={14} />
                    <span className="text-sm font-medium">Delete</span>
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Enhanced Modal Form */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            className="w-full max-w-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <form className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl backdrop-blur-sm border border-purple-500/30">
                  <Trophy size={20} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white drop-shadow-lg">
                    {form.id ? "Edit Contest" : "Create New Contest"}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {form.id ? "Update contest details" : "Add a new fantasy contest"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contest Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter contest name"
                    className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Entry Fee</label>
                    <div className="relative">
                      <DollarSign size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        name="entryFee"
                        type="number"
                        min={0}
                        placeholder="0"
                        className="w-full bg-black/20 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/30 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                        value={form.entryFee}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Prize Pool</label>
                    <div className="relative">
                      <Trophy size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        name="prizePool"
                        type="number"
                        min={0}
                        placeholder="0"
                        className="w-full bg-black/20 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                        value={form.prizePool}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Max Participants</label>
                  <div className="relative">
                    <Users size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      name="maxParticipants"
                      type="number"
                      min={1}
                      placeholder="100"
                      className="w-full bg-black/20 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                      value={form.maxParticipants}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      name="status"
                      className="w-full bg-black/20 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-none transition-all duration-300 backdrop-blur-sm appearance-none"
                      value={form.status}
                      onChange={handleChange}
                    >
                      {STATUS_OPTIONS.map((stat) => (
                        <option value={stat} key={stat} className="bg-gray-800">
                          {stat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-end mt-8">
                <motion.button
                  type="button"
                  className="px-6 py-3 rounded-xl bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 font-medium backdrop-blur-sm"
                  onClick={() => setShowAdd(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 text-white hover:from-green-600/40 hover:to-emerald-600/40 hover:border-green-400/50 transition-all duration-300 font-semibold backdrop-blur-sm shadow-lg"
                  onClick={handleFormSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {form.id ? "Update Contest" : "Create Contest"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ContestsTable;
