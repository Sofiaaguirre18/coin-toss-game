import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Coin = ({ result }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.coin, result === 'heads' ? styles.heads : styles.tails]}>
        <Text style={styles.text}>{result === 'heads' ? 'Heads' : 'Tails'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  coin: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    borderWidth: 2,
    borderColor: '#B8860B',
  },
  heads: {
    backgroundColor: '#FFD700',
  },
  tails: {
    backgroundColor: '#C0C0C0', 
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Coin;