const jwt = require("jsonwebtoken");
const { User } = require("../datasources/users");

app.post("/users", async (req, res) => {
  const { username } = req.body;
  let user = await User.findOne({ username });
  if (!user) {
    user = new User({ username });
    await user.save();
  }
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
    expiresIn: "2 days",
  });
  res.status(200).json({ token });
});

// Middleware to verify token
const authenticate = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const data = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = data;
    next();
  } catch {
    res.status(401).send("Not authorized");
  }
};
