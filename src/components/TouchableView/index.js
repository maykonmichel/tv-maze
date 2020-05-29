import React, {memo} from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

const isAndroid = Platform.OS === 'android';

export const TouchableViewPropTypes = {
  onPress: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onLongPress: PropTypes.func,
  ...ViewPropTypes,
};

export const TouchableViewDefaultProps = {
  onPress: undefined,
  onLongPress: undefined,
};

const TouchableView = ({borderless, children, pressColor, style, ...props}) => {
  const {onPress, onLongPress} = props;

  if (!onPress || onLongPress) {
    return (
      <View style={style} {...props}>
        {children}
      </View>
    );
  }

  if (isAndroid) {
    return (
      <TouchableNativeFeedback
        {...props}
        useForeground={TouchableNativeFeedback.canUseNativeForeground()}
        background={TouchableNativeFeedback.Ripple(pressColor, borderless)}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity style={style} {...props}>
      {children}
    </TouchableOpacity>
  );
};

TouchableView.propTypes = TouchableViewPropTypes;

TouchableView.defaultProps = TouchableViewDefaultProps;

export default memo(TouchableView);
