
import { View, Text, Animated } from 'react-native';
import { toastStyles } from './Toast.styles';
import { useEffect, useRef } from 'react';
import React from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', visible }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const [isFullyHidden, setIsFullyHidden] = React.useState(!visible);

  useEffect(() => {
    if (visible) {
      setIsFullyHidden(false);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setIsFullyHidden(true));
    }
  }, [visible, opacity]);

  if (isFullyHidden) return null;
  return (
    <Animated.View style={[toastStyles.toast, type === 'error' ? toastStyles.error : toastStyles.success, { opacity }]}> 
      <Text style={toastStyles.text}>{message}</Text>
    </Animated.View>
  );
};
