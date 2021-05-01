import React from 'react'
import { createStackNavigator} from '@react-navigation/stack'

import colors from '../../styles/colors'
import { Welcome } from '../pages/Welcome';

import AuthRoutes from './tab.routes';
import Jogo from '../pages/Jogo';
import Streamer from '../pages/Streamer';

type RootStackParamList = {
    Jogos: undefined;
    Welcome: undefined;
    News: undefined;
    Elenco: undefined;
    Streamer: {link: String};
    Jogo: {gamerId: String}
  };

const stackRoutes = createStackNavigator<RootStackParamList>();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            }
        }}
    >
        <stackRoutes.Screen
            name="Welcome"
            component={Welcome}
        />

        <stackRoutes.Screen
            name="Jogos"
            component={AuthRoutes}
        />
        
        <stackRoutes.Screen
            name="Elenco"
            component={AuthRoutes}
        />

        <stackRoutes.Screen
            name="News"
            component={AuthRoutes}
        />
    
        <stackRoutes.Screen
            name="Jogo"
            component={Jogo}
        />
        

        <stackRoutes.Screen
            name="Streamer"
            component={Streamer}
        />

    </stackRoutes.Navigator>
)

export default AppRoutes