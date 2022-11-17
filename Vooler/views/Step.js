import React, {useContext, useState, Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {AppBarBackButton} from '../components/AppBar';
import {colorSet, safeAreaStyle, useStyles} from '../utils/GlobalStyle';
import WeeklyCalendar from 'react-native-weekly-calendar';
import {ECharts} from 'react-native-echarts-wrapper';
import Graph from './Graph';
import PropTypes from 'prop-types';
import {Icon} from '@rneui/base';

const Step = ({navigation}) => {
  const onPress = () => {
    navigation.goBack();
  };
  const [date, setDate] = useState('No data');
  const styleFont = useStyles();
  if (styleFont == undefined) return undefined;
  else
    return (
      <View style={safeAreaStyle.AndroidSafeArea}>
        <AppBarBackButton title={'Steps'} onPress={onPress}></AppBarBackButton>
        <View style={styles.container}>
          <WeeklyCalendar
            onDayPress={(day) => {
              setDate(day.format('DD-MM-YYYY'));
              console.log(day.format('DD-MM-YYYY'));
            }}
            themeColor={colorSet.primary}
            style={{height: Dimensions.get('window').height * 0.12}}
          />
          <View style={{height: '85%', justifyContent: 'space-evenly'}}>
            <View style={styles.iconText}>
              <Icon
                name="shoe-print"
                type="material-community"
                size={40}
                color={colorSet.black}
              ></Icon>
              <Text style={styleFont.Headline}>500</Text>
              <Text style={{fontFamily: 'Nunito-SemiBold', fontSize: 18}}>
                STEPS
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.text}>This is where the graph will be</Text>
            </View>
          </View>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  iconText: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    width: 160,
    height: 160,
    backgroundColor: colorSet.primary,
    borderRadius: 1000,
  },
  card: {
    height: Dimensions.get('window').height * 0.5,
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: colorSet.lightGray,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
});

Step.propTypes = {navigation: PropTypes.object};

export default Step;
