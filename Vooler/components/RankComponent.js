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

const RankComp = ({firstTeam, secondTeam, thirdTeam}) => {
  const styleFont = useStyles();
  const [state, setState] = useState(100);

  if (styleFont == undefined) return undefined;
  else
    return (
      <View
        style={styles.rankContainer}
        onLayout={(event) => {
          var {x, y, width, height} = event.nativeEvent.layout;
          setState(height);
        }}
      >
        <View style={styles.column}>
          <Image
            style={{width: 100, height: 100}}
            source={require('../assets/image/old1.png')}
          ></Image>
          {secondTeam ? (
            <Text style={styles.text}>{secondTeam[1]}</Text>
          ) : (
            <Text style={styles.noData}>No data</Text>
          )}
          <View
            style={[
              styles.rankView,
              {
                backgroundColor: colorSet.primary,
                height: ((state / 2.5) * 9) / 10,
              },
            ]}
          >
            <Text style={styles.rank}>2</Text>
          </View>
          {secondTeam ? (
            <Text style={styles.text}>{secondTeam[2]}</Text>
          ) : (
            <Text style={styles.noData}>No data</Text>
          )}
          <Text style={{fontFamily: 'Nunito-Bold', fontSize: 15}}>STEPS</Text>
        </View>
        <View style={styles.column}>
          <Image
            style={{width: 100, height: 100}}
            source={require('../assets/image/old2.png')}
          ></Image>
          {firstTeam ? (
            <Text style={styles.text}>{firstTeam[1]}</Text>
          ) : (
            <Text style={styles.noData}>No data</Text>
          )}
          <View
            style={[
              styles.rankView,
              {backgroundColor: colorSet.green, height: state / 2.5},
            ]}
          >
            <Text style={styles.rank}>1</Text>
          </View>
          {firstTeam ? (
            <Text style={styles.text}>{firstTeam[2]}</Text>
          ) : (
            <Text style={styles.noData}>No data</Text>
          )}
          <Text style={{fontFamily: 'Nunito-Bold', fontSize: 15}}>STEPS</Text>
        </View>
        <View style={styles.column}>
          <Image
            style={{width: 100, height: 100}}
            source={require('../assets/image/old3.png')}
          ></Image>
          {thirdTeam ? (
            <Text style={styles.text}>{thirdTeam[1]}</Text>
          ) : (
            <Text style={styles.noData}>No data</Text>
          )}
          <View
            style={[
              styles.rankView,
              {backgroundColor: colorSet.red, height: ((state / 2.5) * 8) / 10},
            ]}
          >
            <Text style={styles.rank}>3</Text>
          </View>
          {thirdTeam ? (
            <Text style={styles.text}>{thirdTeam[1]}</Text>
          ) : (
            <Text style={styles.noData}>No data</Text>
          )}
          <Text style={{fontFamily: 'Nunito-Bold', fontSize: 15}}>STEPS</Text>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  column: {
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  rank: {
    fontFamily: 'Nunito-ExtraBold',
    color: colorSet.white,
    fontSize: 90,
    alignSelf: 'center',
  },
  rankView: {
    width: 70,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 20,
  },
  noData: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
  },
  rankContainer: {
    height: Dimensions.get('window').height * 0.4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 10,
  },
});

RankComp.propTypes = {
  step1: PropTypes.number,
  step2: PropTypes.number,
  step3: PropTypes.number,
};

export default RankComp;
