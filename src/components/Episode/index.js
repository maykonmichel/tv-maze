import React, {memo, useCallback} from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';

import TouchableView from '../TouchableView';

import styles from './styles';

const Episode = ({id, name, number, show}) => {
  const {navigate} = useNavigation();

  const onPress = useCallback(() => navigate('episode', {id, show}), [
    id,
    navigate,
    show,
  ]);

  return (
    <TouchableView onPress={onPress} style={styles.container}>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.name}>{name}</Text>
    </TouchableView>
  );
};

Episode.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  number: PropTypes.number,
  show: PropTypes.string,
};

Episode.defaultProps = {
  id: -1,
  name: '',
  number: 0,
  show: '',
};

export default memo(Episode);
