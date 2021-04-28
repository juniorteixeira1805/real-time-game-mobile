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

import { useNavigation } from '@react-navigation/core';
import fonts from '../../styles/fonts';

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
                    Guerreiros é um time de futsal de Nova Cruz, localizado no Rio Grande do Norte,
                    fundado em 2009 por Raniery Kennedi com a finalidade de se divertir com os amigos.
                </Text>
                <Text style={style.subtitle}>
                    Entretando, ao longo do tempo, participou de alguns campeonatos locais como copas agrestes
                    e campeonatos municipais. Ganhou algumas taças ao longo desse tempo e, com isso, o time foi, gradativamente,
                    crescendo.
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
    },
    buttonText: {
        fontSize: 20,
        color: colors.gold_light,
        fontFamily: fonts.text
    }
})