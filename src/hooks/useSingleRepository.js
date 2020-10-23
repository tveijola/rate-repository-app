import { useQuery } from '@apollo/react-hooks';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useSingleRepository = (id) => {
  const { data } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { id: id }
  });

  if (!data) return { repository: null };
  return { repository: data.repository };
};

export default useSingleRepository;