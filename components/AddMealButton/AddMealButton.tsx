import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

interface AddMealButtonProps {
  onPress: () => void;
}

export const AddMealButton = ({ onPress }: AddMealButtonProps) => (
  <TouchableOpacity style={styles.addButton} onPress={onPress}>
    <Text style={styles.addButtonText}>Ajouter un repas</Text>
  </TouchableOpacity>
);
