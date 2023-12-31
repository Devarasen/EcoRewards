import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      _id
      content
      timestamp
      author {
        username
        _id
        profile {
          image
        }
      }
      comments {
        content
        author {
          username
        }
        timestamp
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile($id: ID!) {
    getUserProfile(userId: $id) {
      _id
      username
      email
      profile {
        name
        bio
        image
      }
      posts {
        _id
        content
        timestamp
        comments {
          _id
          content
          timestamp
        }
        donations {
          _id
          amount
          timestamp
        }
      }
      donationsReceived {
        _id
        donor {
          username
        }
        amount
        timestamp
      }
      greenCoins
    }
  }
`;

export const GET_SINGLE_USER_POST = gql`
  query GetUserPosts($userId: ID!) {
    getUserPosts(userId: $userId) {
      _id
      content
      timestamp
      author {
        _id
        username
      }
      comments {
        _id
        content
        timestamp
        author {
          _id
          username
        }
      }
      donations {
        _id
        amount
        timestamp
        donor {
          _id
          username
        }
        receiver {
          _id
          username
        }
      }
    }
  }
`;
