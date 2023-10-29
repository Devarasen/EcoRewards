import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      id
      username
      email
    }
  }
`;

// export const GET_ALL_TASKS = gql`
//   query GetAllTasks {
//     getAllTasks {
//       id
//       title
//       description
//       user {
//         username
//       }
//       proof
//       greencoinsEarned
//     }
//   }
// `;


// export const GET_COMMUNITY_POSTS = gql`
//   query GetCommunityPosts {
//     getCommunityPosts {
//       id
//       user {
//         username
//       }
//       content
//       createdAt
//       comments {
//         id
//         user {
//           username
//         }
//         content
//         createdAt
//       }
//     }
//   }
`;
