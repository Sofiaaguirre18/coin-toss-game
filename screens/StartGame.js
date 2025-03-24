import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { CoinTossContext } from '../context/CoinTossContext';

const StartGame = ({ navigation }) => {
  const { resetGame, setMaxRounds } = useContext(CoinTossContext);
  const [selectedRounds, setSelectedRounds] = useState(3);

  const startGame = () => {
    resetGame();
    setMaxRounds(selectedRounds);
    navigation.navigate('GameScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coin Toss Game</Text>
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Select Number of Rounds</Text>
        <View style={styles.roundsSelector}>
          {[3, 5].map(num => (
            <Button 
              key={num}
              title={`${num}`}
              style={[styles.roundButton, selectedRounds === num && styles.selectedRound]}
              textStyle={selectedRounds === num && styles.selectedRoundText}
              onPress={() => setSelectedRounds(num)} 
            />
          ))}
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Click to Start</Text>
        <Button title="Start Game" onPress={startGame} />
      </Card>
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
    marginBottom: 30,
    color: '#3A3A3A'
  },
  card: {
    width: '90%',
    marginBottom: 20,
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#444'
  },
  roundsSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 10
  },
  roundButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 0,
    justifyContent: 'center',
    backgroundColor: '#A37B6D'
  },
  selectedRound: {
    backgroundColor: '#6D4C41'
  },
  selectedRoundText: {
    color: '#fff'
  }
});

export default StartGame;