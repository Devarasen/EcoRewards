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
    login(input: LoginInput!): Auth
    addUser(input: UserInput!): Auth
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

type Auth {
  token: ID!
  user: User
}
`;

module.exports = typeDefs;
