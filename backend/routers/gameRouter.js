const Router = require("express");
const {
  getLevels,
  getLevelCharacters,
} = require("../controllers/gameController");

const gameRouter = Router();

gameRouter.get("/levels", getLevels);
gameRouter.get("/levels/:levelId/characters", getLevelCharacters);

module.exports = gameRouter;
