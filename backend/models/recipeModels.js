const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    title: String,
    ingredients: [String],
    instructions: [String],
    culture: String,
    dietaryNeeds: [String],
    prepTime: Number,
    note: String,
    description: String,
    icon: String,
    tags: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
