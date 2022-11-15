import React, {useContext} from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {safeAreaStyle, useStyles} from './utils/GlobalStyle.js';
import LoginForm from './components/LoginForm.js';
import RegisterForm from './components/RegisterForm.js';

export default function App() {
  const styleFont = useStyles();
  if (styleFont == undefined) return undefined;
  else
    return (
      <View style={[safeAreaStyle.AndroidSafeArea, styles.container]}>
        <RegisterForm></RegisterForm>
        <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});
