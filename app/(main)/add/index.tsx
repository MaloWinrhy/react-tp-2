import React, { useState, useRef } from 'react';
import { View, Text, TextInput, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import TopBar from '@/components/TopBar';
import GenericButton from '@/components/GenericButton';
import MealList from '@/components/MealList';
import { commonStyles } from '@/components/styles';
import { fetchAutoComplete } from '@/services/foodService';
import { TEXTS } from '@/constants/texts';

export default function AddMealScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [mealsAsync, setMealsAsync] = useState<any[]>([]);
  const router = useRouter();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchMeals = async () => {
        const stored = await AsyncStorage.getItem('meals');
        setMealsAsync(stored ? JSON.parse(stored) : []);
      };
      fetchMeals();
    }, [])
  );

  const fetchSuggestions = async (text: string) => {
    if (!text) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const data = await fetchAutoComplete(text);
      setResults(data || []);
    } catch {
      setResults([]);
    }
    setLoading(false);
  };

  const handleChangeText = (text: string) => {
    setQuery(text);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => fetchSuggestions(text), 400);
  };

  const handleSelectFood = (food: any) => {
    router.push({ pathname: '/add/details/[param]', params: { param: food.label } });
    setQuery('');
    setResults([]);
  };

  const handleValidate = () => alert(TEXTS.mealSaved);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={commonStyles.centered}>
        <TopBar title={TEXTS.addMealTitle} />
        <TextInput
          placeholder={TEXTS.searchPlaceholder}
          value={query}
          onChangeText={handleChangeText}
          style={{
            borderWidth: 1,
            borderColor: '#CCC',
            borderRadius: 8,
            padding: 12,
            marginTop: 8,
            backgroundColor: '#fff',
            width: '100%',
          }}
        />
        {query.length > 0 && (
          <View style={{
            marginTop: 8,
            backgroundColor: '#FFF',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#DDD',
            maxHeight: 180,
            overflow: 'hidden',
            width: '100%',
          }}>
            {loading ? (
              <ActivityIndicator style={{ marginTop: 20 }} />
            ) : results.length === 0 ? (
              <Text style={{ padding: 16, textAlign: 'center', color: '#888' }}>{TEXTS.noResults}</Text>
            ) : (
              results.map((item) => (
                <GenericButton
                  key={item}
                  label={item}
                  onPress={() => handleSelectFood({ label: item })}
                  color="#A5D6A7"
                  style={{ marginVertical: 2 }}
                />
              ))
            )}
          </View>
        )}
        <Text style={commonStyles.title}>{TEXTS.addedFoodsTitle}</Text>
        <MealList meals={mealsAsync} />
        <GenericButton
          label={TEXTS.validateMeal}
          onPress={handleValidate}
          color="#34C759"
          style={{ marginTop: 24 }}
        />
        <GenericButton
          label={TEXTS.scanBarcode}
          onPress={() => router.push('/add/camera')}
          color="#FFA500"
          style={{ marginTop: 12 }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

// ...existing code...