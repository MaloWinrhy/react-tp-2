import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export function PrimaryCard({
  title,
  subtitle,
  icon,
  background,
}: {
  title: string
  subtitle: string
  icon: any
  background?: string
}) {
  return (
    <View style={[styles.card, { backgroundColor: background || '#fff' }]}>
      <Ionicons name={icon} size={28} color="#388E3C" />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
})