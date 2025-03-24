import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { CoinTossContext } from '../context/CoinTossContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Coin from '../components/Coin';
import ModalContainer from '../components/ui/ModalContainer';

const GameScreen = ({ navigation }) => {
  const { 
    playerScores, 
    currentTurn, 
    gameOver, 
    flipCoin, 
    roundsPlayed, 
    maxRounds,
    lastResult
  } = useContext(CoinTossContext);
  
  const [isFlipping, setIsFlipping] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (gameOver) {
      navigation.navigate('GameOver');
    }
  }, [gameOver, navigation]);

  const handleCoinFlip = (choice) => {
    if (isFlipping) return;
    
    setIsFlipping(true);

    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      })
    ]).start(() => {
      flipCoin(choice);
      setIsFlipping(false);
    });
  };

  const spin = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });


  const currentRound = roundsPlayed + (currentTurn === 'player1' ? 1 : 0.5);
  const displayRound = Math.ceil(currentRound);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coin Toss</Text>
      
      <Card style={styles.statusCard}>
        <Text style={styles.statusText}>Round: {displayRound} of {maxRounds}</Text>
        <Text style={styles.statusText}>
          Score: Player 1 ({playerScores.player1}) - Player 2 ({playerScores.player2})
        </Text>
        <Text style={styles.playerTurn}>
          {currentTurn === 'player1' ? "Player 1's Turn" : "Player 2's Turn"}
        </Text>
      </Card>
      
      <View style={styles.coinContainer}>
        <Animated.View style={[{ transform: [{ rotateY: spin }] }]}>
          {lastResult ? 
            <Coin result={lastResult} /> : 
            <View style={styles.placeholderCoin} />
          }
        </Animated.View>
      </View>

      <Card style={styles.choiceCard}>
        <Text style={styles.choiceText}>Guess the coin:</Text>
        <View style={styles.buttonContainer}>
          <Button title="Heads" onPress={() => handleCoinFlip('heads')} />
          <Button title="Tails" onPress={() => handleCoinFlip('tails')} />
        </View>
      </Card>
      
      <Button 
        title="Game Rules" 
        style={styles.rulesButton} 
        textStyle={styles.rulesButtonText} 
        onPress={() => setModalVisible(true)} 
      />
      
      <ModalContainer
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Text style={styles.modalTitle}>How to Play</Text>
        <Text style={styles.modalText}>1. Guess if the coin will land on Heads or Tails.</Text>
        <Text style={styles.modalText}>2. If your guess is right, you get a point.</Text>
        <Text style={styles.modalText}>3. The game goes on for {maxRounds} rounds</Text>
        <Text style={styles.modalText}>4. The player with the most points at the end wins</Text>
        <Button title="Close" onPress={() => setModalVisible(false)} />
      </ModalContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5E6CA'
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginTop: 60
  },
  statusCard: {
    width: '90%',
    marginTop: 40
  },
  statusText: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center'
  },
  playerTurn: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#6D4C41'
  },
  coinContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeholderCoin: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFD700',
    borderWidth: 2,
    borderColor: '#B8860B'
  },
  choiceCard: {
    width: '90%',
    marginBottom: 80
  },
  choiceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  rulesButton: {
    backgroundColor: 'transparent',
    marginBottom: 20
  },
  rulesButtonText: {
    color: '#6D4C41',
    textDecorationLine: 'underline'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10
  }
});

export default GameScreen;