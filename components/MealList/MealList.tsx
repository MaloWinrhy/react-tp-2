import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Platform, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getMeals } from '@/services/dbService';
import { styles } from './styles';
import { MealItem } from '../MealItem/MealItem';

export type Meal = {
  id: string;
  date: string;
  total_calories: number;
};

interface MealListProps {
  onMealPress: (id: string) => void;
}

export const MealList = ({ onMealPress }: MealListProps) => {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    getMeals().then((data) => setMeals(data as Meal[]));
  }, []);

  if (!meals.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucun repas enregistré.</Text>
      </View>
    );
  }

  return (
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onMealPress(item.id.toString())} activeOpacity={0.8}>
            <MealItem
              label={`Repas du ${new Date(item.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}`}
              calories={`Total : ${item.total_calories.toFixed(0)} kcal`}
              image={'https://cdn-icons-png.flaticon.com/512/1046/1046784.png'}
            />
          </TouchableOpacity>
        )}
      />
  );
};