import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, Dimensions } from 'react-native';

import colors from '../../styles/colors';
import { Patrocinios } from '../componentes/Patrocinios';

import {Loading} from '../componentes/Loading'

import fonts from '../../styles/fonts';
import api from '../services/api'

type news = [
    {
        _id: String
        title: String | undefined,
        description: String | undefined,
        images: any,
        author: any | undefined,
        date: any | undefined,
        dateNoticia: any | undefined
    }
]

export default function News() {

    const [news, setNews] = useState<news>()
    const [loading , setLoading] = useState(true)

    useEffect((): void => {
        async function getGamers(){
            const response = await api.get("noticias/noticias")
            setNews(response.data)
            setLoading(false)
        }
        getGamers()
      }, [])

    if(loading) return <Loading/>

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
                        <FlatList
                            data={item.images}
                            horizontal
                            renderItem={({item}) => (
                                <View>
                                    <Image
                                        source={{uri: item.link}}
                                        style={styles.image}
                                    />
                                    <Text style={styles.footerTitle}>Créditos: {item?.authorImage}</Text>
                                </View>
                            )}
                            keyExtractor={(item) => item._id.toString()}
                        />
                        <View style={styles.footer}>
                            <Text style={styles.footerTitle}>Por: {item?.author}</Text>
                            <Text style={styles.footerTitle}>{item?.dateNoticia}</Text>
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
        marginTop: 40,
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
        width: Dimensions.get('window').height * 0.5,
        height: Dimensions.get('window').width * 0.7,
        margin: 5
    },
    footer: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    footerTitle: {
        fontSize: 12,
        color: colors.gold_light,
        fontFamily: fonts.text,
        opacity: 0.7,

    }
});
