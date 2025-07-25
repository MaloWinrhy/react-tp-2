import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface TopBarProps {
  showBack?: boolean;
  title?: string;
}

export default function TopBar({ showBack = false, title }: TopBarProps) {
  const router = useRouter();
  const { user } = useUser();

  return (
    <View style={styles.headerWrapper}>
      {showBack ? (
        <>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#388E3C" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>{title}</Text>
          <View style={{ width: 42 }} /> {/* pour équilibrer visuellement */}
        </>
      ) : (
        <>
          <View>
            <Text style={styles.hello}>Bonjour</Text>
            <Text style={styles.username}>{user?.username ?? 'Utilisateur'}</Text>
          </View>
          <TouchableOpacity style={styles.avatarCircle}>
            <Ionicons name="person" size={24} color="#388E3C" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
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
  backBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: Colors.light.background,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
    flex: 1,
    textAlign: 'center',
  },
});