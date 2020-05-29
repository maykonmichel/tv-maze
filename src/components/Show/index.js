import React, {memo} from 'react';
import {Image, Text, View} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const Show = ({name, image: {medium: uri}, rating: {average}}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri}} style={styles.image} />
      <Text>{name}</Text>
      <Text>{average || '-'}</Text>
    </View>
  );
};

Show.propTypes = {
  name: PropTypes.string,
  image: PropTypes.shape({medium: PropTypes.string}),
  rating: PropTypes.shape({average: PropTypes.number}),
};

Show.defaultProps = {
  name: '',
  image: {medium: ''},
  rating: {average: null},
};

export default memo(Show);
