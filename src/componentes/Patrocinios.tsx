import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import alzair from '../assets/patrocinios/alzair.jpg'
import superCola from '../assets/patrocinios/superCola.jpg'
import arenaSoccer from '../assets/patrocinios/arenaSoccer.jpg'
import bMotors from '../assets/patrocinios/bMotors.jpg'
import emporioDaGela from '../assets/patrocinios/emporioDaGela.jpg'
import fnBike from '../assets/patrocinios/fnBike.jpg'
import galvaoPerrucci from '../assets/patrocinios/galvaoPerrucci.jpg'
import hermano from '../assets/patrocinios/hermano.jpg'
import ivson from '../assets/patrocinios/ivson.jpg'
import jrDistribuidora from '../assets/patrocinios/jrDistribuidora.jpg'
import lavaJato from '../assets/patrocinios/lavaJato.jpg'
import magoDoIphone from '../assets/patrocinios/magoDoIphone.jpg'
import panificadora from '../assets/patrocinios/panificadora.jpg'
import renatoOlympio from '../assets/patrocinios/renatoOlympio.jpg'
import ronnyCreditos from '../assets/patrocinios/ronnyCreditos.jpg'
import usaImports from '../assets/patrocinios/usaImports.jpg'
import victorGuerra from '../assets/patrocinios/victorGuerra.jpg'

const Patrocinadores = [
    alzair,
    superCola,
    arenaSoccer,
    bMotors,
    emporioDaGela,
    fnBike,
    galvaoPerrucci,
    hermano,
    ivson,
    jrDistribuidora,
    lavaJato,
    magoDoIphone,
    panificadora,
    renatoOlympio,
    ronnyCreditos,
    usaImports,
    victorGuerra
]

export function Patrocinios() {
    const [elemento, setElemento] = useState<number>(0)
    const [parametro, setParametro] = useState<number>(0)

    setTimeout(function(){ setParametro(parametro + 1) }, 10000);

    
    useEffect(() => {
        function getRandomArbitrary() {
            const numero = Math.floor(Math.random() * 17);
            setElemento(numero)
        }
        getRandomArbitrary()
    }, [parametro])

    return (
        <View style={styles.container}>
            <Image
                source={Patrocinadores[elemento]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10
    },

})