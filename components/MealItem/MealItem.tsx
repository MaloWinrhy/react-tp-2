import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

interface MealItemProps {
  label: string;
  calories: string;
  image: string;
}

export function MealItem({ label, calories, image }: MealItemProps) {
  return (
    <View style={styles.mealCard}>
      <Image source={{ uri: image }} style={styles.mealImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.mealLabel}>{label}</Text>
        <Text style={styles.mealCalories}>{calories}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </View>
  );
}
