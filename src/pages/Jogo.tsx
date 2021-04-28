import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import LottiView from  'lottie-react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import {Patrocinios} from '../componentes/Patrocinios'

import colors from '../../styles/colors';

import logoUm from '../assets/guerr.png'
import logoTreis from '../assets/psg.jpg'

import ball from '../assets/animations/bollsLoading.json'

import fonts from '../../styles/fonts';
import { useNavigation } from '@react-navigation/core';

const eventos = [
  {
    id: '1',
    event: 'Inicio primeiro',
    description: '',
    player: '',
    assistance: '',
    club: '',
    time: '00:00',
    cardColor: '',
  },
  {
    id: '2',
    event: 'Falta',
    description: 'Ivison recebe no meio campo, tentar sair jogando, mas recebe a falta.',
    player: 'Jogador adversário',
    assistance: '',
    club: 'PSG',
    time: '02:33',
    cardColor: '',
  },
  {
    id: '3',
    event: 'Escanteio',
    description: 'Jogador do PSG arrisca de longe, mas Raniery espalma e coloca a bola para o escanteio.',
    player: 'Jogador adversário',
    assistance: '',
    club: 'PSG',
    time: '05:56',
    cardColor: 'amarelo',
  },
  {
    id: '4',
    event: 'GOOOL',
    description: 'Rodolfinho tabela com Luan na intermediária esquerda, bate tirando do golero e acerta o ângulo.',
    player: 'Rodolfinho',
    assistance: 'Luan',
    club: 'Guerreiros',
    time: '07:08',
    cardColor: '',
  },
  {
    id: '5',
    event: 'Falta',
    description: 'Contrataque do PSG, mas puff faz a falta para impedir a chance de gol',
    player: 'Puff',
    assistance: '',
    club: 'Guerreiros',
    time: '11:24',
    cardColor: '',
  },
  {
    id: '6',
    event: 'GOOOL',
    description: 'o número 10 do PSG bate a falta e marca.',
    player: '',
    assistance: '',
    club: 'PSG',
    time: '12:56',
    cardColor: '',
  },
  {
    id: '7',
    event: 'Pênalte',
    description: 'Ivisson recebe na intermediária, corta para dentro, mas o jogador do PSG o derruba',
    player: '',
    assistance: '',
    club: 'PSG',
    time: '16:33',
    cardColor: '',
  },
  {
    id: '8',
    event: 'GOOOL',
    description: 'Ivison bate o pênalte no meio e marca.',
    player: 'Ivison',
    assistance: '',
    club: 'Guerreiros',
    time: '18:01',
    cardColor: '',
  },
  {
    id: '9',
    event: 'Fim primeiro',
    description: '',
    player: '',
    assistance: '',
    club: '',
    time: '',
    cardColor: '',
  },
]


type RootStackParamList = {
  Jogo: {gamerId: String}
};

type JogoScreenRouteProp = RouteProp<RootStackParamList, 'Jogo'>;

type Props = {
    route: JogoScreenRouteProp,
};

