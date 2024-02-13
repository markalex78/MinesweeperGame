import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOARD_SIZE = 8;
const NUM_MINES = 10;

const generateBoard = (boardSize, numMines) => {
    const board = Array.from({ length: boardSize }, () =>
        Array.from({ length: boardSize }, () => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            adjacentMines: 0,
        }))
    );

    let minesPlaced = 0;

    while (minesPlaced < numMines) {
        const x = Math.floor(Math.random() * boardSize);
        const y = Math.floor(Math.random() * boardSize);

        if (!board[x][y].isMine) {
            board[x][y].isMine = true;
            minesPlaced++;

            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newX = x + i;
                    const newY = y + j;

                    if (
                        newX >= 0 &&
                        newX < boardSize &&
                        newY >= 0 &&
                        newY < boardSize &&
                        !board[newX][newY].isMine
                    ) {
                        board[newX][newY].adjacentMines++;
                    }
                }
            }
        }
    }

    return board;
};

const MinesweeperGame = ({ route, navigation }) => {
    const { boardSize, numMines } = route.params;
    const [board, setBoard] = useState(generateBoard(boardSize, numMines));
    const [timer, setTimer] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [playerName, setPlayerName] = useState('');

    const getPlayerName = async () => {
        try {
            const name = await AsyncStorage.getItem('playerName');
            if (name !== null) {
                setPlayerName(name);
            }
        } catch (error) {
            console.error('Error loading player name:', error);
        }
    };

    useEffect(() => {
        getPlayerName();
    }, []);

    useEffect(() => {
        let interval;
        if (timerRunning) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [timerRunning]);

    const handlePress = async (x, y) => {
        if (board[x][y].isFlagged || board[x][y].isRevealed) {
            return;
        }

        if (!timerRunning) {
            setTimerRunning(true);
        }

        if (board[x][y].isMine) {
            setTimerRunning(false);

            const newBoard = board.map((row) =>
                row.map((cell) => {
                    cell.isRevealed = true;
                    return cell;
                })
            );

            setBoard(newBoard);

            Alert.alert(
                'Game Over',
                `You hit a mine!\nTime taken: ${timer} seconds`,
                [
                    {
                        text: 'OK',
                        onPress: async () => {
                            const playerName = await promptForName();
                            if (playerName) {
                                setPlayerName(playerName);
                                AsyncStorage.setItem('playerName', playerName);
                                saveHighestScore();
                            }
                            navigation.navigate('Leaderboard');
                        },
                    },
                ]
            );
        } else {
            const newBoard = [...board];
            revealCell(newBoard, x, y);
            setBoard(newBoard);

            if (isGameWon(newBoard)) {
                setTimerRunning(false);

                let playerName = '';

                Alert.prompt(
                    'Congratulations!',
                    'You won!\nEnter your name:',
                    (name) => {
                        if (name) {
                            playerName = name;
                            setPlayerName(playerName);
                            AsyncStorage.setItem('playerName', playerName);
                            saveHighestScore();
                            navigation.navigate('Leaderboard');
                        }
                    },
                    'plain-text',
                    playerName
                );
            }
        }
    };

    const saveHighestScore = async () => {
        try {
            const existingScores = await AsyncStorage.getItem('highestScores');
            const scores = existingScores ? JSON.parse(existingScores) : [];

            scores.push({ playerName, time: timer, difficulty: boardSize });

            scores.sort((a, b) => a.time - b.time);

            const topScores = scores.slice(0, 5);

            await AsyncStorage.setItem('highestScores', JSON.stringify(topScores));
        } catch (error) {
            console.error('Error saving highest score:', error);
        }
    };

    const promptForName = async () => {
        return new Promise((resolve) => {
            Alert.prompt(
                'Enter Your Name',
                'You made it to the top 5 scores!\nEnter your name:',
                (name) => {
                    resolve(name);
                },
                'plain-text',
                playerName
            );
        });
    };

    const revealCell = (currentBoard, x, y) => {
        if (
            x < 0 ||
            x >= boardSize ||
            y < 0 ||
            y >= boardSize ||
            currentBoard[x][y].isRevealed
        ) {
            return;
        }

        currentBoard[x][y].isRevealed = true;

        if (currentBoard[x][y].adjacentMines === 0) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    revealCell(currentBoard, x + i, y + j);
                }
            }
        }
    };

    const isGameWon = (currentBoard) => {
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (!currentBoard[i][j].isMine && !currentBoard[i][j].isRevealed) {
                    return false;
                }
            }
        }
        return true;
    };

    const resetGame = () => {
        setBoard(generateBoard(boardSize, numMines));
        setTimer(0);
        setTimerRunning(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Minesweeper</Text>
            <View style={styles.timerContainer}>
                <Text style={styles.timerText}>{`Time: ${timer} seconds`}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.board}>
                {board.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((cell, columnIndex) => (
                            <TouchableOpacity
                                key={columnIndex}
                                style={[
                                    styles.cell,
                                    cell.isRevealed &&
                                    (cell.isMine ? styles.revealedBombCell : styles.revealedCell),
                                ]}
                                onPress={() => handlePress(rowIndex, columnIndex)}
                            >
                                {cell.isRevealed && !cell.isMine && cell.adjacentMines > 0 && (
                                    <Text style={styles.cellText}>{cell.adjacentMines}</Text>
                                )}
                                {cell.isFlagged && (
                                    <Text style={[styles.flagIcon, styles.cellText]}>{'\u2691'}</Text>
                                )}
                                {cell.isRevealed && cell.isMine && (
                                    <Text style={[styles.bombIcon, styles.cellText]}>{'\u2620'}</Text>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.quitButton} onPress={resetGame}>
                <Text style={styles.quitButtonText}>Reset Game</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quitButton} onPress={() => navigation.navigate('Leaderboard')}>
                <Text style={styles.quitButtonText}>Quit Game</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 48,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    timerContainer: {
        marginTop: 10,
    },
    timerText: {
        fontSize: 24,
    },
    board: {
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 30,
        height: 30,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cellText: {
        fontSize: 18,
    },
    revealedCell: {
        backgroundColor: 'lightgray',
    },
    revealedBombCell: {
        backgroundColor: 'red',
    },
    flagIcon: {
        color: 'red',
        fontSize: 24,
    },
    bombIcon: {
        color: 'black',
        fontSize: 24,
    },
    quitButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 50,
    },
    quitButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default MinesweeperGame;
