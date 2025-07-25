import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

interface Props {
  label: string;
  onPress: () => void;
}

export const MealSearchItem = ({ label, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});