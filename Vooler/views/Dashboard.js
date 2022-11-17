import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CardView from '../components/CardView';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import RankTable from '../components/TableView';
import {safeAreaStyle, useStyles} from '../utils/GlobalStyle';
import {AppBarBackButton, AppBarIcon} from '../components/AppBar';
import PropTypes from 'prop-types';
import Step from './Step';

const Dashboard = ({navigation}) => {
  const styleFont = useStyles();
  if (styleFont == undefined) return undefined;
  else
    return (
      <View style={safeAreaStyle.AndroidSafeArea}>
        <AppBarIcon></AppBarIcon>
        <Text style={styleFont.Headline}>Home!</Text>
        <Step></Step>
      </View>
    );
};

Dashboard.propTypes = {navigation: PropTypes.object};

export default Dashboard;
