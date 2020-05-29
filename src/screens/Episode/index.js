import React, {memo} from 'react';
import {Image, Text, View} from 'react-native';
import {useQuery} from '@apollo/client';
import {useRoute} from '@react-navigation/native';

import EPISODE from '../../store/gql/query/EPISODE';

import styles from './styles';

const Episode = () => {
  const {
    params: {id},
  } = useRoute();

  const {
    data: {episode: {name, number, season, summary, image} = {}} = {},
  } = useQuery(EPISODE, {
    variables: {id},
  });

  return (
    <View>
      <Image source={{uri: image?.medium}} style={styles.image} />
      <Text>{name}</Text>
      <Text>{number}</Text>
      <Text>{season}</Text>
      <Text>{summary}</Text>
    </View>
  );
};

export default memo(Episode);
