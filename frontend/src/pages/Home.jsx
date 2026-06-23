const levels = [
  {
    id: 1,
    title: "Fantasy Island",
    image: "/level1.jpeg",
    difficulty: 2,
    icon: "🏝️",
    bgColor: "#06282C",
    borderColor: "#14B8A6",
  },
  {
    id: 2,
    title: "Robot City",
    image: "/level2.jpeg",
    difficulty: 4,
    icon: "⚙️",
    bgColor: "#0B2340",
    borderColor: "#3B82F6",
  },
  {
    id: 3,
    title: "Cyber Tower",
    image: "/level3.jpeg",
    difficulty: 5,
    icon: "🏢",
    bgColor: "#241245",
    borderColor: "#A855F7",
  },
];

export default function Home() {
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
            {levels.map((level) => (
              <div
                key={level.id}
                className="relative h-110 rounded-[28px] overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
                style={{
                  backgroundImage: `url(${level.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderColor: level.borderColor,
                }}
              >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/70" />

                {/* Bottom Floating Card */}
                <div
                  className="absolute bottom-4 left-4 right-4 rounded-3xl border p-4 backdrop-blur-md"
                  style={{
                    backgroundColor: `${level.bgColor}EE`,
                    borderColor: level.borderColor,
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                      className="h-14 w-14 rounded-full border flex items-center justify-center text-2xl shrink-0"
                      style={{
                        borderColor: level.borderColor,
                      }}
                    >
                      {level.icon}
                    </div>

                    {/* Content */}
                    <div>
                      <h2 className="font-bold text-2xl">
                        {level.id}. {level.title}
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
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
