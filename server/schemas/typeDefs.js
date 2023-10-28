const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    greencoins: Int!
    token: String
}

type Task {
    id: ID!
    title: String!
    description: String!
    user: User!
    proof: String
    greencoinsEarned: Int!
}

type CommunityPost {
    id: ID!
    user: User!
    content: String!
    createdAt: String!
    comments: [Comment!]!
}

type Comment {
    id: ID!
    user: User!
    content: String!
    createdAt: String!
}

type Query {
    me: User
    getUser(id: ID!): User
    getAllTasks: [Task!]!
    getCommunityPosts: [CommunityPost!]!
}

type Mutation {
    addUser(input: UserInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    registerUser(username: String!, email: String!, password: String!): AuthPayload!
    postTask(userId: ID!, title: String!, description: String!, proof: String): Task!
    awardGreenCoin(taskId: ID!, coins: Int!): Task!
    createCommunityPost(userId: ID!, content: String!): CommunityPost!
    createComment(postId: ID!, userId: ID!, content: String!): Comment!
}

input UserInput {
  username: String!
  email: String!
  password: String!
}

input LoginInput {
  email: String!
  password: String!
}

type AuthPayload {
  token: String!
  user: User!
}
`;

module.exports = typeDefs;
