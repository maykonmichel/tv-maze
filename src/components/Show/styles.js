import {StyleSheet} from 'react-native';

import colors from '../../theme/colors';

export default StyleSheet.create({
  average: {
    backgroundColor: colors.primary.light,
    color: '#fdd835',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  container: {
    flex: 1 / 2,
    alignItems: 'center',
    marginVertical: 10,
  },
  header: {
    backgroundColor: colors.primary.main,
    height: 50,
    width: 180,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  image: {
    width: 180,
    height: 253,
  },
  name: {
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
