const mongoose = require('mongoose');

const runSchema = new mongoose.Schema({
  designName: { type: String },
  runName: { type: String },
  directory: { type: String },
  // Add other fields as needed
});

module.exports = mongoose.model('Run', runSchema);
