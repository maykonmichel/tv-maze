import React from 'react';
import {ApolloProvider} from '@apollo/client';

import {StatusBar} from 'react-native';
import Navigator from './src/navigators';
import useApi from './src/store/useApi';
import colors from './src/theme/colors';

export default () => {
  const api = useApi();

  return (
    api && (
      <ApolloProvider client={api}>
        <StatusBar backgroundColor={colors.primary.dark} />
        <Navigator />
      </ApolloProvider>
    )
  );
};
