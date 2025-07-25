import { TouchableOpacity, Text } from 'react-native';
import { Meal } from '@/components/MealList/MealList';
import { styles } from './styles';

interface MealItemProps {
  meal: Meal;
  onPress: () => void;
}

export const MealItem = ({ meal, onPress }: MealItemProps) => (
  <TouchableOpacity style={styles.mealItem} onPress={onPress}>
    <Text style={styles.mealName}>{meal.name}</Text>
    <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
  </TouchableOpacity>
);
