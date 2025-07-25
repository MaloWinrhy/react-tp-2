import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '@/constants/Colors';
import { TEXTS } from '@/constants/texts';
import { useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { MealList } from '@/components/MealList/MealList';
import TopBar from '@/components/TopBar';

export default function HomeScreen() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <MealList
      onMealPress={(id: string) => router.push(`/meal/${id}`)}
      ListHeaderComponent={
        <View style={styles.content}>
          <TopBar />
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/add')}>
              <Ionicons name="add-circle" size={24} color={Colors.light.tint} />
              <Text style={styles.actionText}>{TEXTS.homeAddMeal}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/add/camera')}>
              <Ionicons name="barcode" size={24} color={Colors.light.tabIconDefault} />
              <Text style={styles.actionText}>{TEXTS.homeScanProduct}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionTitle}>{TEXTS.homeRecentMeals}</Text>
        </View>
      }
      ListFooterComponent={
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>{TEXTS.homeWeeklyTracking}</Text>
          <View style={styles.statCard}>
            <Text style={styles.statText}>{TEXTS.homeDailyAverage}</Text>
          </View>
        </View>
      }
    />
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  content: { padding: 20 },
  headerWrapper: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  hello: { fontSize: 16, color: Colors.light.tabIconDefault },
  username: { fontSize: 22, fontWeight: 'bold', color: Colors.light.text },
  avatarCircle: {
    width: 42,
    height: 42,
    backgroundColor: Colors.light.background,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardPrimary: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  cardTitle: { fontSize: 16, color: Colors.light.tint, fontWeight: '600' },
  cardSub: { fontSize: 18, fontWeight: 'bold', color: Colors.light.text },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.light.text,
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  actionText: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 12,
  },
  statCard: {
    backgroundColor: Colors.light.tabIconDefault,
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
  statText: { fontSize: 16, color: Colors.light.text, fontWeight: '500' },
});