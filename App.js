import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CoinTossProvider } from './context/CoinTossContext';
import StartGame from './screens/StartGame';
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOver';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('StartGame');
  
  const navigate = (screenName) => {
    setCurrentScreen(screenName);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'StartGame':
        return <StartGame navigation={{ navigate }} />;
      case 'GameScreen':
        return <GameScreen navigation={{ navigate }} />;
      case 'GameOver':
        return <GameOver navigation={{ navigate }} />;
      default:
        return <StartGame navigation={{ navigate }} />;
    }
  };

  return (
    <CoinTossProvider>
      <View style={styles.container}>
        {renderScreen()}
      </View>
    </CoinTossProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});