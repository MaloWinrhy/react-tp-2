import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mealItem: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealName: { fontSize: 18, fontWeight: '500' },
  mealCalories: { fontSize: 16, color: '#888' },
});
