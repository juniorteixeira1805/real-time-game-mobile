import React from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    View
} from 'react-native';

import escudo from '../assets/logo/escudo.png'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import { useNavigation } from '@react-navigation/core';

export function Welcome() {

    const navigation = useNavigation()

    function handleStart(){
        navigation.navigate('Jogos')
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.wrapper}>
                <Image source={escudo} style={style.image} resizeMode="contain"/>

                <Text style={style.subtitle}>
                    Guerreiros é um time de futsal da cidade de Nova Cruz, localizada no estado do Rn, 
                    que foi fundado em 2009 com a finalidade de diversão entre amigos.
                </Text>
                <Text style={style.subtitle}>
                    Ao longo do tempo, o time participou de alguns campeonatos locais como copas Agrestes e campeonatos municipais, 
                    conquistando assim algumas taças em sua trajetória. Com isso, os Guerreiros vem crescendo de maneira gradativa 
                    e torna-se pouco a pouco uma equipe de valor e competitiva.
                </Text>

                <TouchableOpacity style={style.button} activeOpacity={0.4} onPress={handleStart}>
                    <Text style={style.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262626',
        paddingVertical: 50
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    subtitle: {
        width: '100%',
        textAlign: 'justify',
        fontSize:16,
        color: colors.gold_light,
        fontFamily: fonts.text
    },
    image: {
        height: Dimensions.get('window').width * 0.5
    },
    button: {
        backgroundColor: colors.gold_dark,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 60,
        width: 150,
        borderBottomWidth: 1,
        borderBottomColor: colors.gold,
    },
    buttonText: {
        fontSize: 20,
        color: colors.gold_light,
        fontFamily: fonts.text
    }
})