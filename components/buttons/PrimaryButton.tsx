import React from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import primaryButtonStyles from './PrimaryButton.styles';

interface Props {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const PrimaryButton = ({ label, onPress, style, variant = 'primary' }: Props) => {
  const getColor = (variant?: string) => {
    switch (variant) {
      case 'secondary':
        return '#FFA500';
      case 'danger':
        return '#FF3B30';
      default:
        return '#34C759';
    }
  };
  return (
    <TouchableOpacity style={[primaryButtonStyles.button, { backgroundColor: getColor(variant) }, style]} onPress={onPress} activeOpacity={0.8}>
      <Text style={primaryButtonStyles.label}>{label}</Text>
    </TouchableOpacity>
  );
};