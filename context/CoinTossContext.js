import React, { createContext, useState, useEffect } from 'react';

export const CoinTossContext = createContext();

export const CoinTossProvider = ({ children }) => {
  const [playerScores, setPlayerScores] = useState({ player1: 0, player2: 0 });
  const [currentTurn, setCurrentTurn] = useState('player1');
  const [gameOver, setGameOver] = useState(false);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [maxRounds, setMaxRounds] = useState(5);
  const [lastResult, setLastResult] = useState(null);

  useEffect(() => {
    if (roundsPlayed >= maxRounds) {
      setGameOver(true);
    }
  }, [roundsPlayed, maxRounds]);

  const resetGame = () => {
    setPlayerScores({ player1: 0, player2: 0 });
    setCurrentTurn('player1');
    setGameOver(false);
    setRoundsPlayed(0);
    setLastResult(null);
  };

  const switchTurn = () => {
    setCurrentTurn(currentTurn === 'player1' ? 'player2' : 'player1');
  };

  const flipCoin = (choice) => {
    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    setLastResult(result);
    
    const isCorrect = choice === result;
    
    if (isCorrect) {
      setPlayerScores(prevScores => ({
        ...prevScores,
        [currentTurn]: prevScores[currentTurn] + 1
      }));
    }

  
    if (currentTurn === 'player2') {
      setRoundsPlayed(prev => prev + 1);
    }
    
    switchTurn();

    return result;
  };

  return (
    <CoinTossContext.Provider
      value={{
        playerScores,
        setPlayerScores,
        currentTurn,
        setCurrentTurn,
        gameOver,
        setGameOver,
        resetGame,
        flipCoin,
        switchTurn,
        roundsPlayed,
        maxRounds,
        setMaxRounds,
        lastResult
      }}
    >
      {children}
    </CoinTossContext.Provider>
  );
};