import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, Platform, StatusBar, Dimensions} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import * as Font from 'expo-font';

const colorSet = {
  primary: '#FFB500',
  lightGray: '#EBEBEB',
  darkGray: '#AAAAAA',
  green: '#61BA5E',
  red: '#E25F55',
  white: '#FFFFFF',
  black: '#000000',
};

const useStyles = () => {
  const {setLoadFont} = useContext(MainContext);
  const [font, setFont] = useState(false);
  useEffect(() => {
    async function loadFont() {
      console.log('start load font');
      return await Font.loadAsync({
        'Nunito-Black': require('../assets/fonts/Nunito-Black.ttf'),
        'Nunito-ExtraBold': require('../assets/fonts/Nunito-ExtraBold.ttf'),
        'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
        'Nunito-SemiBold': require('../assets/fonts/Nunito-SemiBold.ttf'),
        'Nunito-Medium': require('../assets/fonts/Nunito-Medium.ttf'),
        'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
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
        fontSize: 32,
        fontFamily: 'Nunito-Black',
        textTransform: 'uppercase',
      },
      Button: {
        fontSize: 18,
        fontFamily: 'Nunito-Black',
        textTransform: 'uppercase',
        color: colorSet.black,
      },
      Title: {
        fontSize: 22,
        fontFamily: 'Nunito-Black',
        textTransform: 'uppercase',
      },
      Text: {
        fontSize: 22,
        fontFamily: 'Nunito-Bold',
      },
    });
};

const safeAreaStyle = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight
        : Dimensions.get('window').height * 0.06,
  },
});

export {colorSet, useStyles, safeAreaStyle};
