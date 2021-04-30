import React from 'react';
import { StyleSheet, View } from 'react-native';

import LottiView from  'lottie-react-native'

import animation from '../assets/animations/ani.json'

export function Loading() {
  return (
      <LottiView
        source={animation}
        autoPlay
        loop
        style={styles.animation}
      />
  );
}

const styles = StyleSheet.create({
  animation: {
    flex:1,
  }
})