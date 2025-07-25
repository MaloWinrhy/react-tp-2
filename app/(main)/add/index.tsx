import { useState, useRef } from 'react';
import { View, TextInput, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

const EDAMAM_APP_ID = process.env.EXPO_PUBLIC_EDAMAM_APP_ID || '';
const EDAMAM_APP_KEY = process.env.EXPO_PUBLIC_EDAMAM_APP_KEY || '';

export default function AddMealScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<any[]>([]);
  const router = useRouter();

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchSuggestions = async (text: string) => {
    if (!text) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const url = `https://api.edamam.com/auto-complete?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&q=${encodeURIComponent(text)}`;
      const res = await fetch(url);
      if (!res.ok) {
        setResults([]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setResults(data || []);
    } catch (err) {
      setResults([]);
    }
    setLoading(false);
  };

  const handleChangeText = (text: string) => {
    setQuery(text);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(text);
    }, 400);
  };

  const handleSelectFood = (food: any) => {
    router.push({
      pathname: '/add/details/[ingredient]',
      params: { ingredient: food.label },
    });
  };

  const handleValidate = () => {
    alert('Repas enregistré !');
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TextInput
        placeholder="Rechercher un aliment"
        value={query}
        onChangeText={handleChangeText}
        style={{ borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 }}
      />
      {loading && <ActivityIndicator />}
      {!loading && results.length === 0 && query.length > 0 && (
        <Text style={{ color: '#888', textAlign: 'center', marginVertical: 16 }}>
          Aucun aliment trouvé.
        </Text>
      )}
      <FlatList
        data={results}
        keyExtractor={(item: string) => item}
        renderItem={({ item }: { item: string }) => (
          <TouchableOpacity
            style={{ padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}
            onPress={() => handleSelectFood({ label: item })}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={{ backgroundColor: '#34C759', padding: 12, borderRadius: 8, marginTop: 16 }}
        onPress={handleValidate}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Valider le repas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: '#FFA500', padding: 12, borderRadius: 8, marginTop: 16 }}
        onPress={() => router.push('/add/camera')}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Scanner un Code Barres</Text>
      </TouchableOpacity>
    </View>
  );
}
