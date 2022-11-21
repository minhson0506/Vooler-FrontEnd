import React, {useContext, useState, Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppBarBackButton} from '../components/AppBar';
import {colorSet, safeAreaStyle, useStyles} from '../utils/GlobalStyle';
import WeeklyCalendar from 'react-native-weekly-calendar';
import RankTable from '../components/TableView';
import PropTypes from 'prop-types';
import {Icon} from '@rneui/base';

const UserRank = ({navigation}) => {
  const onPress = () => {
    navigation.goBack();
  };
  const team = () => {
    navigation.navigate('TeamRank');
  };
  const [date, setDate] = useState('No data');
  const [weekday, setWeekday] = useState(0);
  const styleFont = useStyles();
  if (styleFont == undefined) return undefined;
  else
    return (
      <View style={safeAreaStyle.AndroidSafeArea}>
        <AppBarBackButton
          title={'Koti 3'}
          onPress={onPress}
          icon={true}
          team={team}
        ></AppBarBackButton>
        <WeeklyCalendar
          onDayPress={(day, weekdays) => {
            setDate(day.format('DD-MM-YYYY'));
            setWeekday(weekday);
            console.log(day.format('DD-MM-YYYY'));
            console.log(weekdays);
          }}
          themeColor={colorSet.primary}
          style={{height: 100}}
        />
        <View style={styles.container}>
          <RankTable state={'User'}></RankTable>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    height: '80%',
    marginTop: 20,
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
    justifyContent: 'space-evenly',
  },
  text: {
    marginStart: 10,
    fontSize: 20,
  },
});

UserRank.propTypes = {navigation: PropTypes.object};

export default UserRank;
