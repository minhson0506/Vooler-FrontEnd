import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import { AppBarBackButton } from '../components/AppBar';
import { levelArray } from '../utils/data';
import { colorSet, useStyles, safeAreaStyle } from '../utils/GlobalStyle';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import { useUser } from '../hooks/ApiHooks';
import { getToday } from '../utils/getData';
import { Icon } from '@rneui/base';

const Badges = ({ navigation }) => {
  const { badgeStepDay, badgeStepWeek, badgeRank, token, loading } =
    useContext(MainContext);
  const [array, setArray] = useState(levelArray);
  const [streakDay, setStreakDay] = useState(0);
  const { getAllRecordsByUser } = useUser();

  // get array of badge for displaying
  const changeArray = () => {
    const newArray = [...array];
    newArray[0].completed = badgeStepDay;
    newArray[1].completed = badgeRank;
    if (badgeStepWeek <= 6) {
      newArray[2].completed = badgeStepWeek;
    } else if (badgeStepWeek <= 12) {
      newArray[2].completed = 6;
      newArray[3].completed = badgeStepWeek - 6;
    } else {
      newArray[2].completed = 6;
      newArray[3].completed = 6;
      newArray[4].completed = badgeStepWeek - 12;
    }
    setArray(newArray);
  };

  // get streak data for displaying
  const checkStreak = async () => {
    const response = await getAllRecordsByUser(token);
    const today = getToday();
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
      .toISOString()
      .slice(0, 10);

    if (response) {
      const array = response.records;
      if (array) {
        if (array[array.length - 1].record_date == today) array.pop();
        setStreakDay(checkDate(array, yesterday));
      }
    }
  };

  // function for calculating streak
  const checkDate = (array, date) => {
    if (array !== undefined && array.length != 0) {
      if (array[array.length - 1].record_date == date) {
        if (array[array.length - 1].step_count_for_date >= 300) {
          array.pop();
          const yesterday = new Date(
            new Date(date).setDate(new Date(date).getDate() - 1)
          )
            .toISOString()
            .slice(0, 10);
          return 1 + checkDate(array, yesterday);
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  useEffect(() => {
    changeArray();
    checkStreak();
  }, [loading]);

  const onPress = () => {
    navigation.goBack();
  };

  const fontStyle = useStyles();
  if (fontStyle == undefined) return undefined;
  else
    return (
      <View style={safeAreaStyle.AndroidSafeArea}>
        <AppBarBackButton title={'Badge'} onPress={onPress}></AppBarBackButton>
        <TouchableOpacity
          style={[styles.card, { alignSelf: 'center' }]}
          onPress={() => {
            Alert.alert(
              'How to keep your streak?',
              'Walk 300 steps/day to achieve one day streak!'
            );
          }}
        >
          {streakDay > 0 ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Icon
                name="fire"
                type="material-community"
                size={35}
                color={colorSet.primary}
              ></Icon>
              <Text style={fontStyle.Title}>Streak: {streakDay} days</Text>
            </View>
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Icon
                name="fire"
                type="material-community"
                size={35}
                color={colorSet.black}
              ></Icon>
              <Text style={fontStyle.Title}>Streak: {streakDay}</Text>
            </View>
          )}
        </TouchableOpacity>
        <FlatList
          data={levelArray}
          style={styles.gridView}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                navigation.navigate('BadgesDetail', {
                  id: item.level,
                  name: item.name,
                });
              }}
            >
              <Text style={fontStyle.Title}>
                Level {item.level}: {item.name}
              </Text>
              <Text style={fontStyle.Text}>Completed: {item.completed}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  gridView: {
    paddingStart: 20,
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
  card: {
    height: 100,
    width: Dimensions.get('window').width * 0.9,
    borderRadius: 15,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: colorSet.lightGray,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    padding: 20,
    marginVertical: 10,
  },
});

Badges.propTypes = { navigation: PropTypes.object };

export default Badges;
