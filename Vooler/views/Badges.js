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
import {dayTarget, levelArray} from '../utils/data';
import {colorSet, useStyles, safeAreaStyle} from '../utils/GlobalStyle';
import PropTypes from 'prop-types';
import {useUser} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import {fetchStep, getDate} from '../utils/getData';

const Badges = ({navigation}) => {
  const {badgeStepDay, badgeStepWeek, badgeRank} = useContext(MainContext);
  const [array, setArray] = useState(levelArray);

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

  useEffect(() => {
    changeArray();
  }, []);

  const onPress = () => {
    navigation.goBack();
  };

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
