import React, {useContext, useState, useEffect} from 'react';
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
import {getDate, getTeamData} from '../utils/getData';
import {MainContext} from '../contexts/MainContext';

const UserRank = ({navigation}) => {
  const [date, setDate] = useState('No data');
  const {teamData, token, setTeamData, loading, setLoading} =
    useContext(MainContext);
  const context = useContext(MainContext);

  const onPress = () => {
    setLoading(!loading);
    navigation.goBack();
  };
  const teamPress = () => {
    navigation.navigate('TeamRank');
  };

  useEffect(() => {
    getTeamData(getDate(), context);
  }, []);

  const styleFont = useStyles();
  if (styleFont == undefined) return undefined;
  else
    return (
      <View style={safeAreaStyle.AndroidSafeArea}>
        <AppBarBackButton
          title={'Rank'}
          onPress={onPress}
          icon={true}
          team={teamPress}
        ></AppBarBackButton>
        <WeeklyCalendar
          onDayPress={async (day) => {
            //setDate(day.format('YYYY-MM-DD'));
            setTeamData([]);
            getTeamData(day.format('YYYY-MM-DD'), context);
          }}
          themeColor={colorSet.primary}
          style={{height: 100}}
        />
        <View style={styles.container}>
          {teamData.length > 0 ? (
            <RankTable state={'User'} source={teamData}></RankTable>
          ) : (
            <Text style={[{alignSelf: 'center'}, styleFont.Text]}>
              Oops! No data for this day!
            </Text>
          )}
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
