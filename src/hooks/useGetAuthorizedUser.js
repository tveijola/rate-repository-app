import { useQuery } from '@apollo/react-hooks';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useGetAuthorizedUser = (variables) => {

  const { data, loading, fetchMore, refetch, ...result } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_AUTHORIZED_USER,
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          authorizedUser: {
            ...fetchMoreResult.authorizedUser,
            reviews: {
              ...fetchMoreResult.authorizedUser.reviews,
              edges: [
                ...previousResult.authorizedUser.reviews.edges,
                ...fetchMoreResult.authorizedUser.reviews.edges,
              ],
            },
          },
        };
        return nextResult;
      }
    });
  };

  return {
    authorizedUser: data ? data.authorizedUser : undefined,
    fetchMore: handleFetchMore,
    loading,
    refetch,
    ...result
  };

};

export default useGetAuthorizedUser;