import { useMutation } from '@apollo/react-hooks';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (variables) => {
    const { data } = await mutate({ variables });
    console.log(data);
    return { result: data.deleteReview };
  };

  return [deleteReview, result];
};

export default useDeleteReview;