const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  status: String,
  species: String,
  type: String,
  gender: String,
  origin: {
    name: String,
  },
  location: {
    name: String,
  },
  image: String,
  episode: [
    {
      id: Number,
      name: String,
    },
  ],
});

const Character = mongoose.model("Character", CharacterSchema);

module.exports = Character;
