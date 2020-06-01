import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {ActivityIndicator, FlatList, TextInput} from 'react-native';
import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import empty from '../../assets/lottie/629-empty-box.json';

import Show from '../../components/Show';

import SHOWS from '../../store/gql/query/SHOWS';

const keyExtractor = ({id}) => id.toString();

const Shows = () => {
  const {setOptions} = useNavigation();

  const list = useRef();

  const [q, setQ] = useState('');

  const {data: {shows = []} = {}, fetchMore, loading} = useQuery(SHOWS, {
    variables: {page: 0, q},
  });

  const loadMore = useCallback(
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
          return {
            ...prev,
            shows: [...prev.shows, ...fetchMoreResult.shows],
          };
        },
      }),
    [fetchMore, q, shows.length],
  );

  const ListEmptyComponent = useMemo(
    () =>
      !loading && (
        <LottieView source={empty} style={{width: '100%'}} autoPlay loop />
      ),
    [loading],
  );

  const ListFooterComponent = useMemo(
    () => (!q || loading) && <ActivityIndicator size="large" />,
    [loading, q],
  );

  const renderItem = useCallback(({item}) => <Show {...item} />, []);

  useEffect(() => {
    setOptions({
      headerTitle: () => (
        <TextInput onChangeText={setQ} placeholder="Search shows" />
      ),
    });
  }, [setOptions]);

  useEffect(() => {
    list.current.scrollToOffset({offset: 0});
  }, [q]);

  return (
    <FlatList
      ref={list}
      data={shows}
      extraData={shows}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
      onEndReached={loadMore}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
    />
  );
};

export default memo(Shows);
