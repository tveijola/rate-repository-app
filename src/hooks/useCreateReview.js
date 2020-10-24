import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useHistory } from 'react-router-native';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    const { data } = await mutate({ variables: { review: { repositoryName, ownerName, rating: parseInt(rating), text } } });
    history.push(`/${data.createReview.repositoryId}`);
    return { data };
  };

  return [createReview, result];
};

export default useCreateReview;