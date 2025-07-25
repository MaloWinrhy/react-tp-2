import React from 'react';
import { FlatList, View, Text, Image } from 'react-native';
import mealSearchListStyles from './MealSearchList.styles';
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
        <View style={mealSearchListStyles.card}>
          {item.image && (
            <Image source={{ uri: item.image }} style={mealSearchListStyles.mealImage} />
          )}
          <Text style={mealSearchListStyles.mealLabel}>{item.label}</Text>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 16 }}
      style={{ marginTop: 8 }}
    />
  );
}

// styles déplacés dans MealSearchList.styles.ts