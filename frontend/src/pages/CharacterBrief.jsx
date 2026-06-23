import { useNavigate, useParams } from "react-router-dom";

const levels = {
  1: {
    id: 1,
    title: "Fantasy Island",
    image: "/level1.jpeg",
    characters: [
      {
        id: 1,
        name: "Feeder",
        image: "/level1/Feeder.png",
      },
      {
        id: 2,
        name: "Steve",
        image: "/level1/Steve.png",
      },
      {
        id: 3,
        name: "Chuck Noland",
        image: "/level1/Chuck-Noland.png",
      },
    ],
  },

  2: {
    id: 2,
    title: "Robot City",
    image: "/level2.jpeg",
    characters: [
      {
        id: 1,
        name: "Dr Evil",
        image: "/level2/Dr-Evil.png",
      },
      {
        id: 2,
        name: "Ghost Face",
        image: "/level2/GhostFace.png",
      },
      {
        id: 3,
        name: "EarthWorm Jim",
        image: "/level2/EarthWorm-Jim.png",
      },
    ],
  },

  3: {
    id: 3,
    title: "Cyber Tower",
    image: "/level3.jpeg",
    characters: [
      {
        id: 1,
        name: "Spider Man",
        image: "/level3/Spider-Man.png",
      },
      {
        id: 2,
        name: "Brian",
        image: "/level3/Brian.png",
      },
      {
        id: 3,
        name: "Rabbit",
        image: "/level3/Rabbit.png",
      },
    ],
  },
};

export default function CharacterBrief() {
  const { levelId } = useParams();
  const navigate = useNavigate();

  const level = levels[levelId];

  const startGame = () => {
    navigate(`game/play/${levelId}`);
  };

  return (
    <div className="min-h-screen bg-[url('/BG.png')] bg-cover bg-center text-white">
      <div className="min-h-screen bg-black/50 flex justify-center items-center px-6">
        <div className="max-w-6xl w-full">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-black">{level.title}</h1>

            <p className="text-slate-300 mt-3 text-lg">
              Find all hidden characters before time runs out.
            </p>
          </div>

          {/* Characters */}
          <div className="grid md:grid-cols-3 gap-8">
            {level.characters.map((character) => (
              <div
                key={character.id}
                className="bg-[#082B33]/90 border border-[#0EA5A4] rounded-3xl p-6 text-center"
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-40 h-40 object-contain mx-auto"
                />

                <h2 className="mt-4 text-2xl font-bold">{character.name}</h2>
              </div>
            ))}
          </div>

          {/* Start Button */}
          <div className="flex justify-center mt-12">
            <button
              onClick={startGame}
              className="px-12 py-5 rounded-2xl bg-yellow-400 text-black font-bold text-2xl hover:bg-yellow-300 transition"
            >
              START HUNT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