export default function Jogo({route}: Props) {
  const navigation = useNavigation()

  function handleStart(){
    navigation.navigate('Streamer')
  }
  return (
    <SafeAreaView style={styles.container}>
        <Patrocinios/>
        <View style={styles.header}>
          <View style={styles.headerClub}>
            <Image
                  source={logoUm}
                  style={styles.image}
            />
            <Text style={styles.headerText}>Guerreiros</Text>
          </View>
            <View style={styles.placar}>
              <Text style={styles.placarText}>1 : 0</Text>
              <LottiView
                source={ball}
                autoPlay
                loop
                style={styles.animation}
              />
            </View>
            <View style={styles.headerClub}>
              <Image
                  source={logoTreis}
                  style={styles.image}
              />
              <Text style={styles.headerText}>PSG</Text>
            </View>
        </View>

        <TouchableOpacity style={styles.button} activeOpacity={0.4} onPress={handleStart}>
            <Text style={styles.buttonText}>Assista ao vivo</Text>
        </TouchableOpacity>

        <View style={styles.info}>
          <View>
            <Text style={styles.infoTitle}>⌚ Início</Text>
            <Text style={styles.infoSubTitle}>Sábado 01/05 - 17:00</Text>
          </View>

          <View>
            <Text style={styles.infoTitle}>🗺 Local</Text>
            <Text style={styles.infoSubTitle}>Arena Soccer Nova Cruz/RN</Text>
          </View>

          <View>
            <Text style={styles.infoTitle}>⚽ Tipo</Text>
            <Text style={styles.infoSubTitle}>Amistoso</Text>
          </View>
        </View>

        <View style={styles.events}>
          <FlatList
            inverted
            data={eventos}
            renderItem={({item}) => (
            <View style={styles.evento}>
              { item.event === 'Inicio primeiro' ? <Text style={ item.club === 'Guerreiros' ? styles.eventoTitle : item.club === '' ? styles.eventoTitleNeutro  : styles.eventoTitleAdversari}>⏱ Início da partida</Text> : item.event === 'Fim primeiro' ? <Text style={ item.club === 'Guerreiros' ? styles.eventoTitle : item.club === '' ? styles.eventoTitleNeutro  : styles.eventoTitleAdversari}>⏱ Intervalo</Text> : item.event === 'Inicio segundo' ? <Text style={ item.club === 'Guerreiros' ? styles.eventoTitle : item.club === '' ? styles.eventoTitleNeutro  : styles.eventoTitleAdversari}>⏱ Início do segundo tempo</Text> : item.event === 'Fim segundo' ? <Text style={ item.club === 'Guerreiros' ? styles.eventoTitle : item.club === '' ? styles.eventoTitleNeutro  : styles.eventoTitleAdversari}>⏱ Fim de jogo</Text> : <Text style={item.club === 'Guerreiros' ? styles.eventoTitle : item.club === '' ? styles.eventoTitleNeutro  : styles.eventoTitleAdversari}>⏱ {`${item.time} |`} {item.event === 'GOOOL' ? `${item.event} ⚽` :  item.event === 'Falta' ? <Text>{item.event} <MaterialCommunityIcons name="whistle" size={20} color="black" /></Text> : item.event} - {item.player} ({item.club})</Text>}
              <Text style={styles.eventoDescription}>{item.description}</Text>
              {item.assistance ? <Text style={styles.eventoSecundario}>{`- Assistência de ${item.assistance} 🤵🏽`}</Text> : item.cardColor ? <Text>{`Cartão ${item.cardColor} para ${item.player}`}</Text> : undefined}
            </View>)}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    opacity: 0.9,
    fontSize: 14,
    fontFamily: fonts.complement,
    marginTop: 10
  },
  headerClub: {
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  placarText: {
    fontSize: 32,
    fontFamily: fonts.heading
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
  },
  infoSubTitle: {
    maxWidth:100,
    opacity: 0.8,
    fontSize: 14,
    fontFamily: fonts.complement,
  },

  events: {
    flex: 1,
    backgroundColor: colors.gray
  },
  evento: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 5,
    justifyContent: 'center'
  },
  eventoTitle: {
    fontSize: 18,
    fontFamily: fonts.heading,
    color: colors.gold_light,
    fontWeight: 'bold'
  },
  eventoTitleNeutro: {
    fontSize: 18,
    fontFamily: fonts.heading,
    color: 'white',
    fontWeight: 'bold'
  },
  eventoTitleAdversari: {
    fontSize: 18,
    fontFamily: fonts.heading,
    color: colors.red,
    fontWeight: 'bold'
  },
  eventoDescription:{
    fontSize: 16,
    fontFamily: fonts.text,
  },
  eventoSecundario: {
    opacity: 0.9,
    fontSize: 16,
    fontFamily: fonts.complement,
  }
});
