import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import {Patrocinios} from '../componentes/Patrocinios';
import {Loading} from '../componentes/Loading'

import api from '../services/api';

import { RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

type RootStackParamList = {
  Jogo: {gamerId: String}
};

type JogoScreenRouteProp = RouteProp<RootStackParamList, 'Jogo'>;

type Props = {
    route: JogoScreenRouteProp,
};

interface Jogo {
    adversary: {
      avatar: any,
      name: any
    },
    bestOfTheMan: String,
    tipo: String,
    status: String,
    _id: String,
    date: String,
    local: String,
    dateCreater: String,
    streamer: String,
    events: [{
      _id: String,
      event: String,
      description: String,
      player: String,
      assistance: String,
      club: String,
      time: String,
      cardColor: String,
    }],
    goals: [{
      _id: String,
      club: String,
      player: String,
      assistance: String,
      time: String,
    }],
    cards: [{
      _id: String,
      player: String,
      color: String,
      time: String,
    }],
    dateGamer: String,
    hourGame: String,
}

export default function Jogo({route}: Props) {
  const navigation = useNavigation()

  const [loading , setLoading] = useState(true)
  const [jogo, setJogo] = useState<Jogo>()
  const [golsAd, setGolsAd] = useState<any>(Number)
  const [golsGr, setGolsGr] = useState<any>(Number)
  const [parametro, setParametro] = useState<number>(0)

  setTimeout(function(){ setParametro(parametro + 1) }, 5000);

  useEffect((): void => {
      async function getGamers(){
        const response = await api.get(`jogo/${route.params.gamerId}`)
        setJogo(response.data)

        let golAdver = response?.data.goals.filter((objeto: any) => objeto.club == jogo?.adversary.name)
        let quantGolAdver = golAdver?.length
        setGolsAd(quantGolAdver)
        let gol = response?.data.goals.filter((objeto: any) => objeto.club == 'Guerreiros')
        let quantGol = gol?.length
        setGolsGr(quantGol)

        setLoading(false)
      }

      getGamers()
  },[parametro])

  if(loading) return <Loading/>

  return (
    <SafeAreaView style={styles.container}>
        <Patrocinios/>
        <View style={styles.header}>
          <View style={styles.headerClub}>
            <Image
                  source={{uri: 'https://guerreiros.herokuapp.com/LogoClubs/guerreiros.png'}}
                  style={styles.image}
            />
            <Text style={styles.headerText}>Guerreiros</Text>
          </View>
            <View style={styles.placar}>
              <Text style={styles.placarText}>{golsGr} : {golsAd}</Text>
              {jogo?.status === "Marcado" ? <Text style={styles.placarSubTitle}>{jogo?.status}</Text> : jogo?.status === "Primeiro" ? <Text style={styles.placarSubTitle}>1º tempo</Text> : jogo?.status === "Intervalo" ? <Text style={styles.placarSubTitle}>Intervalo '</Text> : jogo?.status === "Segundo" ? <Text style={styles.placarSubTitle}>2º tempo '</Text> : <Text style={styles.placarSubTitle}>Jogo finalizado</Text>}
            </View>
            <View style={styles.headerClub}>
              <Image
                source={{uri: jogo?.adversary.avatar}}
                style={styles.image}
              />
              <Text style={styles.headerText}>{jogo?.adversary.name}</Text>
            </View>
        </View>

        {
          jogo?.streamer === "Inativo"
          ?
            undefined
          :
            <TouchableOpacity style={styles.button} activeOpacity={0.4} onPress={() => navigation.navigate('Streamer',{link: jogo?.streamer})}>
              <Text style={styles.buttonText}>Assista ao jogo</Text>
            </TouchableOpacity>
        }

        <View style={styles.info}>
          <View>
            <Text style={styles.infoTitle}>⌚ Início</Text>
            <Text style={styles.infoSubTitle}>{jogo?.dateGamer} - {jogo?.hourGame}</Text>
          </View>

          <View>
            <Text style={styles.infoTitle}>🗺 Local</Text>
            <Text style={styles.infoSubTitle}>{jogo?.local}</Text>
          </View>

          <View>
            <Text style={styles.infoTitle}>⚽ Tipo</Text>
            <Text style={styles.infoSubTitle}>{jogo?.tipo}</Text>
          </View>
        </View>
        {jogo?.bestOfTheMan === "Indefinido" ? undefined : <Text style={styles.melhorDoJogo}>Melhor do jogo: {jogo?.bestOfTheMan} 👑</Text>}

        <View style={styles.events}>
          <FlatList
            inverted
            data={jogo?.events}
            renderItem={({item}) => (
            <View style={styles.evento}>
              { item.event === 'Inicio primeiro' ? <Text style={ item.club === 'Guerreiros' ? styles.eventoTitle : item.club === '' ? styles.eventoTitleNeutro  : styles.eventoTitleAdversari}>⏱ Início da partida</Text> : item.event === 'Fim primeiro' ? <Text style={ item.club === 'Guerreiros' ? styles.eventoTitle : item.club === '' ? styles.eventoTitleNeutro  : styles.eventoTitleAdversari}>⏱ Intervalo</Text> : item.event === 'Inicio segundo' ? <Text style={ item.club === 'Guerreiros' ? styles.eventoTitle : item.club === '' ? styles.eventoTitleNeutro  : styles.eventoTitleAdversari}>⏱ Início do segundo tempo</Text> : item.event === 'Fim segundo' ? <Text style={ item.club === 'Guerreiros' ? styles.eventoTitle : item.club === '' ? styles.eventoTitleNeutro  : styles.eventoTitleAdversari}>⏱ Fim de jogo</Text> : <Text style={item.club === 'Guerreiros' ? styles.eventoTitle : item.club === '' ? styles.eventoTitleNeutro  : styles.eventoTitleAdversari}>⏱ {`${item.time} |`} {item.event === 'GOOOL' ? `${item.event} ⚽` :  item.event === 'Falta' ? <Text>{item.event} <MaterialCommunityIcons name="whistle" size={20} color="black" /></Text> : item.event} - {item.player} ({item.club})</Text>}
              <Text style={styles.eventoDescription}>{item.description}</Text>
              {item.assistance ? <Text style={styles.eventoSecundario}>{`- Assistência de ${item.assistance} 🤵🏽`}</Text> : item.cardColor ? <Text>{`Cartão ${item.cardColor} para ${item.player}`}</Text> : undefined}
            </View>)}
            keyExtractor={(item) => item?._id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 12,
    fontFamily: fonts.heading,
    marginTop: 10,
    color: colors.white,
  },
  headerClub: {
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.white,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginHorizontal: 50
  },
  placar: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0
  },
  placarText: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.white,
  },
  placarSubTitle: {
    opacity: 0.9,
    fontSize: 12,
    fontFamily: fonts.complement,
    color: colors.white,
  },
  animation: {
    height: 25,
    width: 100,
  },

  button: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 30,
    width: 120,
  },
  buttonText: {
      fontSize: 14,
      color: colors.gold_light,
      fontFamily: fonts.text
  },

  info:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.white,
  },
  infoSubTitle: {
    maxWidth:100,
    opacity: 0.8,
    fontSize: 14,
    fontFamily: fonts.complement,
    color: colors.white,
  },
  melhorDoJogo: {
    opacity: 0.8,
    fontSize: 14,
    fontFamily: fonts.complement,
    color: colors.white,

  },

  events: {
    flex: 1,
    backgroundColor: '#413d31',
    borderTopWidth: 5,
    borderTopColor: colors.gold
  },
  evento: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 5,
    justifyContent: 'center'
  },
  eventoTitle: {
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.gold,
    fontWeight: 'bold',
  },
  eventoTitleNeutro: {
    width: '100%',
    fontSize: 16,
    fontFamily: fonts.heading,
    color: 'white',
    fontWeight: 'bold'
  },
  eventoTitleAdversari: {
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.red,
    fontWeight: 'bold'
  },
  eventoDescription:{
    fontSize: 14,
    fontFamily: fonts.text,
    color: colors.gold_light
  },
  eventoSecundario: {
    opacity: 0.9,
    fontSize: 14,
    fontFamily: fonts.complement,
    color: colors.gold_light
  }
});
