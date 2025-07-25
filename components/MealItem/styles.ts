import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    gap: 12,
    marginBottom: 10,
  },
  mealImage: { width: 48, height: 48, borderRadius: 8 },
  mealLabel: { fontSize: 16, fontWeight: '500', color: '#111' },
  mealCalories: { fontSize: 14, color: '#777' },
});
