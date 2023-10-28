import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      greencoins
    }
  }
`;

export const GET_ALL_TASKS = gql`
  query GetAllTasks {
    getAllTasks {
      id
      title
      description
      user {
        username
      }
      proof
      greencoinsEarned
    }
  }
`;


export const GET_COMMUNITY_POSTS = gql`
  query GetCommunityPosts {
    getCommunityPosts {
      id
      user {
        username
      }
      content
      createdAt
      comments {
        id
        user {
          username
        }
        content
        createdAt
      }
    }
  }
`;
