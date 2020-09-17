import React from 'react';
import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';
import formatDisplayNumber from '../../utils/formatDispalyNumber';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

      getAllByTestId("repoFullName").forEach((item, index) => {
        expect(item).toHaveTextContent(repositories.edges[index].node.fullName);
      });

      getAllByTestId("repoDescription").forEach((item, index) => {
        expect(item).toHaveTextContent(repositories.edges[index].node.description);
      });

      getAllByTestId("repoLanguage").forEach((item, index) => {
        expect(item).toHaveTextContent(repositories.edges[index].node.language);
      });

      getAllByTestId("repoStars").forEach((item, index) => {
        expect(item).toHaveTextContent(formatDisplayNumber(repositories.edges[index].node.stargazersCount));
      });

      getAllByTestId("repoForks").forEach((item, index) => {
        expect(item).toHaveTextContent(formatDisplayNumber(repositories.edges[index].node.forksCount));
      });

      getAllByTestId("repoRating").forEach((item, index) => {
        expect(item).toHaveTextContent(repositories.edges[index].node.ratingAverage);
      });

      getAllByTestId("repoReviews").forEach((item, index) => {
        expect(item).toHaveTextContent(formatDisplayNumber(repositories.edges[index].node.reviewCount));
      });

    });
  });
});