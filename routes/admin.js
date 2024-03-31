const router = require("express").Router();
const { User } = require("../models/user");

router.get("/reset", async (req, res) => {
  await User.deleteMany();
  const user = new User({
    _id: "admin",
    name: "admin",
    number: "00000",
    email: "amdin@gmail.com",
    password: "admin",
  });
  await user.save();

  res.json({ mssg: "reseted" });
});
router.get("/test", async (req, res) => {
  // const users = await User.find({}).populate([
  //   { path: 'transactions.fromUser', select: 'name email' },
  //   { path: 'directChild', select: 'name number email balance' }
  // ]);
  try {
    const users = await User.find({})
      .populate("transactions.fromUser", "name email")
      .populate("directChild", "name number email balance");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id)
    .populate("transactions.fromUser", "name email")
    .populate("directChild", "name number email balance");
  res.json(user);
});

module.exports = router;
