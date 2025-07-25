import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';

const EDAMAM_APP_ID = process.env.EXPO_PUBLIC_EDAMAM_APP_ID || '';
const EDAMAM_APP_KEY = process.env.EXPO_PUBLIC_EDAMAM_APP_KEY || '';


export default function IngredientDetails() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const handleAddMeal = async () => {
    if (!food || typeof food.label !== 'string') return;
    setSaving(true);
    try {
      const meal = {
        label: String(food.label),
        image: food.image,
        category: food.category,
        nutrients: food.nutrients,
        date: new Date().toISOString(),
      };
      const existing = await AsyncStorage.getItem('meals');
      const meals = existing ? JSON.parse(existing) : [];
      meals.push(meal);
      await AsyncStorage.setItem('meals', JSON.stringify(meals));
      router.back();
    } catch (e) {
    }
    setSaving(false);
  };
  const { param, upc } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    // ...existing code...
  }, [param, upc]);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError('');
      try {
        let url = '';
        if (upc && typeof upc === 'string' && upc.length > 0) {
          url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&upc=${encodeURIComponent(upc)}&nutrition-type=cooking`;
        } else if (param && typeof param === 'string' && param.length > 0) {
          url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&ingr=${encodeURIComponent(param)}&nutrition-type=cooking`;
        }
        if (!url) {
          setError('Aucun paramètre fourni');
          setLoading(false);
          return;
        }
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
  }, [param, upc]);

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

  let food: { label: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; image: any; category: string; nutrients: { ENERC_KCAL: any; PROCNT: any; FAT: any; CHOCDF: any; FIBTG: any; }; } | null = null;
  if (data && data.parsed?.length) {
    food = data.parsed[0].food;
  } else if (data && data.hints?.length) {
    food = data.hints[0].food;
  }

  if (!food) {
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>Aucune donnée trouvée.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>{'< Retour'}</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>{food.label}</Text>
      </View>
      <ScrollView style={styles.container}>
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

        <PrimaryButton
          label={saving ? 'Ajout...' : 'Ajouter à mon repas'}
          onPress={handleAddMeal}
          style={{ marginTop: 24 }}
        />
      </ScrollView>
    </View>
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
