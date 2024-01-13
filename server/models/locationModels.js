const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide location."],
  },
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
