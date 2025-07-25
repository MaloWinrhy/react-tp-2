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
        <View style={styles.card}>
          {item.image && (
            <Image source={{ uri: item.image }} style={styles.mealImage} />
          )}
          <Text style={styles.mealLabel}>{item.label}</Text>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 16 }}
      style={{ marginTop: 8 }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  mealImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#EEE',
  },
  mealLabel: {
    fontSize: 16,
    color: '#111',
    fontWeight: '500',
  },
});