// PrimaryButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  color?: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

const getColor = (variant?: string) => {
  switch (variant) {
    case 'danger':
      return '#D32F2F';
    case 'secondary':
      return '#FFA000';
    default:
      return '#4CAF50';
  }
};

export const PrimaryButton = ({ label, onPress, style, color = '#4CAF50', variant = 'primary' }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: getColor(variant) }, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});