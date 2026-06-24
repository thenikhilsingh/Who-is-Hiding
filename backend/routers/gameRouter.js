const Router = require("express");
const {
  getLevels,
  getLevelCharacters,
  checkCharacter,
} = require("../controllers/gameController");

const gameRouter = Router();

gameRouter.get("/levels", getLevels);
gameRouter.get("/levels/:levelId/characters", getLevelCharacters);
gameRouter.get("/check", checkCharacter);

module.exports = gameRouter;
