import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, Platform, StatusBar} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import * as Font from 'expo-font';

const colorSet = {
  primary: '#FFB500',
  lightGray: '#EBEBEB',
  darkGray: '#AAAAAA',
  green: '#61BA5E',
  red: '#E25F55',
  white: '#FFFFFF',
  black: '#00000',
};

const useStyles = () => {
  const {setLoadFont} = useContext(MainContext);
  const [font, setFont] = useState(false);
  useEffect(() => {
    async function loadFont() {
      console.log('start load font');
      return await Font.loadAsync({
        'Nunito-Black': require('../assets/fonts/Nunito-Black.ttf'),
      });
    }
    loadFont().then(() => {
      setFont(true);
    });
    console.log('finish to load font');
  }, []);

  console.log('style');
  if (!font) return undefined;
  else
    return StyleSheet.create({
      Headline: {
        fontSize: 50,
        fontFamily: 'Nunito-Black',
        textTransform: 'uppercase',
      },
      // Button: {
      //   fontSize: 18,
      //   fontFamily: 'Nunito_Black',
      //   textTransform: 'uppercase',
      // },
      // Title: {
      //   fontSize: 22,
      //   fontFamily: 'Nunito_Black',
      //   textTransform: 'uppercase',
      // },
      // Text: {
      //   fontSize: 22,
      //   fontFamily: 'Nunito_Bold',
      // },
    });
};

const safeAreaStyle = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export {colorSet, useStyles, safeAreaStyle};
