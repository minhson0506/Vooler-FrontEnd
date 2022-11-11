import React, {useContext} from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {useStyles} from './utils/GlobalStyle.js';

export default function App() {
  const styleFont = useStyles();
  if (styleFont == undefined) return undefined;
  else
    return (
      <View style={styles.container}>
        <Text style={styleFont.Headline}>
          Open up App.js to start working on your app!
        </Text>
        <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
