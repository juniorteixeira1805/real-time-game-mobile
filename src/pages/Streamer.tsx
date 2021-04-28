import React from 'react';
import { StyleSheet } from 'react-native';

import { WebView } from 'react-native-webview';

export default function Streamer() {

  return (
    <WebView
        source={{ uri: 'https://www.youtube.com/watch?v=5qap5aO4i9A/' }}
        onError={(event) => alert(event.nativeEvent.description)}
        style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25
  }
});
