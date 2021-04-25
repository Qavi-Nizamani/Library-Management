const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//MONGOOSE SPECIFIC
mongoose.connect("mongodb://localhost/posts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const commentSchema = new Schema({
  comment: {
    type: String,
    requried: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "Member" },
});

const Comment = mongoose.model("Comment", commentSchema);

// Comment.insertMany([
//   { comment: "First" },
//   { comment: "2nd" },
//   { comment: "3rd" },
//   { comment: "Forthu" },
// ]);

const memberSchema = new Schema({
  name: String,
  age: Number,
});

const Member = mongoose.model("Member", memberSchema);

// async function writeComment() {
//   const member = new Member({ name: "Qavi", age: 24 });
//   await member.save();
//   const comment = new Comment({ comment: "This is my first own comment..." });
//   comment.user = member;
//   await comment.save();
//   console.log(comment);
// }
// writeComment();

Comment.findOne({ comment: "This is my first own comment..." })
  .populate("user")
  .then((d) => console.log(d));
// async function addComment() {
//   const member = await Member.findOne({ name: "Qavi" });
//   const second = await Comment.findOne({ comment: "2nd" });

//   member.comments.push(second);
//   await member.save();
// }
// addComment();
// Member.findOne({ name: "Qavi" })
//   .populate("comments")
//   .then((d) => console.log(d));
