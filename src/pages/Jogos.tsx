import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import {Patrocinios} from '../componentes/Patrocinios'

import colors from '../../styles/colors';

import logoUm from '../assets/guerr.png'
import logoDois from '../assets/vnec.jpg'
import logoTreis from '../assets/psg.jpg'

import { useNavigation } from '@react-navigation/core';
import fonts from '../../styles/fonts';


export default function Jogos() {

  const navigation = useNavigation()

  function handleStart(){
      navigation.navigate('Jogo', {gamerId: "5d4sa654d65sa4"})
  }
  /*
  useEffect(() => {
    api.get("")
    .then((response) => setGamers(response.data))
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
   });  }, [])
*/
  return (
    <View style={styles.container}>
      <Patrocinios/>
      <TouchableOpacity style={styles.card} onPress={handleStart}>
        <View style={styles.gameInfo}>
          <Text style={styles.gameInfoTitle}>⚽ AMISTOSO</Text>
          <Text style={styles.gameInfoSubtitle}>Sábado 01/05</Text>
        </View>

        <View style={styles.content}>
          <View>
            <View style={styles.clubs}>
              <Image
                source={logoUm}
                style={styles.image}
              />
              <Text style={styles.subTitle}>Guerreiros</Text>
            </View>

            <View style={styles.clubs}>
              <Image
                source={logoDois}
                style={styles.image}
              />
              <Text style={styles.subTitle}>Vila Nova Esporte Clube</Text>
            </View>
          </View>

          <View style={{justifyContent:"center", alignItems: 'center'}}>
            <Text style={styles.gameInfoSubtitle}>17:00{'\n'}Arena soccer</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.card}>
        <View style={styles.gameInfo}>
          <Text style={styles.gameInfoTitle}>⚽ AMISTOSO</Text>
          <Text style={styles.gameInfoSubtitle}>Sábado 08/05</Text>
        </View>

        <View style={styles.content}>
          <View>
            <View style={styles.clubs}>
              <Image
                source={logoUm}
                style={styles.image}
              />
              <Text style={styles.subTitle}>Guerreiros</Text>
            </View>

            <View style={styles.clubs}>
              <Image
                source={logoTreis}
                style={styles.image}
                resizeMode='contain'
              />
              <Text style={styles.subTitle}>PSG</Text>
            </View>
          </View>

          <View style={{justifyContent:"center", alignItems: 'center'}}>
            <Text style={styles.gameInfoSubtitle}>17:00{'\n'}Arena soccer</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50
  },
  card: {
    width: '100%',
    backgroundColor: colors.gold_light,
    padding: 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    marginBottom: 20
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gameInfo: {
    paddingHorizontal: 20,
    paddingBottom: 4,
    width: '100%',
    borderBottomWidth: 1
  },
  gameInfoTitle: {
    fontSize: 16,
    fontFamily: fonts.heading
  },
  gameInfoSubtitle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    fontFamily: fonts.text,
    opacity: 0.5,
  },
  subTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontFamily: fonts.text,
    maxWidth: 175,
    marginLeft: 15
  },
  clubs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginVertical: 10
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 100
  },
});
