import React, {memo, useCallback} from 'react';
import {Image, Text} from 'react-native';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';

import TouchableView from '../TouchableView';

import styles from './styles';

const Show = ({id, image, name, rating: {average}}) => {
  const {navigate} = useNavigation();

  const onPress = useCallback(() => navigate('show', {id}), [id, navigate]);

  return (
    <TouchableView onPress={onPress} style={styles.container}>
      <Image source={{uri: image?.medium}} style={styles.image} />
      <Text>{name}</Text>
      <Text>{average || '-'}</Text>
    </TouchableView>
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
