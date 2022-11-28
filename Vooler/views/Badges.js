import React, {useContext, useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import {AppBarBackButton} from '../components/AppBar';
import {cityArray, levelArray} from '../utils/data';
import {colorSet, useStyles, safeAreaStyle} from '../utils/GlobalStyle';
import PropTypes from 'prop-types';
import {useUser} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

const Badges = ({navigation}) => {
  const onPress = () => {
    navigation.goBack();
  };
  const {getUserRecordwithDate} = useUser();
  const {token, badgeDay, setBadgeDay} = useContext(MainContext);
  const [stepDay, setStepDay] = useState();
  const [stepWeek, setStepWeek] = useState();

  const getUserData = async (day) => {
    const response = await getUserRecordwithDate(day, token);
    console.log('response', response);
    if (response.records[response.records.length - 1].record_date == day) {
      const dayData =
        response.records[response.records.length - 1].step_count_for_date;
      setStepDay(dayData);
    } else {
      setStepDay(0);
    }

    let weekData = 0;
    for (const index in response.records) {
      weekData = weekData + response.records[index].step_count_for_date;
    }
    setStepWeek(weekData);
  };

  const compareData = () => {
    if (stepDay < cityArray[0].name) {
      setBadgeDay(0);
    } else if (stepDay < cityArray[1].name) {
      setBadgeDay(1);
    } else if (stepDay < cityArray[2].name) {
      setBadgeDay(2);
    } else if (stepDay < cityArray[3].name) {
      setBadgeDay(3);
    } else if (stepDay < cityArray[4].name) {
      setBadgeDay(4);
    } else if (stepDay < cityArray[5].name) {
      setBadgeDay(5);
    }
    console.log('badge', badgeDay);
    levelArray[0].completed = badgeDay;
  };

  useEffect(() => {
    getUserData('2022-11-20');
    compareData();
  }, []);

  const fontStyle = useStyles();
  if (fontStyle == undefined) return undefined;
  else
    return (
      <View style={safeAreaStyle.AndroidSafeArea}>
        <AppBarBackButton title={'Badge'} onPress={onPress}></AppBarBackButton>
        <FlatList
          data={levelArray}
          style={styles.gridView}
          renderItem={({item, index}) => (
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
    padding: 20,
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
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    padding: 20,
    marginVertical: 10,
  },
});

Badges.propTypes = {navigation: PropTypes.object};

export default Badges;
