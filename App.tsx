import React from 'react';
import Routes from './src/routes'

import AppLoading from 'expo-app-loading';


import {
  useFonts,
  Changa_200ExtraLight,
  Changa_400Regular,
  Changa_600SemiBold,
} from '@expo-google-fonts/changa';

export default function App() {
  const [ fontsloaded ] = useFonts ({
    Changa_200ExtraLight,
    Changa_400Regular,
    Changa_600SemiBold,
  });

  if(!fontsloaded) 
    return <AppLoading/>

  return (
    <Routes/>
  );
}