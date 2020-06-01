import {StyleSheet} from 'react-native';

import colors from '../../theme/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  data: {
    flex: 1 / 2,
    marginRight: 5,
  },
  header: {
    backgroundColor: colors.primary.main,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 30,
  },
  image: {
    width: 180,
    height: 253,
  },
  imageContainer: {
    flex: 1 / 2,
  },
  indicatorStyle: {
    backgroundColor: colors.primary.light,
  },
  materialTopTabNavigator: {
    backgroundColor: colors.secondary.dark,
  },
});
