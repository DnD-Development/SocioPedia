const router = require("express").Router();
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { rawListeners } = require("../models/User");
const User = require("../models/User");

router.get("/", (req, res) => {
  res.send("User Router");
});

//  UPDATE USER
router.put("/:id", async (req, res) => {
  if (req.body.userId == req.params.id || req.body.isAdmin) {
    // Password Encryption
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    // Actual Updation
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been UPDATED !!!");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account !!!");
  }
});

// DELETE USER

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("You Successfully DELETED User !!!");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can DELETE only your account !!!");
  }
});

// GET USER
router.get("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findById(req.params.id);
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// FOLLOW USER

// UNFOLLOW USER

module.exports = router;
