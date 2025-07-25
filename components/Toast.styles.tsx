import { StyleSheet } from 'react-native';

export const toastStyles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 20,
    left: 14,
    right: 14,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    zIndex: 999,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  success: {
    backgroundColor: '#4CAF50',
  },
  error: {
    backgroundColor: '#D32F2F',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
