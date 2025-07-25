import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import Colors from '@/constants/Colors';
import { useUser, SignedIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import TopBar from '@/components/TopBar';
import { SignOutButton } from '@/components/buttons/SignOutButton';
import { TEXTS } from '@/constants/texts';

function ProfileScreen() {
    const { user } = useUser();
    const router = useRouter();
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const themedStyles = getThemedStyles(theme);

    return (
        <ScrollView style={themedStyles.container} contentContainerStyle={themedStyles.content}>
            <TopBar showBack title={TEXTS.profileTitle} />
            <View style={themedStyles.profileCard}>
                <View style={themedStyles.avatar}>
                    <Ionicons name="person" size={42} color="#388E3C" />
                </View>
                <Text style={themedStyles.name}>{user?.username ?? TEXTS.defaultUser}</Text>
                <Text style={themedStyles.email}>{user?.primaryEmailAddress?.emailAddress ?? TEXTS.noEmail}</Text>
            </View>

            <View style={themedStyles.section}>
                <TouchableOpacity style={themedStyles.item} onPress={() => router.push('/profile/settings')}>
                    <Ionicons name="settings" size={20} color="#4CAF50" />
                    <Text style={themedStyles.itemText}>{TEXTS.settings}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={themedStyles.item} onPress={() => router.push('/profile/stats')}>
                    <MaterialIcons name="bar-chart" size={20} color="#4CAF50" />
                    <Text style={themedStyles.itemText}>{TEXTS.stats}</Text>
                </TouchableOpacity>

                <View style={themedStyles.item}>
                    <Ionicons name="color-palette" size={20} color="#4CAF50" />
                    <Text style={themedStyles.itemText}>{TEXTS.appearance}</Text>
                    <View style={{ marginLeft: 12 }}>
                        <Switch
                            value={theme === 'dark'}
                            onValueChange={v => setTheme(v ? 'dark' : 'light')}
                            thumbColor={theme === 'dark' ? Colors.dark.cardBackground : Colors.light.cardBackground}
                            trackColor={{ false: Colors.light.tabIconDefault, true: Colors.light.tint }}
                        />
                    </View>
                </View>
            </View>

            <View style={{ marginTop: 24 }}>
                <SignOutButton />
            </View>
        </ScrollView>
    );
}

export default ProfileScreen;



function getThemedStyles(theme: 'light' | 'dark') {
    const palette = Colors[theme];
    return StyleSheet.create({
        container: { flex: 1, backgroundColor: palette.background },
        content: { padding: 20 },
        profileCard: {
            alignItems: 'center',
            marginBottom: 32,
        },
        avatar: {
            width: 72,
            height: 72,
            backgroundColor: palette.cardBackground,
            borderRadius: 36,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12,
        },
        name: {
            fontSize: 22,
            fontWeight: 'bold',
            color: palette.text,
        },
        email: {
            fontSize: 14,
            color: palette.helloText,
        },
        section: {
            backgroundColor: palette.actionBackground,
            borderRadius: 14,
            paddingVertical: 12,
            paddingHorizontal: 16,
            shadowColor: palette.shadowColor,
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
            borderBottomColor: palette.cardBackground,
            gap: 12,
        },
        itemText: {
            fontSize: 16,
            color: palette.text,
            fontWeight: '500',
        },
    });
}