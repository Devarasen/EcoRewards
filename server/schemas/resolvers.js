const { User, Task, CommunityPost, Comment } = require('../models');
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('Not logged in.');
    },
    getUser: async (_, { id }) => {
      return await User.findById(id);
    },
    getAllTasks: async () => {
      return await Task.find().populate('user');
    },
    getCommunityPosts: async () => {
      return await CommunityPost.find().populate('user').populate('comments');
    }
  },

  Mutation: {
    login: async (_, { input }) => {
      const { email, password } = input;
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with that email address.");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect password.");
      }

      const token = signToken(user);
      return { token, user };
    },

    registerUser: async (_, { username, email, password }) => {
      const newUser = new User({ username, email, password, greencoins: 0 });
      const savedUser = await newUser.save();
      const token = signToken(savedUser);
      return { token, savedUser };
    },

    postTask: async (_, { userId, title, description, proof }) => {
      const user = await User.findById(userId);
      const newTask = new Task({
        title,
        description,
        proof,
        user,
        greencoinsEarned: 0
      });
      return await newTask.save();
    },

    awardGreenCoin: async (_, { taskId, coins }) => {
      const task = await Task.findById(taskId);
      task.greencoinsEarned += coins;
      await task.save();
      return task;
    },

    createCommunityPost: async (_, { userId, content }) => {
      const user = await User.findById(userId);
      const newPost = new CommunityPost({ user, content });
      return await newPost.save();
    },

    createComment: async (_, { postId, userId, content }) => {
      const user = await User.findById(userId);
      const post = await CommunityPost.findById(postId);
      const newComment = new Comment({ user, content });
      await newComment.save();
      post.comments.push(newComment);
      await post.save();
      return newComment;
    }
  }
};

module.exports = resolvers;
