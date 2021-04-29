import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';
import LottiView from  'lottie-react-native'

import {Patrocinios} from '../componentes/Patrocinios'

import colors from '../../styles/colors';
import api from '../services/api'

import { useNavigation } from '@react-navigation/core';
import fonts from '../../styles/fonts';

import ball from '../assets/animations/bollsLoading.json'

export default function Jogos() {
  const [jogos, setJogos] = useState(Object)

  const navigation = useNavigation()

  useEffect(() => {
    try {
      async function getGamers(){
        const response = await api.get("jogos")
        setJogos(response.data)
      }
      getGamers()
    } catch (error) {
      console.log(error)
    }
  }, [jogos])
  
  return (
    <SafeAreaView style={styles.container}>
      <Patrocinios/>
      <FlatList
        style={styles.list}
        inverted
        data={jogos}
        renderItem={({item}) => (
          <TouchableOpacity  style={styles.button} onPress={(item) => {
            alert(item)
          }}>
            <View style={styles.gameInfo}>
              {item.tipo === 'Amistoso' ? <Text style={styles.gameInfoTitle}>⚽ {item.tipo}</Text> : <Text style={styles.gameInfoTitle}><Image source={{uri: `https://guerreiros.herokuapp.com/logoTorneios/${item.tipo}.png`}} style={styles.image}/> {item.tipo}</Text> }
              <Text style={styles.gameInfoSubtitle}>{item.dateGamer} - {item.hourGame}</Text>
            </View>

            <View style={styles.content}>
              <View>
                <View style={styles.clubs}>
                  <Image
                    source={{uri: 'https://guerreiros.herokuapp.com/LogoClubs/guerreiros.png'}}
                    style={styles.image}
                  />
                  <Text style={styles.title}>Guerreiros</Text>
                </View>
    
                <View style={styles.clubs}>
                  <Image
                    source={{uri: item.adversary.avatar}}
                    style={styles.image}
                  />
                  <Text style={styles.title}>{item.adversary.name}</Text>
                </View>
              </View>
    
              <View style={{justifyContent:"center", alignItems: 'center'}}>
                {item.status === "Marcado" ? <Text style={styles.subtitle}>{item.local}</Text> : item.status === "Primeiro" ? <Text style={styles.subtitle}>Primeiro tempo<LottiView source={ball} autoPlay loop style={styles.animation}/></Text> : item.status === "Intervalo" ? <Text style={styles.subtitle}>Intervalo '</Text> : item.status === "Segundo" ? <Text style={styles.subtitle}>Segundo tempo<LottiView source={ball} autoPlay loop style={styles.animation}/></Text> : <Text style={styles.subtitle}>Jogo finalizado</Text>}
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50
  },
  list: {
    flex: 1,
    width: '100%',
  },
  button: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.gold_light,
    padding: 10,
    borderBottomWidth: 5,
  },


  gameInfo: {
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


  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontFamily: fonts.text,
    maxWidth: 175,
    marginLeft: 15
  },
  subtitle: {
    maxWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    fontFamily: fonts.complement,
    opacity: 0.5,
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

  animation: {
    height: 25,
  }
});
