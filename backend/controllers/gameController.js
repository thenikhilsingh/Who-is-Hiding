const Level = require("../models/level");
const Character = require("../models/character");
const GameSession = require("../models/gameSession");
const Leaderboard = require("../models/leaderboard");
const { randomUUID } = require("crypto");

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
    const { characterId, x, y, sessionId } = req.body;

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

    if (!isCorrect) {
      return res.status(200).json({
        found: false,
        message: "Wrong location!",
      });
    }

    await GameSession.findOneAndUpdate(
      { sessionId },
      {
        $addToSet: {
          foundCharacters: characterId,
        },
      },
    );

    return res.status(200).json({
      found: true,
      message: "Character found!",
      marker: {
        x: (character.xMin + character.xMax) / 2, //center point of the character
        y: (character.yMin + character.yMax) / 2, // center point of the character
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const startGame = async (req, res) => {
  try {
    const { levelId } = req.body;

    const session = await GameSession.create({
      sessionId: randomUUID(),
      levelId,
    });

    res.status(201).json({
      sessionId: session.sessionId,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const completeGame = async (req, res) => {
  try {
    const { sessionId, playerName } = req.body;

    const session = await GameSession.findOne({
      sessionId,
    });

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    // Already completed?
    if (session.completed) {
      return res.status(400).json({
        message: "Game already completed",
      });
    }

    // Verify all characters were found
    const totalCharacters = await Character.countDocuments({
      levelId: session.levelId,
    });

    if (session.foundCharacters.length !== totalCharacters) {
      return res.status(400).json({
        message: "Game not finished yet",
      });
    }

    const completionTime = Math.floor(
      (Date.now() - session.startTime.getTime()) / 1000,
    );

    await Leaderboard.create({
      playerName,
      levelId: session.levelId,
      completionTime,
    });

    session.completed = true;

    await session.save();

    res.status(200).json({
      success: true,
      completionTime,
      playerName,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const { levelId } = req.params;

    const scores = await Leaderboard.find({
      levelId,
    })
      .sort({
        completionTime: 1,
      })
      .limit(10)
      .populate("levelId", "title");

    res.status(200).json({
      scores,
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
  startGame,
  completeGame,
  getLeaderboard,
};
