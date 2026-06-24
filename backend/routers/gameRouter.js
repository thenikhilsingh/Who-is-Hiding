const Router = require("express");
const {
  getLevels,
  getLevelCharacters,
  checkCharacter,
  startGame,
  completeGame,
  getLeaderboard,
} = require("../controllers/gameController");

const gameRouter = Router();

gameRouter.get("/levels", getLevels);
gameRouter.get("/levels/:levelId/characters", getLevelCharacters);
gameRouter.post("/check", checkCharacter);
gameRouter.post("/start", startGame);
gameRouter.post("/complete", completeGame);
gameRouter.get("/leaderboard/:levelId", getLeaderboard);

module.exports = gameRouter;
