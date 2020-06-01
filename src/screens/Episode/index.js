import React, {memo} from 'react';
import {Image, Text, View} from 'react-native';
import {useQuery} from '@apollo/client';
import {useRoute} from '@react-navigation/native';

import EPISODE from '../../store/gql/query/EPISODE';

import styles from './styles';
import noImgLandscapeText from '../../assets/images/no-img-landscape-text.png';

const Episode = () => {
  const {
    params: {id, show},
  } = useRoute();

  const {
    data: {episode: {name, number, season, summary, image} = {}} = {},
  } = useQuery(EPISODE, {
    variables: {id},
  });

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={
            image
              ? {uri: image.medium.replace('http', 'https')}
              : noImgLandscapeText
          }
          style={styles.image}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.summary}>{summary}</Text>
      </View>
      <Text style={styles.data}>
        {`${show}: Season ${season} - Episode ${number}`}
      </Text>
    </View>
  );
};

export default memo(Episode);
