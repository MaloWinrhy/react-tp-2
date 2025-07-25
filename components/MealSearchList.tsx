import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { commonStyles } from './styles';
import mealSearchListStyles from './MealSearchList.styles';

interface Meal {
  label: string;
  image?: string;
}

interface Props {
  meals: Meal[];
  onDelete?: (meal: Meal) => void;
  onDetails?: (meal: Meal) => void;
}

const MealSearchList: React.FC<Props> = ({ meals, onDelete, onDetails }) => {
  const router = useRouter();
  if (!meals.length) {
    return <Text style={commonStyles.placeholder}>Aucun aliment ajouté.</Text>;
  }

  return (
    <FlatList
      data={meals}
      keyExtractor={(item, idx) => item.label + idx}
      renderItem={({ item }) => (
        <View style={mealSearchListStyles.cardModern}>
          <View style={mealSearchListStyles.leftSection}>
            {item.image && (
              <Image source={{ uri: item.image }} style={mealSearchListStyles.mealImageModern} />
            )}
            <Text style={mealSearchListStyles.mealLabelModern}>{item.label}</Text>
          </View>
          <View style={mealSearchListStyles.actions}>
            <TouchableOpacity
              style={mealSearchListStyles.actionBtn}
              onPress={() => (typeof router !== 'undefined' && router && router.push ? router.push(`/meal/${item.label}`) : onDetails?.(item))}
            >
              <Ionicons name="information-circle-outline" size={22} color="#388E3C" />
            </TouchableOpacity>
            <TouchableOpacity
              style={mealSearchListStyles.actionBtn}
              onPress={() => onDelete?.(item)}
            >
              <Ionicons name="trash-outline" size={22} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 16 }}
      style={{ marginTop: 8 }}
    />
  );
};

export default MealSearchList;