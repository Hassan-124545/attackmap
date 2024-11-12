const mongoose = require('mongoose');

const attackSchema = new mongoose.Schema({
  title: String,
  severity: String,
  location: {
    lat: Number,
    lng: Number,
  },
  date: Date,
  description: String,
  type: String,
  domain: String,
  resources: [String], // URLs to white papers, podcasts, etc.
  simulationAvailable: Boolean,
});

module.exports = mongoose.model('Attack', attackSchema);