import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy, 
    $orderDirection: OrderDirection, 
    $searchKeyword: String,
    $first: Int,
    $after: String
  ) {
    repositories(
      orderBy: $orderBy, 
      orderDirection: $orderDirection, 
      searchKeyword: $searchKeyword,
      first: $first,
      after: $after
    ) {
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
        },
        cursor
      },
      pageInfo {
        endCursor,
        startCursor,
        totalCount,
        hasNextPage
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

export const GET_SINGLE_REPOSITORY = gql`
  query GetSingleRepository($id: ID!) {
    repository(id: $id) {
      id,
      fullName,
      ratingAverage,
      reviewCount,
      stargazersCount,
      forksCount,
      ownerAvatarUrl,
      description,
      language,
      url,
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;