const Level = require("../models/level");
const Character = require("../models/character");

const getLevels = async (req, res) => {
  try {
    const levels = await Level.find();
    res.status(200).json({
      levels,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLevelCharacters = async (req, res) => {
  try {
    const { levelId } = req.params;

    const characters = await Character.find({
      levelId,
    }).populate("levelId", "title image");

    res.status(200).json({
      characters,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const checkCharacter = async (req, res) => {
  try {
    const { characterId, x, y } = req.body;

    const character = await Character.findById(characterId);
    if (!character) {
      return res.status(404).json({
        message: "Character not found",
      });
    }

    const isCorrect =
      x >= character.xMin &&
      x <= character.xMax &&
      y >= character.yMin &&
      y <= character.yMax;

    if (isCorrect) {
      return res.status(200).json({
        found: true,
        message: "Character found!",
      });
    }
    return res.status(200).json({
      found: false,
      message: "Wrong location!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getLevels,
  getLevelCharacters,
  checkCharacter,
};
