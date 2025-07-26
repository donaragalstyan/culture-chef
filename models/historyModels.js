const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    action: {
      type: String,
      enum: ["clicked", "searched", "cooked"],
      required: true,
    },
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      // optional, because a search query is stored, not a recipeID
      required: false,
    },
    query: {
      type: String,
      // explained above, used for searched only
      required: false,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }
);

module.exports = mongoose.model("History", historySchema);
