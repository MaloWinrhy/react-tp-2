import React, { useState, useRef, useEffect } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Image, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const EDAMAM_APP_ID = process.env.EXPO_PUBLIC_EDAMAM_APP_ID || '';
const EDAMAM_APP_KEY = process.env.EXPO_PUBLIC_EDAMAM_APP_KEY || '';

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
            const url = `https://api.edamam.com/auto-complete?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&q=${encodeURIComponent(text)}`;
            const res = await fetch(url);
            const data = await res.json();
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

    const handleValidate = () => alert('Repas enregistré !');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <TextInput
                    placeholder="Rechercher un aliment"
                    value={query}
                    onChangeText={handleChangeText}
                    style={styles.input}
                />
                {query.length > 0 && (
                    <View style={styles.resultsContainer}>
                        {loading ? (
                            <ActivityIndicator style={{ marginTop: 20 }} />
                        ) : results.length === 0 ? (
                            <Text style={styles.noResults}>Aucun aliment trouvé.</Text>
                        ) : (
                            <FlatList
                                data={results}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.resultItem} onPress={() => handleSelectFood({ label: item })}>
                                        <Text style={styles.resultText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                    </View>
                )}
                <Text style={styles.title}>Aliments ajoutés au repas</Text>
                {mealsAsync.length === 0 ? (
                    <Text style={styles.placeholder}>Aucun aliment ajouté.</Text>
                ) : (
                    <FlatList
                        data={mealsAsync}
                        keyExtractor={(item, idx) => item.label + idx}
                        renderItem={({ item }) => (
                            <View style={styles.mealItem}>
                                {item.image && <Image source={{ uri: item.image }} style={styles.mealImage} />}
                                <Text style={styles.mealLabel}>{item.label}</Text>
                            </View>
                        )}
                        style={{ marginBottom: 16 }}
                    />
                )}

                <TouchableOpacity style={styles.validateButton} onPress={handleValidate}>
                    <Text style={styles.buttonText}>Valider le repas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.scanButton} onPress={() => router.push('/add/camera')}>
                    <Text style={styles.buttonText}>Scanner un Code Barres</Text>
                </TouchableOpacity>


            </View>
        </TouchableWithoutFeedback>
    );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#F9F9F9',
    },
    resultsContainer: {
        marginTop: 8,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DDD',
        maxHeight: height * 0.3,
        overflow: 'hidden',
    },
    title: {
        fontWeight: '600',
        fontSize: 18,
        marginBottom: 8,
        color: '#111',
    },
    placeholder: {
        color: '#888',
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        padding: 12,
        marginTop: 8,
        backgroundColor: '#fff',
    },
    validateButton: {
        backgroundColor: '#34C759',
        padding: 12,
        borderRadius: 8,
        marginTop: 24,
    },
    scanButton: {
        backgroundColor: '#FFA500',
        padding: 12,
        borderRadius: 8,
        marginTop: 12,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
    },
    mealItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    mealImage: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    mealLabel: {
        fontSize: 16,
    },
    overlay: {
        position: 'absolute',
        top: 180,
        left: 24,
        right: 24,
        maxHeight: height * 0.4,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DDD',
        zIndex: 999,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
    resultItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    resultText: {
        fontSize: 16,
    },
    noResults: {
        padding: 16,
        textAlign: 'center',
        color: '#888',
    },
});