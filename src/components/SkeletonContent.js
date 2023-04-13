import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const SkeletonContent = ({
  isLoading,
  layout,
  animationType,
  boneColor,
  highlightColor,
  duration,
  easing,
  children,
  containerStyle,
}) => {
  const [contentLoaded, setContentLoaded] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading) {
      setContentLoaded(false);
      startAnimation();
    } else {
      setContentLoaded(true);
    }
  }, [isLoading]);

  const startAnimation = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      easing,
      useNativeDriver: true,
    }).start(() => {
      setContentLoaded(true);
    });
  };

  const getBoneStyles = (boneLayout) => {
    const { width, height, borderRadius, margin } = boneLayout;
    return {
      width,
      height,
      borderRadius,
      margin,
      backgroundColor: boneColor,
    };
  };

  const getHighlightStyles = (boneLayout) => {
    const { width, height, borderRadius, margin } = boneLayout;
    return {
      width,
      height,
      borderRadius,
      margin,
      backgroundColor: highlightColor,
      position: 'absolute',
      opacity: animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 0],
      }),
    };
  };

  const renderSkeletonContent = () => {
    const bones = layout.map((boneLayout, index) => {
      const boneStyle = getBoneStyles(boneLayout);
      const highlightStyle = getHighlightStyles(boneLayout);
      return (
        <View key={index}>
          <Animated.View style={[styles.bone, boneStyle]} />
          <Animated.View style={[styles.highlight, highlightStyle]} />
        </View>
      );
    });

    return (
      <View style={[styles.container, containerStyle]}>
        {bones}
      </View>
    );
  };

  const renderContent = () => {
    if (contentLoaded) {
      return children;
    } else {
      return renderSkeletonContent();
    }
  };

  return renderContent();
};

SkeletonContent.defaultProps = {
  isLoading: true,
  layout: [],
  animationType: 'none',
  boneColor: '#E1E9EE',
  highlightColor: '#F2F8FC',
  duration: 1200,
  easing: undefined,
  children: null,
  containerStyle: null,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bone: {
    backgroundColor: '#E1E9EE',
  },
  highlight: {
    backgroundColor: '#F2F8FC',
    position: 'absolute',
  },
});

export default SkeletonContent;
