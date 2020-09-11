import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useContext } from 'react';
import { AUTHORIZE } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useHistory } from 'react-router-native';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation(AUTHORIZE);
  const apolloClient = useApolloClient();
  const history = useHistory();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { credentials: { username, password } } });
    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
    history.push("/");
    return { data };
  };

  return [signIn, result];

};

export default useSignIn;