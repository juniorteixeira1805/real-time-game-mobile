import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView , TouchableOpacity, Image, Alert} from 'react-native';

import colors from '../../styles/colors';
import api from '../services/api'

import { Patrocinios } from '../componentes/Patrocinios';
import { Loading } from '../componentes/Loading'

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
  const [dados, setDados] = useState<any>()

  const [elenco , setElenco] = useState(true)

  useEffect((): void => {
    async function getGamers(){
        const response = await api.get("jogadores/jogadores")
        response.data.sort(function (a: any, b: any) {
          if (a.posicao > b.posicao) {
            return 1;
          }
          if (a.posicao < b.posicao) {
            return -1;
          }
          return 0;
        });
        const res = await api.get("equipe/dados")
        setDados(res.data)
        setPlayers(response.data)
        setLoading(false)
    }
    getGamers()
  }, [])

  if(loading) return <Loading/>

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Patrocinios/>
      <View style={styles.options}>
        <TouchableOpacity style={elenco ? styles.optionActive : styles.option} onPress={() => { setElenco(true)} }><Text style={elenco ? styles.optionTextActive : styles.optionText}>Elenco</Text></TouchableOpacity>
        <TouchableOpacity style={elenco ? styles.option : styles.optionActive} onPress={() => { setElenco(false)} }><Text style={elenco ? styles.optionText : styles.optionTextActive}>Estátisticas</Text></TouchableOpacity>
      </View>
      {
        elenco ?
          <View>
            <FlatList
              data={players}
              renderItem={({item}) => (
              <TouchableOpacity style={styles.card} onPress={() => Alert.alert(`Em breve você poderá ver o perfil de ${item.nome}`) /*navigation.navigate('Jogo',{gamerId: item._id})*/}>
                <Image
                    source={{uri: item.avatar}}
                    style={styles.image}
                />
                <View>
                  <Text style={styles.TextCard} >{item.nome}</Text>
                  <Text style={styles.TextCard}>{item.posicao}</Text>
                </View>
              </TouchableOpacity>)}
              keyExtractor={(item) => item._id.toString()}
            />
          </View>
        :
          <View>
            <View style={styles.infos}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.title}>Estatística</Text>
              </View>
              <View style={styles.dados}>
                <Text style={styles.TextInfos}>Jogos: {dados.jogos}</Text>
                <Text style={styles.TextInfos}>Aproveitamento: {dados.aproveitamento}%</Text>
              </View>
              <View style={styles.dados}>
                <Text style={styles.TextInfos}>Vitórias: {dados.vitorias}</Text>
                <Text style={styles.TextInfos}>Derrotas: {dados.derrotas}</Text>
                <Text style={styles.TextInfos}>Empates: {dados.empates}</Text>
              </View>
              <View style={styles.dados}>
                <Text style={styles.TextInfos}>Gols marcados: {dados.golsMarcados}</Text>
                
                <Text style={styles.TextInfos}>Média por jogo: {dados.golsFeitosPorJogo}</Text>
              </View>
              <View style={styles.dados}>
                <Text style={styles.TextInfos}>Gols sofridos: {dados.golsSofridos}</Text>
                
                <Text style={styles.TextInfos}>Média por jogo: {dados.golsSofridosPorJogo}</Text>
              </View>
              <View style={styles.dados}>
                <Text style={styles.TextInfos}>Cartões amarelos: {dados.cartoesAmarelos}</Text>
                
                <Text style={styles.TextInfos}>Média por jogo: {dados.cartaoAmareloPorJogo}</Text>
              </View>
              <View style={styles.dados}>
                <Text style={styles.TextInfos}>Cartões vermelhos: {dados.cartoesVermelhos}</Text>
                
                <Text style={styles.TextInfos}>Média por jogo: {dados.cartoesVermelhosPorJogo}</Text>
              </View>
            </View>

            <View style={styles.cardTable}>
              <Text style={styles.title}>Artilheiros</Text>
              <FlatList
                data={dados.artilheiros}
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
                data={dados.assistencias}
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
          </View>
      }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
/* ------ ESTILIZAÇÃO DO CONTAINER -------- */
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#262626',
    justifyContent: 'flex-start'
  },

/* ------ ESTILIZAÇÃO DE TEXTOS -------- */
  title :{
    fontSize: 24,
    color: colors.gold,
    fontFamily: fonts.heading,
  },

  /* ------ ESTILIZAÇÃO DO CARD ELENCO -------- */
  card: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.gold_dark,
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginRight: 30
  },
  TextCard: {
    fontSize: 22,
    color: colors.gold_light,
    fontFamily: fonts.text
  },

  /* ------ ESTILIZAÇÃO DA TABELA -------- */
  cardTable: {
    margin: 20,
    backgroundColor: colors.gold_dark,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'justify',
    borderRadius: 10,
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

  // ------ ESTILIZAÇÃO DAS OPÇÕES ------- //
  options: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal:10,
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
    fontSize: 18,
    fontFamily: fonts.heading,
    color: colors.gold_light
  },
  optionTextActive: {
    fontSize: 18,
    fontFamily: fonts.heading,
    color: colors.gold_dark
  },

/* ------ ESTILIZAÇÃO DO DAS INFORMAÇÕES -------- */
  infos: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.gold_dark,
    margin: 10,
    borderRadius: 10,
  },
  dados: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: fonts.heading,
    paddingVertical: 5,
  },
  TextInfos: {
    fontSize: 18,
    color: colors.gold_light,
    fontFamily: fonts.heading,
  },
});
