import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {ActivityIndicator, FlatList, TextInput, View} from 'react-native';
import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import empty from '../../assets/lottie/629-empty-box.json';

import Show from '../../components/Show';

import SHOWS from '../../store/gql/query/SHOWS';
import TouchableView from '../../components/TouchableView';
import colors from '../../theme/colors';

import FAVORITES from '../../store/gql/query/FAVORITES';

import styles from './styles';

const keyExtractor = ({id}) => id.toString();

const Shows = () => {
  const {setOptions} = useNavigation();

  const list = useRef();

  const [favorite, setFavorite] = useState(false);
  const [q, setQ] = useState('');

  const {data: {shows = []} = {}, fetchMore, loading} = useQuery(SHOWS, {
    variables: {page: 0, q},
  });

  const {data: {favorites = []} = {}} = useQuery(FAVORITES);

  const data = useMemo(
    () =>
      favorite
        ? favorites.filter((show) =>
            show.name.toUpperCase().includes(q.toUpperCase()),
          )
        : shows,
    [favorite, favorites, q, shows],
  );

  const loadMore = useCallback(
    () =>
      !q &&
      !favorite &&
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
    [favorite, fetchMore, q, shows.length],
  );

  const ListEmptyComponent = useMemo(
    () =>
      !loading && (
        <LottieView source={empty} style={styles.empty} autoPlay loop />
      ),
    [loading],
  );

  const ListFooterComponent = useMemo(
    () => (!q || loading) && !favorite && <ActivityIndicator size="large" />,
    [favorite, loading, q],
  );

  const onToggleFavorite = useCallback(
    () => setFavorite((value) => !value),
    [],
  );

  const renderItem = useCallback(({item}) => <Show {...item} />, []);

  useEffect(() => {
    setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <TextInput
            onChangeText={setQ}
            placeholder="Search shows"
            style={styles.searchBar}
          />
          <View style={styles.favorite}>
            <TouchableView onPress={onToggleFavorite} borderless>
              <Icon
                name={favorite ? 'heart' : 'heart-outline'}
                color={colors.primary.main}
                size={28}
              />
            </TouchableView>
          </View>
        </View>
      ),
    });
  }, [favorite, onToggleFavorite, setOptions]);

  useEffect(() => {
    list.current.scrollToOffset({offset: 0});
  }, [q]);

  return (
    <FlatList
      ref={list}
      data={data}
      extraData={data}
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
