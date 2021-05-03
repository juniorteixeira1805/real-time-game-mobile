import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Image, Alert} from 'react-native';

import colors from '../../styles/colors';
import api from '../services/api'

import { Patrocinios } from '../componentes/Patrocinios';
import { Loading } from '../componentes/Loading'

import { Entypo } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/core';
import fonts from '../../styles/fonts';

type jogadores = {
  avatar: any
  nome: any,
  _id: any,
  posicao: any,
  caracteristica: any,
  endereco: any,
  ativo: any
  dateCreater: any,

  dados: {
    idade: any,
    gols: any,
    assistencias: any,
    cartaoVermelho: any,
    cartaoAmarelo: any,
  }
}[]

export default function Elenco() {
  const navigation = useNavigation()

  const [players, setPlayers] = useState<jogadores>()
  const [loading , setLoading] = useState(true)
  const [artilheiros, setArtilheiros] = useState<jogadores>()
  const [assist, setAssist] = useState<jogadores>()

  useEffect((): void => {
    async function getGamers(){
        const response = await api.get("jogadores/jogadores")
        setPlayers(response.data)
        setArtilheiros(response.data.filter((obj: any) => obj.dados.gols > 0 ))
        setAssist(response.data.filter((obj: any) => obj.dados.assistencias > 0 ))
        setLoading(false)
    }
    getGamers()
  }, [])

  if(loading) return <Loading/>

  return (
    <SafeAreaView style={styles.container}>
      <Patrocinios/>
        <View >
          <Text style={styles.title}>Elenco</Text>
          <FlatList
            data={players}
            horizontal
            style={styles.list}
            renderItem={({item}) => (
            <TouchableOpacity style={styles.card} onPress={() => Alert.alert(`Em breve você poderá ver o perfil de ${item.nome}`) /*navigation.navigate('Jogo',{gamerId: item._id})*/}>
              <Image
                  source={{uri: item.avatar}}
                  style={styles.image}
              />
              <Text style={styles.subTitle} >{item.nome}</Text>
              <Text style={styles.subTitle}>{item.posicao}</Text>
            </TouchableOpacity>)}
            keyExtractor={(item) => item._id.toString()}
          />
        </View>
        <View style={styles.cardTable}>
          <Text style={styles.title}>Artilheiros</Text>
          <FlatList
            data={artilheiros}
            style={styles.list}
            renderItem={({item, index}) => (
              <View style={styles.table}>
                  <Text style={styles.tableText}>{index+1}</Text>
                  <Text style={styles.tableText} >{item.nome}</Text>
                  {item.dados.gols > 1 ? <Text style={styles.tableText}>{item.dados.gols} Gols</Text> : <Text style={styles.tableText}>{item.dados.gols} Gol</Text>}
              </View>
            )}
            keyExtractor={(item) => item._id.toString()}
          />
        </View>
        <View style={styles.cardTable}>
          <Text style={styles.title}>Líderes em assistências</Text>
          <FlatList
            data={assist}
            style={styles.list}
            renderItem={({item, index}) => (
              <View style={styles.table}>
                  <Text style={styles.tableText}>{index+1}</Text>
                  <Text style={styles.tableText} >{item.nome}</Text>
                  {item.dados.gols > 1 ? <Text style={styles.tableText}>{item.dados.assistencias} Assist.</Text> : <Text style={styles.tableText}>{item.dados.assistencias} Assist.</Text>}
              </View>
            )}
            keyExtractor={(item) => item._id.toString()}
          />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
    paddingTop: 40
  },
  subTitle: {
    fontSize: 16,
    color: colors.gold_light,
    fontFamily: fonts.text
  },
  title :{
    fontSize: 22,
    color: colors.gold,
    fontFamily: fonts.heading,
    marginLeft: 15,
  },
  list: {
    maxHeight:200
  },
  card: {
    backgroundColor: colors.gold_dark,
    padding: 15,
    minWidth: 150,
    marginHorizontal:10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'justify',
    marginBottom: 5
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 50
  },
  table: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableText: {
    fontSize: 18,
    color: colors.gold_light,
    fontFamily: fonts.text,
    marginHorizontal: 20,
  },
  cardTable: {
    marginTop: 10,
    backgroundColor: colors.gold_dark,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'justify'
  }
});
