import {ApolloClient, InMemoryCache} from '@apollo/client';
import {RestLink} from 'apollo-link-rest';
import env from 'react-native-config';

import resolvers from './resolvers';

export const cache = new InMemoryCache();

const link = new RestLink({
  uri: env.API_URI,
});

export default new ApolloClient({
  cache,
  link,
  resolvers,
});
