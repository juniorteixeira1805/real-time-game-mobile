import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import colors from '../../styles/colors';
import { Patrocinios } from '../componentes/Patrocinios';

type jogadores = {
  nome: any,
  id: any,
  posicao: any,
  pe: any,
  cidade: any,
  idade: any
}

const jogadores = [
  {
    nome: 'Messinho',
    id: 1,
    posicao: 'goleiro',
    pe: 'direito',
    cidade: 'Nova Cruz/RN',
    idade: ''
  },
  {
    nome:'Jonas Alexandre',
    id: 2,
    posicao: 'Ala',
    pe: 'Esquerdo',
    cidade: 'Nova Cruz/RN',
    idade: ''
  },
  {
    nome: 'Jefferson',
    id: 3,
    posicao: 'Zagueiro',
    pe: 'Direito',
    cidade: 'Nova Cruz/RN',
    idade: ''
  },
  {
    nome: 'Jaime Dantas',
    id: 5,
    posicao: 'Ala',
    pe: 'Direito',
    cidade: 'Nova Cruz/RN',
    idade: '23 anos'
  },
  {
    nome: 'Ryan Avelino',
    id: 6,
    posicao: 'Meia',
    pe: 'Direito',
    cidade: 'Nova Cruz/RN',
    idade: ''
  },
  {
    nome: 'Luan Araújo',
    id: 7,
    posicao: 'Meia',
    pe: 'Direito',
    cidade: 'Nova Cruz/RN',
    idade: '20'
  },
  {
    nome: 'Dário Rodrigues',
    id: 8,
    posicao: 'Atacante',
    pe: 'Direito',
    cidade: 'Nova Cruz/RN',
    idade: '27'
  },
  {
    nome: 'Ivson Marques',
    id: 9,
    posicao: 'Meia',
    pe: 'Direito',
    cidade: 'Nova Cruz/RN',
    idade: ''
  },
  {
    nome: 'Júnior ventura',
    id: 10,
    posicao: 'Ala',
    pe: 'Direito',
    cidade: 'Nova Cruz/RN',
    idade: '22'
  },
  {
    nome: 'Luandson',
    id: 11,
    posicao: 'atacante',
    pe: 'Direito',
    cidade: 'Nova Cruz/RN',
    idade: ''
  },
  {
    nome: 'Rodolfo Oliveira',
    id: 12,
    posicao: 'ala',
    pe: 'Direito',
    cidade: 'Nova Cruz/RN',
    idade: '20'
  },
  {
    nome: 'Raniery',
    id: 13,
    posicao: 'Goleiro',
    pe: 'Direito',
    cidade: 'Nova Cruz/RN',
    idade: '30'
  },
  {
    nome: 'David Madureira',
    id: 14,
    posicao: 'Atacante',
    pe: 'Direito',
    cidade: 'Nova Cruz/RN',
    idade: '21'
  },
  {
    nome: 'Heitor Filipe',
    id: 15,
    posicao: 'Ala',
    pe: 'Esquerdo',
    cidade: 'Nova Cruz/RN',
    idade: ''
  },
  {
    nome: 'Vitor Rosa',
    id: 16,
    posicao: 'Ala',
    pe: 'Direito',
    cidade: 'Nova Cruz/RN',
    idade: '26'
  },
  {
    nome: 'Vitor Guerra',
    id:17,
    posicao: '',
    pe: '',
    cidade: '',
    idade: ''
  },
  {
    nome: 'Vinicius',
    id:18,
    posicao: '',
    pe: '',
    cidade: '',
    idade: '20'
  }
]


export default function Elenco() {

  function alerta(item: jogadores) {
    Alert.alert(
      `Nome: ${item.nome}`,
      `Idade: ${item.idade}\n\nPosição: ${item.posicao}\n\nPé: ${item.pe}\n\nLocalização: ${item.cidade}`)
  }

  const [players, setPlayers] = useState<any>(jogadores)

  return (
    <View style={styles.container}>
      <Patrocinios/>

        <SafeAreaView style={styles.list}>
          <FlatList
            data={players ? players : []}
            renderItem={({item}) => (
            <TouchableOpacity style={styles.card} onPress={() => { alerta(item) }}><Text style={styles.subTitle} >{item.nome}</Text><Text style={styles.subTitle}>x</Text></TouchableOpacity>)}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50
  },
  title: {
    margin: 10,
    fontSize: 38,
    color: colors.body_light,
    fontWeight: 'bold'
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
    borderBottomWidth: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
