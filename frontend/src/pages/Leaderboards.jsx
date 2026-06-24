import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, ArrowLeft } from "lucide-react";
import { DataContext } from "../App";

export default function Leaderboards() {
  const navigate = useNavigate();
  const { levels } = useContext(DataContext);

  return (
    <div className="min-h-screen bg-[url('/BG.png')] bg-cover bg-center text-white">
      <div className="min-h-screen bg-black/60 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/70 border border-slate-700"
            >
              <ArrowLeft size={18} />
              Home
            </button>

            <h1 className="text-5xl font-black flex items-center gap-3">
              <Trophy className="text-yellow-400" />
              Leaderboards
            </h1>

            <div />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {levels.map((level) => (
              <div
                key={level._id}
                className="bg-slate-900/70 border border-slate-700 rounded-3xl overflow-hidden"
              >
                <img
                  src={level.image}
                  alt={level.title}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <h2 className="text-2xl font-bold mb-2">{level.title}</h2>

                  <p className="text-slate-400 mb-4">
                    Difficulty: {"★".repeat(level.difficulty)}
                  </p>

                  <button
                    onClick={() => navigate(`/leaderboard/${level._id}`)}
                    className="w-full py-3 rounded-xl bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition"
                  >
                    View Leaderboard
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
