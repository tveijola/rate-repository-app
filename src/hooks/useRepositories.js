import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sortBy) => {

  const args = sortBy === 'latest' || !(sortBy)
    ? { orderBy: 'CREATED_AT' }
    : {
      orderBy: 'RATING_AVERAGE',
      orderDirection: sortBy === 'highrating' ? 'DESC' : 'ASC'
    };

  const { data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: args
  });

  if (!data) return { repositories: null };
  return { repositories: data.repositories };
};

export default useRepositories;