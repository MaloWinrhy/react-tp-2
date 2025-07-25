import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const EDAMAM_APP_ID = process.env.EXPO_PUBLIC_EDAMAM_APP_ID || '';
const EDAMAM_APP_KEY = process.env.EXPO_PUBLIC_EDAMAM_APP_KEY || '';

export default function IngredientDetails() {
  const { ingredient } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const ingrStr = Array.isArray(ingredient) ? ingredient[0] : ingredient;
        const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&ingr=${encodeURIComponent(
          ingrStr
        )}&nutrition-type=cooking`;
        const res = await fetch(url);
        if (!res.ok) {
          setError('Erreur API');
          setLoading(false);
          return;
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError('Erreur de chargement');
      }
      setLoading(false);
    };
    fetchDetails();
  }, [ingredient]);

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );

  if (error)
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );

  if (!data || !data.parsed?.length)
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>Aucune donnée trouvée.</Text>
      </View>
    );

  const food = data.parsed[0].food;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{food.label}</Text>

      {food.image && (
        <Image
          source={{ uri: food.image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <View style={styles.card}>
        <Info label="Catégorie" value={food.category} />
        <Info label="Calories" value={`${food.nutrients.ENERC_KCAL ?? 'N/A'} kcal`} />
        <Info label="Protéines" value={`${food.nutrients.PROCNT ?? 'N/A'} g`} />
        <Info label="Lipides" value={`${food.nutrients.FAT ?? 'N/A'} g`} />
        <Info label="Glucides" value={`${food.nutrients.CHOCDF ?? 'N/A'} g`} />
        <Info label="Fibres" value={`${food.nutrients.FIBTG ?? 'N/A'} g`} />
      </View>
    </ScrollView>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FAF7',
    paddingHorizontal: 24,
    paddingTop: 32
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6FAF7'
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 20,
    textAlign: 'center'
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignSelf: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#A5D6A7'
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  label: {
    fontSize: 16,
    color: '#555'
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1B5E20'
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 16
  },
  infoText: {
    fontSize: 16,
    color: '#757575'
  }
});