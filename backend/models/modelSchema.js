const mongoose = require("mongoose");
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  storyIDs: {
    type: [
        {type: Schema.Types.ObjectId, ref: "Story"}
    ],
    required: true,
  }
});

const StorySchema = new mongoose.Schema({
    storyID: {
        type: String,
        required: true
    },
    title: {
        type: [String],
        required: true
    },
    texts: {
        type: [String],
        required: true
    },
    images: {
        type: [String],
        required: true
    }
});

const User = mongoose.model("User", UserSchema);
const Story = mongoose.model("Story", StorySchema);

module.exports = { User, Story };