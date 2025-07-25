import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TEXTS } from '@/constants/texts';
import { useRouter } from 'expo-router';

export default function TopBar({ title }: { title: string }) {
  const router = useRouter();
  return (
    <View style={styles.topBar}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>{TEXTS.back}</Text>
      </TouchableOpacity>
      <Text style={styles.topBarTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#A5D6A7',
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  topBarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
});
