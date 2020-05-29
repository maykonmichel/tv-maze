import React, {memo, useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {useQuery} from '@apollo/client';

import Show from '../../components/Show';

import SHOWS from '../../store/gql/query/SHOWS';

const keyExtractor = ({id}) => id.toString();

const Shows = () => {
  const {data: {shows = []} = {}} = useQuery(SHOWS, {variables: {page: 1}});

  const renderItem = useCallback(({item}) => <Show {...item} />, []);

  return (
    <View>
      <FlatList
        data={shows}
        extraData={shows}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
      />
    </View>
  );
};

export default memo(Shows);
