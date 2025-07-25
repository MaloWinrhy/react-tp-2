import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import topBarStyles from './TopBar.styles';
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
    <View style={topBarStyles.headerWrapper}>
      {showBack ? (
        <>
            <TouchableOpacity onPress={() => router.back()} style={topBarStyles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#388E3C" />
          </TouchableOpacity>
          <Text style={topBarStyles.pageTitle} numberOfLines={1}>
            {title}
          </Text>
          <View style={{ width: 42 }} />
        </>
      ) : (
        <>
          <View style={{ flex: 1 }}>
            <Text style={topBarStyles.hello}>Bonjour</Text>
            <Text style={topBarStyles.username}>{user?.username ?? 'Utilisateur'}</Text>
          </View>
          <TouchableOpacity style={topBarStyles.avatarCircle}>
            <Ionicons name="person" size={24} color="#388E3C" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

// styles déplacés dans TopBar.styles.ts