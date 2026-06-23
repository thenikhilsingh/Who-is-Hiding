import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";

const levelStyles = {
  "Fantasy Island": {
    icon: "🏝️",
    borderColor: "#14B8A6",
    bgColor: "#06282C",
  },

  "Robot City": {
    icon: "⚙️",
    borderColor: "#3B82F6",
    bgColor: "#0B2340",
  },

  "Cyber Tower": {
    icon: "🏢",
    borderColor: "#A855F7",
    bgColor: "#241245",
  },
};

export default function Home() {
  const navigate = useNavigate();

  const { levels } = useContext(DataContext);

  if (!levels?.length) {
    return (
      <div className="min-h-screen bg-[url('/BG.png')] bg-cover bg-center flex justify-center items-center text-white text-2xl">
        Loading Levels...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/BG.png')] bg-cover bg-center text-white">
      <div className="min-h-screen bg-black/40 backdrop-blur-sm">
        {/* Header */}
        <header className="flex items-center justify-between px-8">
          <img
            src="/logo.png"
            alt="Who's Hiding?"
            className="w-56 object-contain"
          />

          <div className="text-center">
            <h1 className="text-5xl font-black tracking-wide">
              CHOOSE YOUR WORLD
            </h1>

            <p className="mt-3 text-slate-300 text-lg">
              Explore amazing worlds and find the hidden characters!
            </p>
          </div>

          <button className="px-6 py-3 rounded-xl border border-slate-700 bg-slate-900/70 hover:bg-slate-800 transition cursor-pointer">
            Leaderboard
          </button>
        </header>

        {/* Cards */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {levels.map((level, index) => {
              const style = levelStyles[level.title];

              return (
                <div
                  key={level._id}
                  onClick={() => navigate(`/game/${level._id}`)}
                  className="relative h-110 rounded-[28px] overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
                  style={{
                    backgroundImage: `url(${level.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderColor: style.borderColor,
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/70" />

                  {/* Bottom Card */}
                  <div
                    className="absolute bottom-4 left-4 right-4 rounded-3xl border p-4 backdrop-blur-md"
                    style={{
                      backgroundColor: `${style.bgColor}EE`,
                      borderColor: style.borderColor,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div
                        className="h-14 w-14 rounded-full border flex items-center justify-center text-2xl shrink-0"
                        style={{
                          borderColor: style.borderColor,
                        }}
                      >
                        {style.icon}
                      </div>

                      {/* Content */}
                      <div>
                        <h2 className="font-bold text-2xl">
                          {index + 1}. {level.title}
                        </h2>

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-slate-300 text-sm">
                            Difficulty:
                          </span>

                          <span className="text-yellow-400 text-lg">
                            {"★".repeat(level.difficulty)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
