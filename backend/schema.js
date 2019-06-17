const mongoose = require('mongoose');
 
const repoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  tags: {
    type: Array,
    trim: true,
  },
  language: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

// add a text index.
// Note that you can add as many fields as you want,\
// but there can only be a single text index per collection.
// We will add the name and description fields.
repoSchema.index({
  title: 'text',
  description: 'text',
}, {
  weights: {
    name: 5,
    description: 1,
  },
});

const RepoList = mongoose.model('repoList', repoSchema);
 
module.exports = RepoList;
