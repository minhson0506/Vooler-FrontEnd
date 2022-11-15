import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {safeAreaStyle, useStyles} from '../utils/GlobalStyle';

const Dashboard = () => {
  const styleFont = useStyles();
  if (styleFont == undefined) return undefined;
  else
    return (
      <View style={[safeAreaStyle.AndroidSafeArea, styles.container]}>
        <Text style={styleFont.Header}>Home!</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});

export default Dashboard;
