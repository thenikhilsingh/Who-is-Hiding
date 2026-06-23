const mongoose = require("mongoose");

const gameSessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },

    levelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
      required: true,
    },

    startTime: {
      type: Date,
      default: Date.now,
    },

    foundCharacters: [
      {
        type: String,
      },
    ],

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("GameSession", gameSessionSchema);
