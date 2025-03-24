import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { CoinTossContext } from '../context/CoinTossContext';

const GameOver = ({ navigation }) => {
  const { playerScores, resetGame } = useContext(CoinTossContext);

  const getWinnerText = () => {
    if (playerScores.player1 > playerScores.player2) {
      return 'Player 1 Wins!';
    } else if (playerScores.player2 > playerScores.player1) {
      return 'Player 2 Wins!';
    } else {
      return "It's a Tie!";
    }
  };

  const restartGame = () => {
    resetGame();
    navigation.navigate('StartGame');
  };

  const playAgain = () => {
    resetGame();
    navigation.navigate('GameScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Over</Text>
      
      <Card style={styles.resultCard}>
        <Text style={styles.winnerText}>{getWinnerText()}</Text>
        <Text style={styles.scoreText}>
          Final Score: {playerScores.player1} - {playerScores.player2}
        </Text>
      </Card>
      
      <View style={styles.buttonContainer}>
        <Button title="Play Again" onPress={playAgain} />
        <Button title="New Game" onPress={restartGame} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5E6CA'
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 30
  },
  resultCard: {
    width: '90%',
    padding: 20,
    alignItems: 'center'
  },
  winnerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#6D4C41'
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 10
  },
  buttonContainer: {
    width: '90%',
    marginTop: 30
  }
});

export default GameOver;