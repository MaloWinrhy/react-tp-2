import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { TEXTS } from '@/constants/texts';

interface Props {
  label?: string;
  onPress: () => void;
  color?: string;
  style?: ViewStyle;
  disabled?: boolean;
}

export default function GenericButton({ label, onPress, color = '#4CAF50', style, disabled }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{label || TEXTS.addMeal}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
