import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";

export default function CharacterBrief() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const api = useAxios();

  const [characters, setCharacters] = useState([]);
  const [level, setLevel] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCharacters = async () => {
    try {
      const response = await api.get(`/api/game/levels/${levelId}/characters`);

      setCharacters(response.data.characters);

      // Populate se level details aa rahi hain
      setLevel(response.data.characters[0]?.levelId);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCharacters();
  }, [levelId]);

  const startGame = () => {
    navigate(`/game/play/${levelId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[url('/BG.png')] bg-cover bg-center flex justify-center items-center text-white text-3xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/BG.png')] bg-cover bg-center text-white">
      <div className="min-h-screen bg-black/50 flex justify-center items-center px-6">
        <div className="max-w-6xl w-full">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-black">{level?.title}</h1>

            <p className="text-slate-300 mt-3 text-lg">
              Find all hidden characters before time runs out.
            </p>
          </div>

          {/* Characters */}
          <div className="grid md:grid-cols-3 gap-8">
            {characters.map((character) => (
              <div
                key={character._id}
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
              className="px-12 py-5 rounded-2xl bg-yellow-400 text-black font-bold text-2xl hover:bg-yellow-300 transition cursor-pointer"
            >
              START HUNT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
