import React, { useState } from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    View,
    Linking
} from 'react-native';

import pix from '../assets/icons/pix.png'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import { AntDesign } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/core';
import Clipboard from 'expo-clipboard';

export function Welcome() {
    const [alert, setAlert] = useState(false)
    const navigation = useNavigation()

    function handleStart(){
        navigation.navigate('Jogos')
    }

    function handleClick(){
        Clipboard.setString('84991712439')
        setAlert(true)
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.wrapper}>
                <View>
                    <Image source={pix} style={style.image} resizeMode="contain"/>
                    <Text style={style.title}>
                        CHAVE PIX:
                    </Text>
        
                    <TouchableOpacity activeOpacity={0.4} onPress={handleClick}>
                        <Text style={style.title}>84991712439</Text>
                    </TouchableOpacity>
                </View>
                {
                    alert ?
                    <Text style={style.alert}>Chave copiada!</Text>
                    :
                    undefined
                }
                <Text style={style.subtitle}>
                    Os planos de socios torcedores estão sendo desenvolvidos. Mas, enquando não estão prontos, você pode nos ajudar e ser parte de cada vitória.
                </Text>

                <TouchableOpacity style={style.button} activeOpacity={0.4} onPress={handleStart}>
                    <Text style={style.buttonText}><AntDesign name="right" size={26} color={colors.gold_light} /></Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.footer} onPress={() => Linking.openURL('https://www.linkedin.com/in/gilvan-carlos/')}>
                    <Text style={style.footerText}>From</Text>
                    <Text style={style.footerTextSecondary}>Junior Teixeira </Text>
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
        lineHeight: 28,
        color: colors.gold_light,
        fontFamily: fonts.text
    },
    title: {
        fontSize:22,
        color: colors.gold,
        fontFamily: fonts.heading,
        alignSelf: 'center',
    },
    image: {
        height: Dimensions.get('window').width * 0.5
    },
    button: {
        backgroundColor: colors.gold_dark,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        marginBottom: 10,
        height: 60,
        width: 100,
        borderBottomWidth: 2,
        borderBottomColor: colors.gold,
    },
    buttonText: {
        fontSize: 20,
        color: colors.gold_light,
        fontFamily: fonts.text
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerText: {
        fontSize: 18,
        fontFamily: fonts.heading,
        color: colors.gold,
        opacity: 0.7
    },
    footerTextSecondary: {
        fontSize: 15,
        textDecorationLine: 'underline',
        fontFamily: fonts.text,
        color: colors.gold,
        opacity: 0.7,
    },
    alert: {
        fontSize: 12,
        fontFamily: fonts.text,
        color: colors.gray,
        backgroundColor: colors.gold_dark,
        borderRadius: 10,
        padding: 5,
        borderTopLeftRadius: 0,
        marginTop: -50,
        marginLeft: 150
    }
})