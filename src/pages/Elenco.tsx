import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import colors from '../../styles/colors';
import { Patrocinios } from '../componentes/Patrocinios';

const jogadores = [
  {nome: 'Messinho', id: 1},
  {nome: 'Jonas', id: 2},
  {nome: 'Pajé', id: 3},
  {nome: 'Jaime', id: 5},
  {nome: 'Ryan', id: 6},
  {nome: 'Luan', id: 7},
  {nome: 'Dário', id: 8},
  {nome: 'Ivson', id: 9},
  {nome: 'Puf', id: 10},
  {nome: 'Luandson', id: 11},
  {nome: 'Rodolfinho', id: 12},
  {nome: 'Raniery', id: 13},
  {nome: 'David', id: 14},
  {nome: 'Heitor', id: 15},
  {nome: 'Vitor Guerra', id:16}
]

export default function Elenco() {

  const [players, setPlayers] = useState(jogadores)

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
        <SafeAreaView style={styles.list}>
          <FlatList
            data={players}
            renderItem={({item}) => (
            <View style={styles.card}><Text style={styles.subTitle} >{item.nome}</Text></View>)}
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
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 25,
  },
  card: {
    flex: 1,
    backgroundColor: colors.gold_dark,
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
    padding: 15
  }
});
