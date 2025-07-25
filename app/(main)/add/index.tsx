import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { fetchAutoComplete } from '@/services/foodService';
import { insertMeal } from '@/services/dbService';
import { TEXTS } from '@/constants/texts';
import MealList from '@/components/MealSearchList';
import TopBar from '@/components/TopBar';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';
import { MealSearchItem } from '@/components/fields/MealSearchItem';

export default function AddMealScreen() {
    const [query, setQuery] = useState<string | undefined>(undefined);
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
        if (!text) return setResults([]);
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

    const handleValidate = async () => {
        if (!mealsAsync.length) return;
        const totalCalories = mealsAsync.reduce((sum, food) => sum + (food.calories || 0), 0);
        const date = new Date().toISOString();
        const foods = mealsAsync.map(food => ({
            name: food.label,
            calories: food.calories || 0,
            proteins: food.proteins || 0,
            carbs: food.carbs || 0,
            fats: food.fats || 0,
        }));
        try {
            await insertMeal(date, totalCalories, foods);
            alert(TEXTS.mealSaved);
        } catch (e) {
            alert(TEXTS.error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <TopBar showBack title="Ajouter un repas" />        <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder={TEXTS.searchPlaceholder}
                        value={query}
                        onChangeText={handleChangeText}
                        style={styles.input}
                        placeholderTextColor="#888"
                    />
                </View>
                {(query?.length ?? 0) > 0 && (
                    <View style={styles.dropdown}>
                        {loading ? (
                            <ActivityIndicator style={{ marginTop: 20 }} color="#4CAF50" />
                        ) : results.length === 0 ? (
                            <Text style={styles.empty}>{TEXTS.noResults}</Text>
                        ) : (
                            <View>
                                {results.map(item => (
                                    <MealSearchItem
                                        key={item}
                                        label={item}
                                        onPress={() => handleSelectFood({ label: item })}
                                    />
                                ))}
                            </View>
                        )}
                    </View>
                )}
                <Text style={styles.title}>{TEXTS.addedFoodsTitle}</Text>
                <MealList meals={mealsAsync} />
                <PrimaryButton
                    label={TEXTS.validateMeal}
                    onPress={handleValidate}
                    style={{ marginTop: 24 }}
                />
                <PrimaryButton
                    label={TEXTS.scanBarcode}
                    onPress={() => router.push('/add/camera')}
                    variant="secondary"
                    style={{ marginTop: 12 }}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#FDFDFD',
    },
    inputWrapper: {
        marginTop: 12,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 12,
        padding: 14,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    dropdown: {
        borderRadius: 14,
        backgroundColor: '#fff',
        borderColor: '#E0E0E0',
        borderWidth: 1,
        marginBottom: 16,
        maxHeight: 180,
    },
    empty: {
        textAlign: 'center',
        padding: 20,
        color: '#AAA',
        fontStyle: 'italic',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginVertical: 12,
    },
});