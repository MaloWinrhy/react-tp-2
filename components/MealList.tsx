import React from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';
import { commonStyles } from './styles';

interface Meal {
  label: string;
  image?: string;
}

interface Props {
  meals: Meal[];
}

export default function MealList({ meals }: Props) {
  if (!meals.length) {
    return <Text style={commonStyles.placeholder}>Aucun aliment ajouté.</Text>;
  }
  return (
    <FlatList
      data={meals}
      keyExtractor={(item, idx) => item.label + idx}
      renderItem={({ item }) => (
        <View style={styles.mealItem}>
          {item.image && <Image source={{ uri: item.image }} style={styles.mealImage} />}
          <Text style={styles.mealLabel}>{item.label}</Text>
        </View>
      )}
      style={{ marginBottom: 16 }}
    />
  );
}

const styles = StyleSheet.create({
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  mealLabel: {
    fontSize: 16,
  },
});
