import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, RefreshCcw } from "lucide-react";

// Initial dummy data
const initialData = {
  cricket: [
    { id: 1, name: "Virat Kohli", team: "RCB", stat: 8421, matches: 260, status: "Active" }
  ],
  football: [
    { id: 2, name: "Cristiano Ronaldo", team: "Al-Nassr", stat: 813, matches: 1200, status: "Active" }
  ],
  basketball: []
};

// Simulated API fetch for live data
async function fetchLivePlayers(sport) {
  // Stub - simulate fetch delay and return mocked data
  return new Promise(resolve => {
    setTimeout(() => {
      if (sport === "cricket") {
        resolve([
          { id: 10, name: "Rohit Sharma", team: "MI", stat: 9500, matches: 280, status: "Active" }
        ]);
      } else if (sport === "football") {
        resolve([
          { id: 11, name: "Lionel Messi", team: "Inter Miami", stat: 815, matches: 1100, status: "Active" }
        ]);
      } else if (sport === "basketball") {
        resolve([
          { id: 12, name: "LeBron James", team: "Lakers", stat: 38000, matches: 1400, status: "Active" }
        ]);
      } else {
        resolve([]);
      }
    }, 1000);
  });
}

// Modal for adding/editing a player
function PlayerModal({ player, onSave, onClose, sport }) {
  const [form, setForm] = useState(player || {
    name: "", team: "", stat: "", matches: "", status: "Active"
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ ...form, stat: Number(form.stat), matches: Number(form.matches) });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4 text-white">{player ? "Edit" : "Add"} Player ({sport})</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="input" placeholder="Name" name="name" value={form.name} onChange={handleChange} required />
          <input className="input" placeholder="Team" name="team" value={form.team} onChange={handleChange} required />
          <input className="input" placeholder="Stat (Runs/Goals/Points)" name="stat" type="number" value={form.stat} onChange={handleChange} required />
          <input className="input" placeholder="Matches" name="matches" type="number" value={form.matches} onChange={handleChange} required />
          <select className="input" name="status" value={form.status} onChange={handleChange}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">{player ? "Save" : "Add"}</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Table Component per sport
function SportTable({ sport, players, onAddPlayer, onEdit, onDelete, onSave, onSync }) {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);

  const filtered = players.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.team.toLowerCase().includes(search.toLowerCase())
  );

  function openAddModal() {
    setEditingPlayer(null);
    setModalOpen(true);
  }

  function openEditModal(player) {
    setEditingPlayer(player);
    setModalOpen(true);
  }

  function handleSave(data) {
    onSave(data, editingPlayer);
    setModalOpen(false);
  }

  return (
    <motion.div className="mb-12 bg-gray-800 bg-opacity-60 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold text-white">{sport} Players</h2>
        <div className="flex items-center gap-2">
          <button onClick={() => onSync()} className="btn-secondary flex items-center gap-1">
            <RefreshCcw size={16} /> Sync
          </button>
          <button onClick={openAddModal} className="btn-primary">Add Player</button>
        </div>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search players..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="th-style">Name</th>
              <th className="th-style">Team</th>
              <th className="th-style">{sport === "Cricket" ? "Runs" : sport === "Football" ? "Goals" : "Points"}</th>
              <th className="th-style">Matches</th>
              <th className="th-style">Status</th>
              <th className="th-style">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filtered.map(p =>
              <tr key={p.id}>
                <td className="td-style">{p.name}</td>
                <td className="td-style">{p.team}</td>
                <td className="td-style">{p.stat}</td>
                <td className="td-style">{p.matches}</td>
                <td className="td-style">
                  <span className={`px-2 inline-flex text-xs font-semibold rounded-full
                    ${p.status === "Active" ? "bg-green-800 text-green-100" : "bg-red-800 text-red-100"}`}>
                    {p.status}
                  </span>
                </td>
                <td className="td-style">
                  <button className="text-indigo-400 hover:text-indigo-300 mr-2" onClick={() => openEditModal(p)}>Edit</button>
                  <button className="text-red-400 hover:text-red-300" onClick={() => onDelete(p.id)}>Delete</button>
                </td>
              </tr>
            )}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-400">No players found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <PlayerModal
          sport={sport}
          player={editingPlayer}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </motion.div>
  );
}

// Main Component
export default function PlayersTables() {
  const [players, setPlayers] = useState(initialData);

  function handleSave(sport, data, editing) {
    setPlayers(prev => {
      const list = prev[sport.toLowerCase()];
      if (editing) {
        return {
          ...prev,
          [sport.toLowerCase()]: list.map(p => p.id === editing.id ? { ...p, ...data } : p)
        };
      } else {
        const newId = list.length ? Math.max(...list.map(p => p.id)) + 1 : 1;
        return {
          ...prev,
          [sport.toLowerCase()]: [...list, { ...data, id: newId }]
        };
      }
    });
  }

  function handleDelete(sport, id) {
    setPlayers(prev => ({
      ...prev,
      [sport.toLowerCase()]: prev[sport.toLowerCase()].filter(p => p.id !== id)
    }));
  }

  async function syncWithAPI(sport) {
    const liveData = await fetchLivePlayers(sport.toLowerCase());
    setPlayers(prev => ({
      ...prev,
      [sport.toLowerCase()]: liveData
    }));
  }

  return (
    <div className="space-y-10 py-8">
      {["Cricket", "Football", "Basketball"].map(sport => (
        <SportTable
          key={sport}
          sport={sport}
          players={players[sport.toLowerCase()]}
          onDelete={(id) => handleDelete(sport, id)}
          onSave={(data, editing) => handleSave(sport, data, editing)}
          onSync={() => syncWithAPI(sport)}
        />
      ))}

      <style jsx>{`
        .input {
          background-color: #374151;
          color: white;
          padding: 0.5rem 1rem;
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #4b5563;
        }
        .btn-primary {
          background: linear-gradient(90deg, #6366f1, #3b82f6);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
        }
        .btn-primary:hover {
          background: linear-gradient(90deg, #818cf8, #60a5fa);
        }
        .btn-secondary {
          background: #4b5563;
          color: white;
          padding: 0.4rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.9rem;
        }
        .th-style {
          padding: 0.75rem 1rem;
          text-align: left;
          color: #a1a1aa;
          text-transform: uppercase;
          font-size: 0.75rem;
        }
        .td-style {
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          color: #e5e7eb;
        }
      `}</style>
    </div>
  );
}
