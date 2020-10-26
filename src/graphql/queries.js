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
  query GetAuthorizedUser($includeReviews: Boolean = false, $first: Int, $after: String) {
    authorizedUser {
      id,
      username,
      reviews (first: $first, after: $after) @include(if: $includeReviews) {
        edges {
          node {
            id,
            repository{
              fullName
            },
            repositoryId,
            rating,
            createdAt,
            text
          },
          cursor
        }
        pageInfo {
          hasNextPage,
          totalCount,
          startCursor,
          endCursor
        }
      }
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  query GetSingleRepository($id: ID!, $first: Int, $after: String) {
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
      reviews (first: $first, after: $after) {
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
  }
`;