import { useMutation } from '@apollo/react-hooks';
import { AUTHORIZE } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    return await mutate({ variables: { credentials: { username, password } } });
  };

  return [signIn, result];

};

export default useSignIn;