import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useUser, SignedIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import TopBar from '@/components/TopBar';
import { SignOutButton } from '@/components/buttons/SignOutButton';

export default function ProfileScreen() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TopBar showBack title="Mon profil" />

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={42} color="#388E3C" />
        </View>
        <Text style={styles.name}>{user?.username ?? 'Utilisateur'}</Text>
        <Text style={styles.email}>{user?.primaryEmailAddress?.emailAddress ?? 'Adresse e-mail non disponible'}</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.item} onPress={() => router.push('/profile/settings')}>
          <Ionicons name="settings" size={20} color="#4CAF50" />
          <Text style={styles.itemText}>Paramètres</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => router.push('/profile/stats')}>
          <MaterialIcons name="bar-chart" size={20} color="#4CAF50" />
          <Text style={styles.itemText}>Mes statistiques</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => router.push('/profile/preferences')}>
          <Ionicons name="color-palette" size={20} color="#4CAF50" />
          <Text style={styles.itemText}>Apparence</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 24 }}>
        <SignOutButton />
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  content: { padding: 20 },
  profileCard: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 72,
    height: 72,
    backgroundColor: '#E8F5E9',
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
  },
  email: {
    fontSize: 14,
    color: '#777',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    gap: 12,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});