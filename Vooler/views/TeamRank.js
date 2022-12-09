import React, {useContext, useState, useEffect} from 'react';
import {AppBarBackButton} from '../components/AppBar';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {safeAreaStyle, useStyles, colorSet} from '../utils/GlobalStyle';
import WeeklyCalendar from 'react-native-weekly-calendar';
import PropTypes from 'prop-types';
import {Divider} from '@rneui/base';
import RankTable from '../components/TableView';
import RankComp from '../components/RankComponent';
import {getAllTeams, getToday} from '../utils/getData';
import {MainContext} from '../contexts/MainContext';

const TeamRank = ({navigation}) => {
  const onPress = () => {
    navigation.goBack();
  };
  const context = useContext(MainContext);

  useEffect(() => {
    getAllTeams(getToday(), context);
  }, []);

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
            context.setTeamRank([]);
            getAllTeams(day.format('YYYY-MM-DD'), context);
          }}
          themeColor={colorSet.primary}
          style={{height: 100, marginBottom: 10}}
        />
        <View style={styles.container}>
          {context.teamRank.length > 0 ? (
            <>
              <RankComp
                firstTeam={context.teamRank[0]}
                secondTeam={context.teamRank[1]}
                thirdTeam={context.teamRank[2]}
              ></RankComp>
              {context.teamRank.length > 2 ? (
                <>
                  <Divider width={1}></Divider>
                  <RankTable
                    state={'Team'}
                    source={context.teamRank.slice(3)}
                  ></RankTable>
                </>
              ) : (
                <></>
              )}
            </>
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
    flex: 1,
    justifyContent: 'flex-start',
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
