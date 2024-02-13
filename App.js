import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MinesweeperGame from './MinesweeperGame';
import HomePage from './HomePage';
import HowToPlay from './HowToPlay';
import Leaderboard from './Leaderboard';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="MinesweeperGame" component={MinesweeperGame} />
                <Stack.Screen name="HowToPlay" component={HowToPlay} />
                <Stack.Screen name="Leaderboard" component={Leaderboard} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
