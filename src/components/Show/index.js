import React, {memo, useCallback} from 'react';
import {Image, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import noImgPortraitText from '../../assets/images/no-img-portrait-text.png';

import TouchableView from '../TouchableView';

import styles from './styles';

const Show = ({id, image, name, rating: {average}}) => {
  const {navigate} = useNavigation();

  const onPress = useCallback(() => navigate('show', {id}), [id, navigate]);

  return (
    <View style={styles.container}>
      <TouchableView onPress={onPress}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
        </View>
        <Image
          source={image ? {uri: image.medium} : noImgPortraitText}
          style={styles.image}
        />
        <Text style={styles.average}>
          <Icon name="star" color="#fdd835" size={14} />
          {average || '-'}
        </Text>
      </TouchableView>
    </View>
  );
};

Show.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  image: PropTypes.shape({medium: PropTypes.string}),
  rating: PropTypes.shape({average: PropTypes.number}),
};

Show.defaultProps = {
  id: -1,
  name: '',
  image: {medium: ''},
  rating: {average: null},
};

export default memo(Show);
