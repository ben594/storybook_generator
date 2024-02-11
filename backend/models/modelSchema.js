const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  storyIDs: {
    type: [String],
    required: true,
  },
  vocabListIDs: {
    type: [String],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const VocabListSchema = new mongoose.Schema({
  vocabListID: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  words: {
    type: [String],
    required: true
  }
});

const StorySchema = new mongoose.Schema({
  storyID: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  texts: {
    type: [String],
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  chatHistory: {
    type: [
      {
        role: {
          type: String
        },
        content: {
          type: String
        }
      }
    ]
  },
  vocabList: {
    type: [String],
    required: false,
  }
});

const User = mongoose.model("User", UserSchema);
const Story = mongoose.model("Story", StorySchema);
const VocabList = mongoose.model("VocabList", VocabListSchema);

module.exports = { User, Story, VocabList };