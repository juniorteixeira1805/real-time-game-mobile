import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Image } from 'react-native';

import colors from '../../styles/colors';
import { Patrocinios } from '../componentes/Patrocinios';

import fonts from '../../styles/fonts';

type news = [
    {
        _id: String
        title: String | undefined,
        description: String | undefined,
        images: String | any,
        author: any | undefined,
        date: any | undefined,
    }
]

const noticias: news = [
    {
        _id: '0',
        title: 'AMISTOSO DE PREPARAÇÃO',
        description: 'Guerreiros da início a pré temporada e joga amistoso neste Sábado (01/05), contra o Vila Nova Esporte Clube de Pedro Velho/RN. O jogo acontecerá no Arenna Soccer localizado em Nova Cruz.',
        images: 'Inativo',
        author: 'Teixeira, Junior',
        date: '01/05/2021'
    }
]

export default function News() {

    const [news, setNews] = useState<news>(noticias)

    return (
        <View style={styles.container}>
            <Patrocinios/>

            <SafeAreaView style={styles.list}>
            <FlatList
                data={news ? news : []}
                renderItem={({item}) => (
                    <View style={styles.card} >
                        <Text style={styles.title} >{item?.title}</Text>
                        <Text style={styles.subTitle}>{item?.description}</Text>
                        {
                            item.images === 'Inativo'
                            ?
                            undefined
                            :
                            <Image
                                source={{uri: item.images}}
                                style={styles.image}
                            />
                        }

                        <View style={styles.footer}>
                            <Text style={styles.footerTitle}>Por: {item?.author}</Text>
                            <Text style={styles.footerTitle}>{item?.date}</Text>
                        </View>
                    </View>)}
                keyExtractor={(item) => item._id.toString()}
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
        justifyContent: 'space-between',
    },
    subTitle: {
        fontSize: 14,
        color: colors.gold_light,
        fontFamily: fonts.text,
        textAlign: 'justify'
    },
    title: {
        fontSize: 18,
        color: colors.gold_light,
        fontFamily: fonts.heading
    },
    image:{
        width: 250,
    },
    footer: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    footerTitle: {
        fontSize: 10,
        color: colors.gold_light,
        fontFamily: fonts.text,
        opacity: 0.5,

    }
});
