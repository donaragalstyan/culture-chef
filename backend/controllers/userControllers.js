const User = require("../models/authModels");
const Recipe = require("../models/recipeModels");

exports.getSelfProfileInfoController = async (req, res) => {
    const userId = req.user.id;
    const user = await User.findOne({ userId }, { email: 1, name: 1, public: 1 });
    if (!user) {
        return res.status(401).json({ error: "Cannot retrieve profile information" });
    }
    return res.status(200).json({ user });
};

exports.profileVisibilityController = async (req, res) => {
    const userId = req.user.id;
    const { public } = req.body;
    const updatedUser = await User.findOneAndUpdate({ userId }, { $set: { public: public } }, { new: true });
    if (!updatedUser) {
        return res.status(404).json({ error: "User not found or update failed" });
    }
    return res.status(200).json({ message: "Visibilty updated" });
};

exports.getAllProfilesController = async (req, res) => {
    const userId = req.user.id;
    const users = await User.find({ _id: { $ne: userId } });
    if (users.length === 0) {
        return res.status(401).json({ error: "No profiles found" });
    }
    return res.status(200).json({ users });
};

exports.getOthersProfileInfoController = async (req, res) => {
    const userId = req.user.id;
    const user = await User.findOne({ userId }, { email: 1, name: 1, public: 1 });
    if (!user) {
        return res.status(401).json({ error: "Cannot retrieve profile information" });
    }
    return res.status(200).json({ user });
};

exports.getBookmarkRecipesController = async (req, res) => {
    const userName = req.params.username;
    const user = await User.findOne({ name: userName }, { _id: 1, bookmarks: 1 });
    const bookmarks = await Recipe.find({ _id: { $in: user.bookmarks } });
    if (bookmarks.length === 0 || !user) {
        return res.status(401).json({ error: "Cannot retrieve bookmarks" });
    }
    return res.status(200).json({ bookmarks });
};

exports.getRecipesController = async (req, res) => {
    const userName = req.params.username;
    const user = await User.findOne({ name: userName }, { _id: 1 });
    const recipes = await Recipe.find({ userId: user._id });
    if (recipes.length === 0 || !user) {
        return res.status(401).json({ error: "Cannot retrieve recipes" });
    }
    return res.status(200).json({ recipes });
};

exports.toggleBookmarksController = async (req, res) => {
    const userId = req.user.id;
    const { recipeId } = req.body;

    if (!userId || !recipeId) {
        return res.status(400).json({ error: "Missing userId or recipeId" });
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
    }

    const user = await User.findById(userId);

    const isBookmarked = user.bookmarks.includes(recipeId);

    if (isBookmarked) {
        user.bookmarks = user.bookmarks.filter(id => id.toString() !== recipeId);
        await user.save();
        return res.status(200).json({ message: "Bookmark removed", bookmarked: false });
    } else {
        user.bookmarks.push(recipeId);
        await user.save();
        return res.status(200).json({ message: "Recipe bookmarked", bookmarked: true });
    }
};

exports.isRecipeBookmarkedController = async (req, res) => {
    const userId = req.user.id;
    const { recipeId } = req.params;

    if (!userId || !recipeId) {
        return res.status(400).json({ error: "Missing userId or recipeId" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isBookmarked = user.bookmarks.includes(recipeId);

        return res.status(200).json({ bookmarked: isBookmarked });
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
};