import { Trophy, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";

export default function Leaderboard() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const api = useAxios();

  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLeaderboard = async () => {
    try {
      const response = await api.get(`/api/game/leaderboard/${levelId}`);

      setScores(response.data.scores);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLeaderboard();
  }, [levelId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050814] flex justify-center items-center text-white text-3xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/BG.png')] bg-cover bg-center text-white">
      <div className="min-h-screen bg-black/60 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/70 border border-slate-700"
            >
              <ArrowLeft size={18} />
              Home
            </button>

            <img src="/logo.png" alt="Logo" className="h-20 object-contain" />

            <div />
          </div>

          {/* Title */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <Trophy size={60} className="text-yellow-400" />
            </div>

            <h1 className="text-5xl font-black">LEADERBOARD</h1>

            <p className="text-slate-300 mt-2">
              Fastest players for this level
            </p>
          </div>

          {/* Table */}
          <div className="bg-slate-900/70 border border-slate-700 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-3 px-6 py-4 bg-slate-800 font-bold text-lg">
              <span>Rank</span>
              <span>Player</span>
              <span>Time</span>
            </div>

            {scores.length === 0 ? (
              <div className="p-10 text-center text-slate-400">
                No scores yet
              </div>
            ) : (
              scores.map((score, index) => (
                <div
                  key={score._id}
                  className="grid grid-cols-3 px-6 py-4 border-t border-slate-700 hover:bg-slate-800/50"
                >
                  <span className="font-bold">#{index + 1}</span>

                  <span>{score.playerName}</span>

                  <span className="text-yellow-400 font-semibold">
                    {score.completionTime}s
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
