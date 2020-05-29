import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, FlatList, TextInput, View} from 'react-native';
import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';

import Show from '../../components/Show';

import SHOWS from '../../store/gql/query/SHOWS';
import SEARCH from '../../store/gql/query/SEARCH';

const keyExtractor = ({id}) => id.toString();

const Shows = () => {
  const {setOptions} = useNavigation();

  const [q, setQ] = useState('');

  const {data: {shows = []} = {}, fetchMore, loading} = useQuery(SHOWS, {
    variables: {page: 0},
  });

  const ListFooterComponent = useMemo(() => {
    if (!loading) return null;
    return <ActivityIndicator />;
  }, [loading]);

  const onEndReached = useCallback(
    () =>
      !q &&
      fetchMore({
        variables: {
          page: Math.floor(shows.length / 250) + 1,
        },
        updateQuery: (prev, {fetchMoreResult}) => {
          if (!fetchMoreResult) {
            return prev;
          }
          return {...prev, shows: [...prev.shows, ...fetchMoreResult.shows]};
        },
      }),
    [fetchMore, q, shows.length],
  );

  const renderItem = useCallback(({item}) => <Show {...item} />, []);

  useEffect(() => {
    setOptions({
      headerTitle: () => <TextInput onChangeText={setQ} />,
    });
  }, [setOptions]);

  useEffect(() => {
    const timout = setTimeout(
      () =>
        fetchMore({
          query: q ? SEARCH : SHOWS,
          variables: q ? {q} : {page: 0},
          updateQuery: (prev, {fetchMoreResult}) => ({
            shows:
              fetchMoreResult.shows ||
              fetchMoreResult.search.map(({show}) => show),
          }),
        }),
      500,
    );
    return () => clearTimeout(timout);
  }, [fetchMore, q]);

  return (
    <View>
      <FlatList
        data={shows}
        extraData={shows}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
};

export default memo(Shows);
