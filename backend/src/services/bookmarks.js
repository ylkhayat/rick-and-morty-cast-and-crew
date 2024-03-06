const { User } = require("../datasources/users");
const { authenticate } = require("./authentication");

app.post("/bookmarks", authenticate, async (req, res) => {
  const { bookmark } = req.body;
  const user = await User.findById(req.user.userId);
  if (!user) return res.status(404).send("User not found");

  user.bookmarks.push(bookmark);
  await user.save();
  res.status(201).send(user);
});

app.get("/bookmarks", authenticate, async (req, res) => {
  const user = await User.findById(req.user.userId).populate("bookmarks");
  if (!user) return res.status(404).send("User not found");

  res.status(200).send(user.bookmarks);
});
