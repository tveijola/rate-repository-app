import { useApolloClient } from '@apollo/react-hooks';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useHistory } from 'react-router-native';

const useSignOut = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const history = useHistory();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push("/");
  };

  return signOut;

};

export default useSignOut;