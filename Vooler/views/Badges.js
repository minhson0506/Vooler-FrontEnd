import React, {useState} from 'react';

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
import {levelArray} from '../utils/data';
import {colorSet, useStyles, safeAreaStyle} from '../utils/GlobalStyle';
import PropTypes from 'prop-types';

const Badges = ({navigation}) => {
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
