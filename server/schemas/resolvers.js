
const { User } = require('../models');
const { signToken} = require("../utils/auth");
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('Not logged in.');
    },
  },

  Mutation: {
    addUser: async (parent, { input }, context) => {
      const user = await User.create(input);
      console.log(user);
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { input }, context) => {
      const { email, password } = input;
      const user = await User.findOne({email});

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

  
  },
};

module.exports = resolvers;
