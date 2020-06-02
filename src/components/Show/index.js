import React, {memo, useCallback} from 'react';
import {Image, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMutation} from '@apollo/client';

import noImgPortraitText from '../../assets/images/no-img-portrait-text.png';
import TOGGLE_FAVORITE from '../../store/gql/mutation/TOGGLE_FAVORITE';

import TouchableView from '../TouchableView';

import styles from './styles';

const Show = ({favorite, id, image, name, rating: {average}}) => {
  const {navigate} = useNavigation();

  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE);

  const onPress = useCallback(() => navigate('show', {id}), [id, navigate]);

  const onToggleFavorite = useCallback(
    () => toggleFavorite({variables: {id}}),
    [id, toggleFavorite],
  );

  return (
    <View style={styles.container}>
      <TouchableView onPress={onPress}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
        </View>
        <Image
          source={
            image
              ? {uri: image.medium.replace('http', 'https')}
              : noImgPortraitText
          }
          style={styles.image}
        />
      </TouchableView>
      <View style={styles.footer}>
        <View style={styles.favorite}>
          <TouchableView onPress={onToggleFavorite} borderless>
            <Icon
              name={favorite ? 'heart' : 'heart-outline'}
              color="#fff"
              size={22}
            />
          </TouchableView>
        </View>
        <Text style={styles.average}>
          <Icon name="star" color="#fdd835" size={14} />
          {average || '-'}
        </Text>
      </View>
    </View>
  );
};

Show.propTypes = {
  favorite: PropTypes.bool,
  id: PropTypes.number,
  image: PropTypes.shape({medium: PropTypes.string}),
  name: PropTypes.string,
  rating: PropTypes.shape({average: PropTypes.number}),
};

Show.defaultProps = {
  favorite: false,
  id: -1,
  image: {medium: ''},
  name: '',
  rating: {average: null},
};

export default memo(Show);
