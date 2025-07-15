import { motion } from "framer-motion";
import { Edit, Search, Trash2, Plus } from "lucide-react";
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
    <div className="space-y-8">
      {/* Header & Search */}
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
            Contests Manager
          </h2>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search contests..."
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleSearch}
                value={searchTerm}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            <button
              onClick={openAdd}
              className="inline-flex gap-2 items-center bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
            >
              <Plus size={18} /> New Contest
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Entry Fee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Prize Pool</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Max Participants</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredContests.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-gray-400 py-4">No contests found.</td>
                </tr>
              ) : (
                filteredContests.map((contest) => (
                  <motion.tr
                    key={contest.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {contest.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      ${contest.entryFee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      ${contest.prizePool}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {contest.maxParticipants}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        contest.status === "Upcoming"
                          ? "bg-blue-900 text-blue-300"
                          : contest.status === "Live"
                          ? "bg-green-900 text-green-300"
                          : "bg-yellow-900 text-yellow-300"
                      }`}>
                        {contest.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <button
                        className="text-indigo-400 hover:text-indigo-300 mr-2"
                        onClick={() => openEdit(contest)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleDelete(contest.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal / Inline Add/Edit Form */}
      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <motion.form
            className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 space-y-4 min-w-[320px]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-lg font-medium text-gray-100 mb-2">
              {form.id ? "Edit Contest" : "Create Contest"}
            </h3>
            <div>
              <input
                name="name"
                type="text"
                placeholder="Contest Name"
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none mb-2"
                value={form.name}
                onChange={handleChange}
              />
              <input
                name="entryFee"
                type="number"
                min={0}
                placeholder="Entry Fee"
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none mb-2"
                value={form.entryFee}
                onChange={handleChange}
              />
              <input
                name="prizePool"
                type="number"
                min={0}
                placeholder="Prize Pool"
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none mb-2"
                value={form.prizePool}
                onChange={handleChange}
              />
              <input
                name="maxParticipants"
                type="number"
                min={1}
                placeholder="Max Participants"
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none mb-2"
                value={form.maxParticipants}
                onChange={handleChange}
              />
              <select
                name="status"
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none mb-2"
                value={form.status}
                onChange={handleChange}
              >
                {STATUS_OPTIONS.map((stat) => (
                  <option value={stat} key={stat}>
                    {stat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-4 justify-end mt-2">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700 transition"
                onClick={() => setShowAdd(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-green-700 text-white hover:bg-green-800 transition"
                onClick={handleFormSubmit}
              >
                {form.id ? "Update" : "Create"}
              </button>
            </div>
          </motion.form>
        </div>
      )}
    </div>
  );
};

export default ContestsTable;
