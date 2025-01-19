            
// models/Resource.js
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: String, required: true },
  available: { type: Boolean, default: true },
  location: { type: String, required: true },
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
