import { FlatList, View, Text } from 'react-native';
import { MealItem } from '../MealItem/MealItem';
import { styles } from './styles';

export type Meal = {
  id: string;
  name: string;
  calories: number;
};

interface MealListProps {
  meals: Meal[];
  onMealPress: (id: string) => void;
}

export const MealList = ({ meals, onMealPress }: MealListProps) => (
  <FlatList
    data={meals}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <MealItem meal={item} onPress={() => onMealPress(item.id)} />
    )}
  />
);
