import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Platform, TouchableOpacity, Image } from 'react-native';
import { getMeals } from '@/services/dbService';
import { MealItem } from '../MealItem/MealItem';
import { useFocusEffect } from '@react-navigation/native';

export type Meal = {
  id: string;
  date: string;
  total_calories: number;
};

export interface MealListProps {
  onMealPress: (id: string) => void;
  ListHeaderComponent?: React.ReactElement;
  ListFooterComponent?: React.ReactElement;
}

export const MealList = ({ onMealPress, ListHeaderComponent, ListFooterComponent }: MealListProps) => {
  const [meals, setMeals] = useState<Meal[]>([]);

  useFocusEffect(() => {
    getMeals().then((data) => setMeals(data as Meal[]));
  });



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
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
    />
  );
};