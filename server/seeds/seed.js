const fs = require("fs");
const db = require("../config/connection");
const cleanDB = require("./cleanDB");
const { User, Task, CommunityPost, Comment } = require("../models");

const userData = JSON.parse(fs.readFileSync("./seeds/userseed.json", "utf8"));
const communityPostData = JSON.parse(
  fs.readFileSync("./seeds/communityPostseed.json", "utf8")
);
const commentData = JSON.parse(
  fs.readFileSync("./seeds/commentseed.json", "utf8")
);

const seedDatabase = async () => {
  // Cleaning the DB
  await cleanDB("User", "users"); // Assuming your user collection is named "users"
  await cleanDB("Task", "tasks");
  await cleanDB("CommunityPost", "communityposts");
  await cleanDB("Comment", "comments");

  // Seeding the DB
  await User.insertMany(userData);
  // await CommunityPost.insertMany(communityPostData);
  // await Comment.insertMany(commentData);
};

db.once("open", async () => {
  try {
    await seedDatabase();

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
