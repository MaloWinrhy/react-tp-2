import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6FAF7',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignSelf: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#A5D6A7',
  },
  placeholder: {
    color: '#888',
    marginBottom: 12,
    fontSize: 16,
    textAlign: 'center',
  },
});
