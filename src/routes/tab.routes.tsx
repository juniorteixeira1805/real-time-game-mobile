import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import { MaterialCommunityIcons  } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'; 

import colors from '../../styles/colors'

import Jogos from '../pages/Jogos'
import Elenco from '../pages/Elenco'
import News from '../pages/News'

const AppTab = createBottomTabNavigator()

const AuthRoutes = () => {
    return (
        <AppTab.Navigator
        tabBarOptions={{
            activeBackgroundColor: colors.gold_light,
            activeTintColor: colors.gold_dark,
            inactiveTintColor: colors.gold_light,
            labelPosition: 'beside-icon',
            style: {
                backgroundColor: '#262626',
                height: 60
            },
        }}>
            <AppTab.Screen
                name="Jogos"
                component={Jogos}
                options={{
                    tabBarIcon: (({size, color}) => (
                        <MaterialCommunityIcons 
                            name="soccer-field"
                            size={size}
                            color={color}/>
                    ))
                }}
            />

            <AppTab.Screen
                name="Equipe"
                component={Elenco}
                options={{
                    tabBarIcon: (({size, color}) => (
                        <MaterialIcons
                            name="groups"
                            size={size}
                            color={color}/>
                    ))
                }}
            />

            <AppTab.Screen
                name="News"
                component={News}
                options={{
                    tabBarIcon: (({size, color}) => (
                    <FontAwesome 
                    name="newspaper-o"
                    size={size}
                    color={color} />
                    ))
                }}
            />
            
        </AppTab.Navigator>
    )
}

export default AuthRoutes