import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Leaderboard = () => {
    const [highestScores, setHighestScores] = useState([]);

    useEffect(() => {
        loadHighestScores();
    }, []);

    const loadHighestScores = async () => {
        try {
            const scores = await AsyncStorage.getItem('highestScores');

            if (scores !== null) {
                const parsedScores = JSON.parse(scores);
                setHighestScores(parsedScores);
            }
        } catch (error) {
            console.error('Error loading highest scores:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Leaderboard</Text>
            {highestScores.map((score, index) => (
                <View key={index} style={styles.scoreContainer}>
                    <Text style={styles.rank}>{index + 1}</Text>
                    <Text style={styles.score}>{`${score.playerName} - ${score.time} seconds - Difficulty: ${score.difficulty}`}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    scoreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    rank: {
        fontSize: 18,
        marginRight: 10,
    },
    score: {
        flex: 1,
        fontSize: 18,
    },
});

export default Leaderboard;
