import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, FlatList, Dimensions } from 'react-native';

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
    time: String,
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
      player: String,
      club: String,
      assistance: String | undefined,
      time: String,
    }],
    cards: [{
      _id: String,
      player: String,
      club: any,
      color: String | undefined,
      time: String,
    }],
    escalacao: [{
      _id: String,
      name: String | undefined,
      posicao: String | undefined
    }] | undefined
    dateGamer: String,
    hourGame: String,
}

export default function Jogo({route}: Props) {
  const navigation = useNavigation()

  const [lances , setLances] = useState(true)
  const [eventos , setEventos] = useState(false)
  const [escalacao , setEscalacao] = useState(false)

  const [loading , setLoading] = useState(true)
  const [jogo, setJogo] = useState<Jogo>()
  const [event, setEvent] = useState<any>()
  const [golsAd, setGolsAd] = useState<any>(Number)
  const [golsGr, setGolsGr] = useState<any>(Number)
  const [parametro, setParametro] = useState<number>(0)


  setTimeout(function(){ setParametro(parametro + 1) }, 5000);

  useEffect((): void => {
      async function getGamers(){
        const response = await api.get(`jogo/${route.params.gamerId}`)
        setJogo(response.data)

        let golAdver = await response?.data.goals.filter((objeto: any) => objeto.club !== 'Guerreiros')
        setGolsAd(golAdver?.length)
        let gol = await response?.data.goals.filter((objeto: any) => objeto.club === 'Guerreiros')
        setGolsGr(gol?.length)

        const evts = response.data.goals.concat(response.data.cards)

        evts.sort(function (a: any, b: any) {
          if (a.time > b.time) {
            return 1;
          }
          if (a.time < b.time) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        setEvent(evts)
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
            {jogo?.status === "Marcado" ?
            <Text style={styles.placarSubTitle}>{jogo?.status}</Text> : 
            jogo?.status === "Intervalo" ? 
            <Text style={styles.placarSubTitle}>Intervalo '</Text> : 
            jogo?.status === "Jogo finalizado" ? <Text style={styles.placarSubTitle}>Jogo finalizado</Text> : 
            <Text style={styles.placarSubTitle}>{jogo?.time}</Text>
            }
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
            <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.4} 
            onPress={() => navigation.navigate('Streamer',{link: jogo?.streamer})}>
              <Text style={styles.buttonText}>Assista ao jogo</Text>
            </TouchableOpacity>
        }

        {
        jogo?.status === "Marcado" ?
          <View style={styles.info}>
            <View style={styles.cardInfo}>
              <Text style={styles.infoTitle}>⌚ Início</Text>
              <Text style={styles.infoSubTitle}>{jogo?.dateGamer} - {jogo?.hourGame}</Text>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.infoTitle}>🗺 Local</Text>
              <Text style={styles.infoSubTitle}>{jogo?.local}</Text>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.infoTitle}>⚽ Tipo</Text>
              <Text style={styles.infoSubTitle}>{jogo?.tipo}</Text>
            </View>
          </View>
          :
          jogo?.status === "Jogo finalizado" ?
          <View style={styles.info}>
            <View style={styles.cardInfo}>
              <Text style={styles.infoTitle}>⌚ Início</Text>
              <Text style={styles.infoSubTitle}>{jogo?.dateGamer} - {jogo?.hourGame}</Text>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.infoTitle}>🗺 Local</Text>
              <Text style={styles.infoSubTitle}>{jogo?.local}</Text>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.infoTitle}>⚽ Tipo</Text>
              <Text style={styles.infoSubTitle}>{jogo?.tipo}</Text>
            </View>
          </View>
          :
          undefined
        }

        <View style={styles.options}>
          <TouchableOpacity style={lances ? styles.optionActive : styles.option} onPress={() => { setEscalacao(false), setEventos(false), setLances(true)} }><Text style={lances ? styles.optionTextActive : styles.optionText}>Lance a lance</Text></TouchableOpacity>
          <TouchableOpacity style={eventos ? styles.optionActive : styles.option} onPress={() => { setEscalacao(false), setEventos(true), setLances(false)} }><Text style={eventos ? styles.optionTextActive : styles.optionText}>Eventos</Text></TouchableOpacity>
          <TouchableOpacity style={escalacao ? styles.optionActive : styles.option} onPress={() => { setEscalacao(true), setEventos(false), setLances(false)} }><Text style={escalacao ? styles.optionTextActive : styles.optionText}>Escalação</Text></TouchableOpacity>
        </View>
        {
          lances ?

          <View style={styles.lances}>
          <FlatList
            inverted
            data={jogo?.events}
            renderItem={({item}) => (
              <View style={styles.lance}> 
                <View style={styles.lanceTime}>
                  <Text style={styles.lanceTimeText}>⏱ {item.time}</Text>
                  <View style={styles.linha}></View>
                </View>
                <View style={styles.lanceContent}>
                    {item.event === 'GOOOL' ? 
                    <Text style={item.club === 'Guerreiros' ? styles.lanceTitle : item.club === '' ? styles.lanceTitleNeutro  : styles.lanceTitleAdversari}>{item.event} | {item.player} ⚽ ({item.club})</Text> :
                    item.event === 'Falta' ?
                    <Text style={item.club === 'Guerreiros' ? styles.lanceTitle : item.club === '' ? styles.lanceTitleNeutro  : styles.lanceTitleAdversari}>{item.event} <MaterialCommunityIcons name="whistle" size={20} color="white" />  </Text> 
                    :
                    <Text style={item.club === 'Guerreiros' ? styles.lanceTitle : item.club === '' ? styles.lanceTitleNeutro  : styles.lanceTitleAdversari}>{item.event}</Text>
                    } 
                  <Text style={styles.lanceDescription}>{item.description}</Text>
                  {item.assistance ? <Text style={styles.lanceSecundario}>{`- Assistência de ${item.assistance} 🤵🏽`}</Text> : item.cardColor ? <Text>{`Cartão ${item.cardColor} para ${item.player}`}</Text> : undefined}
                </View>
              </View>)}
            keyExtractor={(item) => item?._id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>

        : eventos ?

        <View style={styles.events}>
          {
          jogo?.bestOfTheMan === "Indefinido" ? undefined :
            <View style={styles.melhorDoJogo}>
              <Text style={styles.melhorDoJogoText}>Melhor do jogo: {jogo?.bestOfTheMan} 👑</Text>
            </View>
          }
          <FlatList
            data={event}
            renderItem={({item}) => (
            <View style={styles.evento}>
              {
              item.color ?
              <Text style={ item.club === 'Guerreiros' ? styles.eventoTitle : styles.eventoTitleAdversari}>⏱ {item.time} | Cartão {item.color}\n{item.player} ({item.club})</Text>
              :
              <Text style={ item.club === 'Guerreiros' ? styles.eventoTitle : styles.eventoTitleAdversari}>⏱ {item.time} | Gol{'\n'} {item.player} ({item.club})</Text>
              }
            </View>)}
            keyExtractor={(item) => item?._id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>

        : escalacao ?

        <FlatList
          data={jogo?.escalacao}
          renderItem={({item}) => (
          <View style={styles.escalacao}>
            <Text style={ styles.eventoTitle }> {item.name} ({item.posicao})</Text>
          </View>)}
          keyExtractor={(item) => item._id.toString()}
          showsVerticalScrollIndicator={false}
        />

        :

            undefined
        }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
// Estilização do container geral
  container: {
    flex: 1,
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  placar: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  placarText: {
    fontSize: 28,
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingHorizontal: 10,
  },
  cardInfo: {
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  infoTitle: {
    fontSize: 14,
    fontFamily: fonts.heading,
    color: colors.white,
  },
  infoSubTitle: {
    fontSize: 12,
    fontFamily: fonts.complement,
    color: colors.white,
  },

//*** Estilização da opções Lance a lance do jogo ***//
  lances: {
    flex: 1,
    backgroundColor: '#413d31',
    borderTopColor: colors.gold,
  },
  lance: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: Dimensions.get('window').width,
  },
  lanceTime: {
    flex: 1,
    alignItems:  'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.2,
  },
  lanceTimeText: {
    alignItems:  'center',
    justifyContent: 'center',
    color: colors.gold_light,
    fontFamily: fonts.heading,
    fontSize: 18
  },
  linha: {
    flex: 1,
    borderRightWidth: 5,
    borderColor: colors.gold_light,
  },
  lanceContent: {
    padding: 20,
    width: Dimensions.get('window').width * 0.8,
    justifyContent:'flex-start',
    alignItems: 'flex-start',
    borderBottomWidth: 2
  },
  lanceTitle: {
    fontSize: 18,
    fontFamily: fonts.heading,
    color: colors.gold_light,
    fontWeight: 'bold',
    paddingVertical: 5
  },
  lanceTitleNeutro: {
    width: '100%',
    fontSize: 16,
    fontFamily: fonts.heading,
    color: 'white',
    fontWeight: 'bold'
  },
  lanceTitleAdversari: {
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.red,
    fontWeight: 'bold'
  },
  lanceDescription:{
    fontSize: 14,
    fontFamily: fonts.text,
    color: colors.white
  },
  lanceSecundario: {
    opacity: 0.9,
    fontSize: 14,
    fontFamily: fonts.complement,
    color: colors.gold_light
  },

//*** Estilização ddo meni opções ***//
  options: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,

  },
  option: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100,
  },
  optionActive: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
  },
  optionText: {
    fontSize: 14,
    fontFamily: fonts.heading,
    color: colors.gold_light
  },
  optionTextActive: {
    fontSize: 14,
    fontFamily: fonts.heading,
    color: colors.gold_dark
  },

  //*** Estilização da opções eventos ***//
  events: {
    flex: 1,
    backgroundColor: colors.gold_dark
  },
  melhorDoJogoText: {
    fontSize: 18,
    fontFamily: fonts.heading,
    color: colors.gold,
  },
  melhorDoJogo: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    minHeight: 75,
    paddingLeft: 25,
    borderWidth: 3,
    borderColor: colors.gold,
  },
  evento: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 25,
    paddingVertical: 10,
    borderBottomWidth: 5,
  },
  eventoTitle: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.gold_light
  },
  eventoTitleAdversari: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.red
  },

  escalacao: {
    flex: 1,
    backgroundColor: colors.gold_dark,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
    fontSize: 28,
    fontFamily: fonts.heading,
    paddingVertical: 10,
    width: Dimensions.get('window').width,
    color: colors.gold_light,
    borderBottomWidth: 2
  }
});
