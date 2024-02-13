import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomePage = ({ navigation }) => {
    const startGame = (boardSize, numMines) => {
        navigation.navigate('MinesweeperGame', {
            boardSize,
            numMines,
        });
    };

    const howToPlay = () => {
        navigation.navigate('HowToPlay');
    };

    const goToLeaderboard = () => {
        navigation.navigate('Leaderboard');
    };

    return (
        <View style={styles.container}>
            {/* Top flexbox */}
            <View style={styles.topFlexbox}>
                <Text style={styles.heading}>Minesweeper</Text>
            </View>

            {/* Bottom flexbox */}
            <View style={styles.bottomFlexbox}>
                <View style={styles.difficultyButtons}>
                    <TouchableOpacity style={styles.button} onPress={() => startGame(8, 10)}>
                        <Text style={styles.buttonText}>Easy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => startGame(12, 20)}>
                        <Text style={styles.buttonText}>Medium</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => startGame(16, 30)}>
                        <Text style={styles.buttonText}>Hard</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomButtons}>
                    <TouchableOpacity style={[styles.button, styles.bottomButton]} onPress={howToPlay}>
                        <Text style={styles.buttonText}>How to Play</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.bottomButton, { alignSelf: 'center' }]} onPress={goToLeaderboard}>
                        <Text style={styles.buttonText}>Leaderboard</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topFlexbox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomFlexbox: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 48,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 20,
    },
    difficultyButtons: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    bottomButtons: {
        marginTop: 10,
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        width: 90,
    },
    bottomButton: {
        width: 125, 
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default HomePage;
