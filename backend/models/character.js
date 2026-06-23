const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    levelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    // Coordinates stored as percentages
    xMin: {
      type: Number,
      required: true,
    },

    xMax: {
      type: Number,
      required: true,
    },

    yMin: {
      type: Number,
      required: true,
    },

    yMax: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Character", characterSchema);
