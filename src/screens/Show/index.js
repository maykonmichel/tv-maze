import React, {memo, useCallback} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {useQuery} from '@apollo/client';
import {useRoute} from '@react-navigation/native';

import TouchableView from '../../components/TouchableView';
import SHOW from '../../store/gql/query/SHOW';

import styles from './styles';

const keyExtractor = ({id}) => id.toString();

const Show = () => {
  const {
    params: {id},
  } = useRoute();

  const {
    data: {episodes = [], show: {name, image: {medium: uri} = {}} = {}} = {},
  } = useQuery(SHOW, {
    variables: {id},
  });

  const onPress = useCallback(() => {}, []);

  const renderItem = useCallback(
    ({item}) => (
      <TouchableView onPress={onPress}>
        <Text>{`${item.number} - ${item.name}`}</Text>
      </TouchableView>
    ),
    [onPress],
  );

  return (
    <View>
      <Image source={{uri}} style={styles.image} />
      <Text>{name}</Text>
      <FlatList
        data={episodes}
        extraData={episodes}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default memo(Show);