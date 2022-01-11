const router = require("express").Router();
const { json } = require("express/lib/response");
const Post = require("../models/Post");

// Create a Post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a Post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The Post has been updated");
    } else {
      res.status(403).json("You can Update only your Post !!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a Post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("The Post has been Deleted");
    } else {
      res.status(403).json("You can Delete only your Post !!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Like a Post

// Get Timeline

module.exports = router;
