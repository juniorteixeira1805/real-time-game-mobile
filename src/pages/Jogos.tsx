import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import api from '../services/api'

import ball from '../assets/animations/bollsLoading.json'

import {Patrocinios} from '../componentes/Patrocinios'
import {Loading} from '../componentes/Loading'

import { useNavigation } from '@react-navigation/core';

export default function Jogos() {
  const [jogos, setJogos] = useState(Object)
  const [loading , setLoading] = useState(true)

  const navigation = useNavigation()

  const [parametro, setParametro] = useState<number>(0)

  setTimeout(function(){ setParametro(parametro + 1) }, 5000);

  useEffect((): void => {
    async function getGamers(){
      const response = await api.get("jogos")
      setJogos(response.data)
      setLoading(false)
    }

    getGamers()
  }, [parametro])

  if(loading) return <Loading/>
  
  return (
    <SafeAreaView style={styles.container}>
      <Patrocinios/>
      <FlatList
        style={styles.list}
        data={jogos}
        renderItem={({item}) => (
          <TouchableOpacity  style={styles.button} onPress={() => navigation.navigate('Jogo',{gamerId: item._id})}>
            <View style={styles.gameInfo}>
              {item.tipo === 'Amistoso' ? <Text style={styles.gameInfoTitle}>⚽ {item.tipo}</Text> : <Text style={styles.gameInfoTitle}><Image source={{ uri: `https://guerreiros.herokuapp.com/logoTorneios/${item.tipo}` }} style={styles.image} /> {item.tipo.replace(".png", "").replace(".jpg", "").replace("-", " ").replace("-", " ").replace("-", " ")}</Text>}
              {
              item.status === "Marcado" ? 
              <Text style={styles.gameInfoSubtitle}>{item.dateGamer} - {item.hourGame}</Text>
              :  item.status === "Jogo finalizado" ?
              <Text style={styles.gameInfoSubtitle}>{item.status}</Text> 
              : 
              <Text style={styles.gameInfoSubtitle}>{item.time}</Text> 
              }
            </View>

            <View style={styles.content}>
              <View>
                <View style={styles.clubs}>
                  <Image
                    source={{uri: 'https://guerreiros.herokuapp.com/LogoClubs/guerreiros.png'}}
                    style={styles.image}
                  />
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.title}>Guerreiros</Text>
                    <Text style={styles.title}></Text>
                  </View>
                </View>
    
                <View style={styles.clubs}>
                  <Image
                    source={{uri: item.adversary.avatar}}
                    style={styles.image}
                  />
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.title}>{item.adversary.name}</Text>
                    <Text style={styles.title}></Text>
                  </View>
                </View>
              </View>
    
              <View style={{ flex:1, justifyContent:"center", alignItems: 'center', maxWidth: 100}}>
                {
                item.status === "Marcado" ?
                <Text style={styles.subtitle}>{item.local}</Text> 
                : 
                <View style={{ flex:1, justifyContent:"space-around", alignItems: 'center'}}>
                  <Text style={styles.subtitle}>{(item.goals.filter((obj: any) => obj.club === "Guerreiros")).length}</Text>
                  <Text style={styles.subtitle}>{(item.goals.filter((obj: any) => obj.club !== "Guerreiros")).length}</Text> 
                </View>
                }
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
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 40,
  },
  list: {
    flex: 1,
    width: '100%',
  },
  button: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.gold_dark,
    padding: 10,
    marginBottom: 5
  },


  gameInfo: {
    paddingBottom: 4,
    width: '100%',
    borderBottomWidth: 1,
  },
  gameInfoTitle: {
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.white,
  },
  gameInfoSubtitle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    fontFamily: fonts.text,
    opacity: 0.5,
    color: colors.white,
  },


  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontFamily: fonts.text,
    maxWidth: 175,
    marginLeft: 15,
  },
  subtitle: {
    color: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontFamily: fonts.text,
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
