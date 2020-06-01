import {StyleSheet} from 'react-native';

import colors from '../../theme/colors';

export default StyleSheet.create({
  average: {
    flex: 1,
    color: '#fdd835',
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  container: {
    flex: 1 / 2,
    alignItems: 'center',
    marginVertical: 10,
  },
  favorite: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.light,
    height: 40,
    width: 180,
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
    fontWeight: 'bold',
  },
});
