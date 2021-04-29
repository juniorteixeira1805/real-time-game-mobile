import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons  } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

import colors from '../../styles/colors'

import Jogos from '../pages/Jogos'
import Elenco from '../pages/Elenco'

const AppTab = createBottomTabNavigator()

const AuthRoutes = () => {
    return (
        <AppTab.Navigator
        tabBarOptions={{
            activeTintColor: colors.gold_light,
            inactiveTintColor: colors.gold_dark,
            labelPosition: 'beside-icon',
            style: {
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
                name="Elenco"
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
            
        </AppTab.Navigator>
    )
}

export default AuthRoutes