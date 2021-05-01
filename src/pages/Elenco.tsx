import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Alert} from 'react-native';

import colors from '../../styles/colors';
import { Patrocinios } from '../componentes/Patrocinios';

import { AntDesign } from '@expo/vector-icons'; 
import { Colors } from 'react-native/Libraries/NewAppScreen';

type jogadores = {
  nome: any,
  id: any,
  posicao: any,
  caracteristica: any,
  cidade: any,
  idade: any,
  gols: any,
  assistencias: any
}

const jogadores = [
  {
    nome: 'Messinho',
    id: 1,
    posicao: 'Goleiro',
    caracteristica: 'Destro',
    cidade: 'Nova Cruz/RN',
    idade: ''
  },
  {
    nome:'Jonas Alexandre',
    id: 2,
    posicao: 'Ala',
    caracteristica: 'Canhoto',
    cidade: 'Nova Cruz/RN',
    idade: '',
    gols: 0,
    assistencias: 0
  },
  {
    nome: 'Jefferson',
    id: 3,
    posicao: 'Zagueiro',
    caracteristica: 'Destro',
    cidade: 'Nova Cruz/RN',
    idade: '',
    gols: 0,
    assistencias: 0
  },
  {
    nome: 'Jaime Dantas',
    id: 5,
    posicao: 'Ala',
    caracteristica: 'Destro',
    cidade: 'Nova Cruz/RN',
    idade: '23 anos',
    gols: 0,
    assistencias: 0
  },
  {
    nome: 'Ryan Avelino',
    id: 6,
    posicao: 'Meia',
    caracteristica: 'Destro',
    cidade: 'Nova Cruz/RN',
    idade: '',
    gols: 0,
    assistencias: 0
  },
  {
    nome: 'Luan Araújo',
    id: 7,
    posicao: 'Meia',
    caracteristica: 'Destro',
    cidade: 'Nova Cruz/RN',
    idade: '20',
    gols: 0,
    assistencias: 0
  },
  {
    nome: 'Dário Rodrigues',
    id: 8,
    posicao: 'Atacante',
    caracteristica: 'Destro',
    cidade: 'Nova Cruz/RN',
    idade: '27',
    gols: 0,
    assistencias: 0
  },
  {
    nome: 'Ivson Marques',
    id: 9,
    posicao: 'Meia',
    caracteristica: 'Destro',
    cidade: 'Nova Cruz/RN',
    idade: '',
    gols: 0,
    assistencias: 0
  },
  {
    nome: 'Júnior ventura',
    id: 10,
    posicao: 'Ala',
    caracteristica: 'Destro',
    cidade: 'Nova Cruz/RN',
    idade: '22',
    gols: 0,
    assistencias: 0
  },
  {
    nome: 'Luandson',
    id: 11,
    posicao: 'Atacante',
    caracteristica: 'Destro',
    cidade: 'Nova Cruz/RN',
    idade: '',
    gols: 0,
    assistencias: 0
  },
  {
    nome: 'Rodolfo Oliveira',
    id: 12,
    posicao: 'Ala',
    caracteristica: 'Destro',
    cidade: 'Nova Cruz/RN',
    idade: '20',
    gols: 0,
    assistencias: 0
  },
  {
    nome: 'Raniery',
    id: 13,
    posicao: 'Goleiro',
    caracteristica: 'Destro',
    cidade: 'Nova Cruz/RN',
    idade: '30',
    gols: 0,
    assistencias: 0
  },
  {
    nome: 'David Madureira',
    id: 14,
    posicao: 'Atacante',
    caracteristica: 'Destro',
    cidade: 'Nova Cruz/RN',
    idade: '21',
    gols: 0,
    assistencias: 0
  },
  {
    nome: 'Heitor Felipe',
    id: 15,
    posicao: 'Ala',
    caracteristica: 'Canhoto',
    cidade: 'Nova Cruz/RN',
    idade: '',
    gols: 0,
    assistencias: 0
  },
  {
    nome: 'Vitor Rosa',
    id: 16,
    posicao: 'Ala',
    caracteristica: 'Destro',
    cidade: 'Nova Cruz/RN',
    idade: '26',
    gols: 0,
    assistencias: 0
  },
  {
    nome: 'Vitor Guerra',
    id:17,
    posicao: '',
    caracteristica: '',
    cidade: '',
    idade: '',
    gols: 0,
    assistencias: 0
  },
  {
    nome: 'Vinicius',
    id:18,
    posicao: '',
    caracteristica: '',
    cidade: '',
    idade: '20',
    gols: 0,
    assistencias: 0
  },
  {
    nome: "Felipe Gustavo",
    id: 19,
    Posicao: "Pivô",
    caracteristica: 'Destro',
    cidade: '31',
    gols: 0,
    assistencias: 0
  }
]


export default function Elenco() {

  function alerta(item: jogadores) {
    Alert.alert(
      `Nome: ${item.nome}`,
      `Idade: ${item.idade}\n\nPosição: ${item.posicao}\n\nCaracterística: ${item.caracteristica}\n\nReside em: ${item.cidade}\n\nGols pelo clube: ${item.gols}\n\nAssistências pelo clube: ${item.assistencias}`)
  }

  const [players, setPlayers] = useState<any>(jogadores)

  return (
    <View style={styles.container}>
      <Patrocinios/>

        <SafeAreaView style={styles.list}>
          <FlatList
            data={players ? players : []}
            renderItem={({item}) => (
            <TouchableOpacity style={styles.card} onPress={() => { alerta(item) }}><Text style={styles.subTitle} >{item.nome}</Text><Text style={styles.subTitle}><AntDesign name="arrowright" size={24} color='white' /></Text></TouchableOpacity>)}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
    </View>
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
  subTitle: {
    fontSize: 18,
    color: colors.gold_light,
    fontWeight: '500'
  },
  list: {
    flex: 1,
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 25,
  },
  card: {
    backgroundColor: colors.gold_dark,
    padding: 15,  
    marginBottom:10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
