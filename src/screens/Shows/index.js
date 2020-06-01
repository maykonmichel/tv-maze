import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {Button, FlatList, TextInput} from 'react-native';
import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';

import Show from '../../components/Show';

import SHOWS from '../../store/gql/query/SHOWS';

const keyExtractor = ({id}) => id.toString();

const Shows = () => {
  const {setOptions} = useNavigation();

  const [q, setQ] = useState('');

  const {data: {shows = []} = {}, fetchMore} = useQuery(SHOWS, {
    variables: {page: 0, q},
  });

  const loadMore = useCallback(
    () =>
      fetchMore({
        variables: {
          page: Math.floor(shows.length / 250) + 1,
        },
        updateQuery: (prev, {fetchMoreResult}) => {
          if (!fetchMoreResult) {
            return prev;
          }
          return {
            ...prev,
            shows: [...prev.shows, ...fetchMoreResult.shows],
          };
        },
      }),
    [fetchMore, shows.length],
  );

  const ListFooterComponent = useMemo(() => {
    return !q && <Button title="Load more" onPress={loadMore} />;
  }, [loadMore, q]);

  const renderItem = useCallback(({item}) => <Show {...item} />, []);

  useEffect(() => {
    setOptions({
      headerTitle: () => (
        <TextInput onChangeText={setQ} placeholder="Search shows" />
      ),
    });
  }, [setOptions]);

  return (
    <FlatList
      data={shows}
      extraData={shows}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
      ListFooterComponent={ListFooterComponent}
    />
  );
};

export default memo(Shows);
