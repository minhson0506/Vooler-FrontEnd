import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CardView from '../components/CardView';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import RankTable from '../components/TableView';
import {safeAreaStyle, useStyles} from '../utils/GlobalStyle';

const Dashboard = () => {
  const styleFont = useStyles();
  if (styleFont == undefined) return undefined;
  else
    return (
      <View style={[safeAreaStyle.AndroidSafeArea, styles.container]}>
        <Text style={styleFont.Header}>Home!</Text>
        <CardView></CardView>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});

export default Dashboard;
