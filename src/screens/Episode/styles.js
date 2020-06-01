import {StyleSheet} from 'react-native';

import colors from '../../theme/colors';

export default StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    height: '100%',
  },
  data: {
    backgroundColor: colors.primary.light,
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 24,
  },
  image: {
    width: '100%',
    height: 224,
  },
  name: {
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    backgroundColor: colors.primary.main,
    lineHeight: 40,
  },
  summary: {
    padding: 20,
    fontSize: 16,
  },
});
