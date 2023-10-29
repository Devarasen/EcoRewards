import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        username
      }
    }
  }
`;



// export const POST_TASK = gql`
//   mutation PostTask($userId: ID!, $title: String!, $description: String!, $proof: String) {
//     postTask(userId: $userId, title: $title, description: $description, proof: $proof) {
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

// export const AWARD_GREENCOIN = gql`
//   mutation AwardGreenCoin($taskId: ID!, $coins: Int!) {
//     awardGreenCoin(taskId: $taskId, coins: $coins) {
//       id
//       greencoinsEarned
//     }
//   }
// `;

// export const CREATE_COMMUNITY_POST = gql`
//   mutation CreateCommunityPost($userId: ID!, $content: String!) {
//     createCommunityPost(userId: $userId, content: $content) {
//       id
//       user {
//         username
//       }
//       content
//       createdAt
//     }
//   }
// `;

// export const CREATE_COMMENT = gql`
//   mutation CreateComment($postId: ID!, $userId: ID!, $content: String!) {
//     createComment(postId: $postId, userId: $userId, content: $content) {
//       id
//       user {
//         username
//       }
//       content
//       createdAt
//     }
//   }
// `;

// export const LOGIN_USER = gql`
//   mutation Login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//       user {
//         id
//         username
//         email
//         greencoins
//       }
//     }
//   }
// `;