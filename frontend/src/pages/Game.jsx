import { ArrowLeft, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";

// const levels = {
//   1: {
//     title: "Fantasy Island",
//     image: "/level1/level1.jpeg",
//     characters: [
//       {
//         id: 1,
//         name: "Feeder",
//         image: "/level1/Feeder.png",
//       },
//       {
//         id: 2,
//         name: "Steve",
//         image: "/level1/Steve.png",
//       },
//       {
//         id: 3,
//         name: "Chuck Noland",
//         image: "/level1/Chuck-Noland.png",
//       },
//     ],
//   },

//   2: {
//     title: "Robot City",
//     image: "/level2/level2.jpeg",
//     characters: [
//       {
//         id: 1,
//         name: "Dr Evil",
//         image: "/level2/Dr-Evil.png",
//       },
//       {
//         id: 2,
//         name: "Ghost Face",
//         image: "/level2/GhostFace.png",
//       },
//       {
//         id: 3,
//         name: "EarthWorm Jim",
//         image: "/level2/EarthWorm-Jim.png",
//       },
//     ],
//   },

//   3: {
//     title: "Cyber Tower",
//     image: "/level3/level3.jpeg",
//     characters: [
//       {
//         id: 1,
//         name: "Spider Man",
//         image: "/level3/Spider-Man.png",
//       },
//       {
//         id: 2,
//         name: "Brian",
//         image: "/level3/Brian.png",
//       },
//       {
//         id: 3,
//         name: "Rabbit",
//         image: "/level3/Rabbit.png",
//       },
//     ],
//   },
// };

export default function Game() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const api = useAxios();

  // const level = levels[levelId];
  const [level, setLevel] = useState(null);
  const [characters, setCharacters] = useState([]);
  const getLevelData = async () => {
    try {
      const response = await api.get(`/api/game/levels/${levelId}/characters`);

      setCharacters(response.data.characters);

      setLevel(response.data.characters[0]?.levelId);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLevelData();
  }, [levelId]);

  const [clickPosition, setClickPosition] = useState(null);
  const handleImageClick = (e) => {
    // console.log(e); //Browser ek event object deta hai.
    // console.log(e.clientX); // Browser window ke left se itna px door click hua
    // console.log(e.clientY); //Browser window ke  top se itna px niche click hua
    const ImgDimensions = e.currentTarget.getBoundingClientRect();
    //ImgDimensions output:-
    // {
    //  left:100, //Image browser ke px se start ho rahi hai
    //  top:50, //Image browser ke px top se start ho rahi hai
    //  width:1200, //Image browser ke
    //  height:700 //Image browser ke
    // }
    // console.log(ImgDimensions);
    const relativeX = e.clientX - ImgDimensions.left; //Image ke left se px par click hua
    const relativeY = e.clientY - ImgDimensions.top; //Image ke top se px par click hua

    //Abhi Bhi Problem Hai Maan lo meri screen: 1920px  aur Tumhari screen:1366px hai to 550px dono screens par same position nahi hogi. Game logic break jayega.
    // Solution → Percentage
    const x = (relativeX / ImgDimensions.width) * 100;
    const y = (relativeY / ImgDimensions.height) * 100;
    // console.log(x, y);
    setClickPosition({
      x,
      y,
    });
  };

  if (!level) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-3xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/BG.png')] bg-cover bg-center text-white">
      <div className="min-h-screen bg-black/50 p-6">
        {/* Top Bar */}
        <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-2)}
            className="flex items-center gap-2 bg-slate-900/70 px-4 py-2 rounded-xl border border-slate-700"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <img src="/logo.png" alt="" className="h-20 object-contain" />

          <div className="flex items-center gap-2 bg-slate-900/70 px-4 py-2 rounded-xl border border-slate-700">
            <Clock size={18} />
            <span>00:00</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Main Image */}
          <div className="relative bg-slate-900/70 border border-slate-700 rounded-3xl p-4">
            <h2 className="text-3xl font-bold mb-4">{level.title}</h2>

            <img
              src={level.image}
              alt={level.title}
              className="w-full rounded-2xl"
              onClick={handleImageClick}
            />
            {clickPosition && (
              <div
                className="absolute w-60 bg-[#071124] border border-cyan-500 rounded-2xl overflow-hidden shadow-2xl z-50"
                style={{
                  left: `${clickPosition.x}%`,
                  top: `${clickPosition.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="px-4 py-3 border-b border-slate-700 font-bold text-cyan-400">
                  Who did you find?
                </div>

                {characters.map((character) => (
                  <button
                    key={character._id}
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-800 transition"
                    onClick={() => {
                      console.log(character.name);
                      setClickPosition(null);
                    }}
                  >
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-12 h-12 object-contain"
                    />

                    <span>{character.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Character Panel */}
          <div className="bg-slate-900/70 border border-slate-700 rounded-3xl p-5 h-fit">
            <h2 className="text-2xl font-bold mb-4">Characters To Find</h2>

            <div className="space-y-4">
              {characters.map((character) => (
                <div
                  key={character._id}
                  className="flex items-center gap-3 bg-slate-800/70 rounded-2xl p-3"
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-16 h-16 object-contain"
                  />

                  <div>
                    <h3 className="font-semibold">{character.name}</h3>

                    <p className="text-sm text-yellow-400">Not Found</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-slate-800 rounded-2xl p-4 text-center">
              <p className="text-slate-300">Progress</p>

              <h3 className="text-3xl font-bold">0 / {characters.length}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
