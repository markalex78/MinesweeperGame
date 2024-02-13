import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HowToPlay = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>How to Play Minesweeper</Text>
            <Text style={styles.instructionText}>
                1. Understand the Basics: Each square on the grid is either empty or contains a mine. The goal is to reveal all the empty squares without clicking on any mines. When you click on a square, it will either reveal an empty square, a number indicating how many mines are adjacent to that square, or a mine (which ends the game).
            </Text>
            <Text style={styles.instructionText}>
                2. Click to Reveal: Click on a square to reveal what's underneath. If it's an empty square, it will reveal itself along with a number indicating how many mines are adjacent to it. The number represents the count of mines in the eight squares surrounding the numbered square.
            </Text>
            <Text style={styles.instructionText}>
                3. Hold-Click to Mark Mines (or use the flag mode): Hold-click on a square to mark it as a potential mine. This is useful when you think you've identified a mine location. Hold-clicking again will change the marking back to an empty square. You can toggle "flag mode" by clicking the flag icon at the bottom. When flag mode is on, all clicks will be treated as flags, until it is disabled.
            </Text>
            <Text style={styles.instructionText}>
                4. Use Number Clues: As you reveal numbers on the grid, they indicate how many mines are adjacent to that square. Use this information to deduce where mines might be located. For example, if a square has a "3" and there are already two mines next to it, there's likely a mine in one of the remaining two adjacent squares.
            </Text>
            <Text style={styles.instructionText}>
                5. Deductive Reasoning: Use logical deduction to identify safe squares and potential mine locations. If there's a square with a "1" surrounded by already-revealed empty squares, you can safely click on the remaining unmarked square(s) adjacent to the "1."
            </Text>
            <Text style={styles.instructionText}>
                6. Expand Safely: Once you're confident about a safe area, clicking on an empty square will reveal a larger area of empty squares, making the game progress faster.
            </Text>
            <Text style={styles.instructionText}>
                7. Game Over: If you click on a square with a mine, the game ends and you lose. You can then start a new game.
            </Text>
            <Text style={styles.instructionText}>
                8. Win Condition: You win when you've revealed all the empty squares on the grid, and all the mines have been marked.
            </Text>
            <Text style={styles.instructionText}>
                9. Practice: Minesweeper is a game of strategy and deduction. The more you play, the better you'll become at recognizing patterns and making informed decisions.
            </Text>
            <View style={styles.buttonContainer}>
                <Text style={styles.backButton} onPress={() => navigation.goBack()}>Back to Home</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        fontFamily: 'System',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    instructionText: {
        fontSize: 16,
        marginBottom: 15,
        lineHeight: 24,
    },
    buttonContainer: {
        marginTop: 20,
    },
    backButton: {
        fontSize: 18,
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default HowToPlay;
