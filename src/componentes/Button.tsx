import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import colors from '../../styles/colors';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core';

interface EnviromentButtonProps extends RectButtonProps {
    title: string,
}

export function EnviromentButton({ title, ...rest }: EnviromentButtonProps) {
    const [active, setActive] = useState(title==="jogos" ? false : true)
    const navigation = useNavigation()

    function handlePageElenco(){
      navigation.navigate('Elenco')
    }

    function handlePageJogos(){
        navigation.navigate('Jogos')
      }
  return (
    <View style={styles.butoes}>
        <RectButton
            style={active ? styles.buttonActive : styles.button}
            onPress={handlePageJogos}
        >
        <Text>Jogos</Text>
        </RectButton>

        <RectButton
            style={active ? styles.button : styles.buttonActive}
            onPress={handlePageElenco}
        >
        <Text>Elenco</Text>
        </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.gold_dark,
        height: 50,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginBottom: 10,
        marginRight: 5
    },
    buttonActive: {
        backgroundColor: colors.gold_light,
        height: 50,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginBottom: 10,
        marginRight: 5
    },
    butoes: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        margin:20,
        borderBottomWidth: 1,
    },
})