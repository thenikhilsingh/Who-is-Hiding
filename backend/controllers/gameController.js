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

module.exports = {
  getLevels,
  getLevelCharacters,
};
