import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CardView from '../components/CardView';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import RankTable from '../components/TableView';
import {safeAreaStyle, useStyles} from '../utils/GlobalStyle';
import {AppBarBackButton, AppBarIcon} from '../components/AppBar';

const Dashboard = () => {
  const styleFont = useStyles();
  if (styleFont == undefined) return undefined;
  else
    return (
      <View style={safeAreaStyle.AndroidSafeArea}>
        <AppBarBackButton title={'Dashboard'}></AppBarBackButton>
        <Text style={styleFont.Headline}>Home!</Text>
      </View>
    );
};

const styles = StyleSheet.create({});

export default Dashboard;
