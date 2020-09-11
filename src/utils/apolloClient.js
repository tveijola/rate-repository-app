import ApolloClient from 'apollo-boost';
import Constants from 'expo-constants';

const baseUrl = Constants.manifest.extra.APOLLO_URI;

const createApolloClient = () => {
  console.log(`Creating apollo client with uri: ${baseUrl}/graphql`);
  return new ApolloClient({
    uri: `${baseUrl}/graphql`
  });
};

export default createApolloClient;