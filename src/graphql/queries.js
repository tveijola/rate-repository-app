import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      edges {
        node {
          id,
          fullName,
          ratingAverage,
          reviewCount,
          stargazersCount,
          forksCount,
          ownerAvatarUrl,
          description,
          language,
        }
      }
    }
  }
`;

export const GET_AUTHORIZED_USER = gql`
  query GetAuthorizedUser {
    authorizedUser {
      id,
      username,
    }
  }
`;