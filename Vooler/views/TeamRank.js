import React, {useContext, useState} from 'react';
import {AppBarBackButton} from '../components/AppBar';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {safeAreaStyle, useStyles, colorSet} from '../utils/GlobalStyle';
import WeeklyCalendar from 'react-native-weekly-calendar';
import PropTypes from 'prop-types';
import {color, Divider} from '@rneui/base';
import {Spacer} from '@react-native-material/core';
import RankTable from '../components/TableView';
import RankComp from '../components/RankComponent';

const TeamRank = ({navigation}) => {
  const onPress = () => {
    navigation.goBack();
  };

  const [date, setDate] = useState('No data');
  const styleFont = useStyles();
  if (styleFont == undefined) return undefined;
  else
    return (
      <View style={safeAreaStyle.AndroidSafeArea}>
        <AppBarBackButton
          title={'Team Rank'}
          onPress={onPress}
        ></AppBarBackButton>
        <WeeklyCalendar
          onDayPress={(day) => {
            setDate(day.format('DD-MM-YYYY'));
            console.log(day.format('DD-MM-YYYY'));
          }}
          themeColor={colorSet.primary}
          style={{height: 100, marginBottom: 10}}
        />
        <View style={styles.container}>
          <RankComp step1={3100} step2={3000} step3={2000}></RankComp>
          <Divider width={2} style={{marginBottom: 20}}></Divider>
          <RankTable state={'Team'}></RankTable>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    height: '80%',
    justifyContent: 'space-evenly',
  },
  column: {
    alignItems: 'center',
  },
  rank: {
    fontFamily: 'Nunito-ExtraBold',
    color: colorSet.white,
    fontSize: 90,
    alignSelf: 'center',
  },
  rankView: {
    width: 70,
    height: 100,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 20,
  },
  rankContainer: {
    height: Dimensions.get('window').height * 0.4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

TeamRank.propTypes = {navigation: PropTypes.object};

export default TeamRank;
