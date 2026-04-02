const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: Number, required: true }, // percentage
    category: { type: String }, // e.g., Frontend, Backend, etc.
});

module.exports = mongoose.model('Skill', SkillSchema);
