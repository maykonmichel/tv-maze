import React from 'react';
import {ApolloProvider} from '@apollo/client';

import Navigator from './src/navigators';
import useApi from './src/store/useApi';

export default () => {
  const api = useApi();

  return (
    api && (
      <ApolloProvider client={api}>
        <Navigator />
      </ApolloProvider>
    )
  );
};
