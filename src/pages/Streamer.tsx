import React from 'react';
import { StyleSheet } from 'react-native';

import { RouteProp } from '@react-navigation/native';

import { WebView } from 'react-native-webview';

type RootStackParamList = {
  Streamer: {link: String}
};

type JogoScreenRouteProp = RouteProp<RootStackParamList, 'Streamer'>;

type Props = {
    route: JogoScreenRouteProp | any,
};

export default function Streamer({route}: Props) {

  return (
    <WebView
        source={{ uri: route.params.link }}
        onError={(event) => alert(event.nativeEvent.description)}
        style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
    marginTop: 25
  }
});
