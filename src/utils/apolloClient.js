import ApolloClient from 'apollo-boost';
import Constants from 'expo-constants';

const baseUrl = Constants.manifest.extra.APOLLO_URI;

const createApolloClient = (authStorage) => {
  return new ApolloClient({
    request: async (operation) => {
      try {
        const accessToken = await authStorage.getAccessToken();
        operation.setContext({
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
    uri: `${baseUrl}/graphql`
  });
};

export default createApolloClient;