const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipe_schema = new mongoose.Schema({
  title: String,
  desc: String,
  tags: [String],
  doc: String
})

module.exports = mongoose.model("Recipe", recipe_schema)