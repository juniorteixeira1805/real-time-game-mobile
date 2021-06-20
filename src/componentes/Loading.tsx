import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import LottiView from  'lottie-react-native'

import animation from '../assets/animations/ani.json'
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import Animated from 'react-native-reanimated';

export function Loading() {
  return (
    <View style={styles.container}>
      <LottiView
        source={animation}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.text}>Aguarde</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#262626',
    padding: 50,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 40,
  },
  animation: {
  },
  text: {
    fontSize:  30,
    fontFamily: fonts.heading,
    color: colors.gold_light
  }
})