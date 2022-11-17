import React, {useState} from 'react';
import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import {AppBarBackButton} from '../components/AppBar';
import {moominArray} from '../utils/data';
import {colorSet, useStyles, safeAreaStyle} from '../utils/GlobalStyle';
import PropTypes from 'prop-types';
import CardView from '../components/CardView';

const Badges = ({navigation}) => {
  const onPress = () => {
    navigation.goBack();
  };
  const fontStyle = useStyles();
  if (fontStyle == undefined) return undefined;
  else
    return (
      <View style={safeAreaStyle.AndroidSafeArea}>
        <AppBarBackButton title={'Badges'} onPress={onPress}></AppBarBackButton>
        <CardView></CardView>
      </View>
    );
};

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: colorSet.lightGray,
    justifyContent: 'center',
    borderRadius: 15,
    height: 200,
  },
  itemName: {
    textAlign: 'center',
  },
});

Badges.propTypes = {navigation: PropTypes.object};

export default Badges;
