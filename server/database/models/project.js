const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true, maxlength: 120 },
  about_project: String,
  createdAt: {type: Date, default: Date.now},
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Project', projectSchema);
