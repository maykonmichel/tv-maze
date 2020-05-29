import React, {memo, useCallback, useMemo} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {useQuery} from '@apollo/client';

import Show from '../../components/Show';

import SHOWS from '../../store/gql/query/SHOWS';

const keyExtractor = ({id}) => id.toString();

const Shows = () => {
  const {data: {shows = []} = {}, fetchMore, loading} = useQuery(SHOWS, {
    variables: {page: 0},
  });

  const ListFooterComponent = useMemo(() => {
    if (!loading) return null;
    return <ActivityIndicator />;
  }, [loading]);

  const onEndReached = useCallback(
    () =>
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
    [fetchMore, shows.length],
  );

  const renderItem = useCallback(({item}) => <Show {...item} />, []);

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
