import React, {useContext, useState, useEffect} from 'react';
import {
  Dimensions,
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CardView from '../components/CardView';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import RankTable from '../components/TableView';
import {colorSet, safeAreaStyle, useStyles} from '../utils/GlobalStyle';
import {AppBarBackButton, AppBarIcon} from '../components/AppBar';
import PropTypes from 'prop-types';
import Step from './Step';
import Graph from './Graph';
import {Icon} from '@rneui/base';
import {MainContext} from '../contexts/MainContext';
import {
  dayTarget,
  quoteArray,
  weekFirstTarget,
  weekSecondTarget,
  weekThirdTarget,
} from '../utils/data';
import {useUser} from '../hooks/ApiHooks';
import {getDate, getTeamData, fetchStep} from '../utils/getData';
import {Platform} from 'react-native';

const Dashboard = ({navigation}) => {
  const {TaskModule} = NativeModules;
  const {user, loading, setLoading, token, rank, step, weekStep} =
    useContext(MainContext);

  console.log(`step day: ${step}, step week: ${weekStep}`);

  const context = useContext(MainContext);
  const [bagdeStepDay, setBadgeStepDay] = useState(0);
  const [bagdeStepWeek, setBadgeStepWeek] = useState(0);
  const [bagdeRank, setBagdeRank] = useState(0);
  const [quote, setQuote] = useState(
    '“The longer I live, the more beautiful life becomes.” - Frank Lloyd Wright'
  );
  const [second, setSecond] = useState(0);

  const randomQuote = () => {
    const random = Math.floor(Math.random() * 18);
    setQuote(quoteArray[random].quote);
  };

  const getWeekBadge = (array) => {
    if (weekStep < array[0].name) setBadgeStepWeek(0 + bagdeStepWeek);
    else if (weekStep < array[1].name) setBadgeStepWeek(1 + bagdeStepWeek);
    else if (weekStep < array[2].name) setBadgeStepWeek(2 + bagdeStepWeek);
    else if (weekStep < array[3].name) setBadgeStepWeek(3 + bagdeStepWeek);
    else if (weekStep < array[4].name) setBadgeStepWeek(4 + bagdeStepWeek);
    else if (weekStep < array[5].name) setBadgeStepWeek(5 + bagdeStepWeek);
    else setBadgeStepWeek(6 + bagdeStepWeek);
  };

  const getBadge = () => {
    console.log(`step day is ${step}, step week is ${weekStep}`);
    if (step < dayTarget[0].name) setBadgeStepDay(0);
    else if (step < dayTarget[1].name) setBadgeStepDay(1);
    else if (step < dayTarget[2].name) setBadgeStepDay(2);
    else if (step < dayTarget[3].name) setBadgeStepDay(3);
    else if (step < dayTarget[4].name) setBadgeStepDay(4);
    else if (step < dayTarget[5].name) setBadgeStepDay(5);
    else setBadgeStepDay(6);

    if (weekStep < weekSecondTarget[0].name) {
      setBadgeStepWeek(0);
      getWeekBadge(weekFirstTarget);
    } else if (weekStep < weekThirdTarget[0].name) {
      setBadgeStepWeek(6);
      getWeekBadge(weekSecondTarget);
    } else {
      setBadgeStepWeek(12);
      getWeekBadge(weekThirdTarget);
    }

    switch (rank) {
      case 1:
        setBagdeRank(6);
        break;
      case 2:
        setBagdeRank(5);
        break;
      case 3:
        setBagdeRank(4);
        break;
      case 4:
        setBagdeRank(3);
        break;
      case 5:
        setBagdeRank(2);
        break;
      case 6:
        setBagdeRank(1);
        break;
      default:
        setBagdeRank(0);
    }
  };

  // useEffect(() => {
  //   randomQuote();
  //   fetchStep(getDate(), context);
  //   getTeamData(getDate(), context);
  //   getBadge();
  // }, [loading]);

  useEffect(() => {
    Platform.OS === 'android'
      ? TaskModule.getToken(token)
      : console.log('you are running ios');
    randomQuote();
    const interval = setInterval(() => {
      if (second === 100) {
        setSecond(0);
      } else setSecond(second + 1);
      fetchStep(getDate(), context);
      getTeamData(getDate(), context);
      getBadge();
    }, 1500);
    return () => clearInterval(interval);
  }, [loading]);

  const styleFont = useStyles();
  if (styleFont == undefined) return undefined;
  else
    return (
      <View style={safeAreaStyle.AndroidSafeArea}>
        <AppBarIcon></AppBarIcon>
        <View style={styles.container}>
          <View style={styles.textView}>
            <Text style={styleFont.Title}>Good morning, {user}</Text>
            <Text style={styles.quote}>{quote}</Text>
          </View>
          <View style={{height: '80%', justifyContent: 'space-evenly'}}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                navigation.navigate('Step');
                setLoading(!loading);
              }}
            >
              <View style={styles.iconText}>
                <Icon
                  name="shoe-print"
                  type="material-community"
                  size={40}
                  color={colorSet.primary}
                ></Icon>
                <Text style={styleFont.Title}>Steps</Text>
              </View>
              <Text style={styleFont.Headline}>{step ? step : 0}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                navigation.navigate('UserRank');
                setLoading(!loading);
              }}
            >
              <View style={styles.iconText}>
                <Icon
                  name="trophy"
                  type="ionicon"
                  size={30}
                  color={colorSet.primary}
                ></Icon>
                <Text style={styleFont.Title}>Rank</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styleFont.Headline}>{rank ? rank : 0}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                navigation.navigate('Badges');
                setLoading(!loading);
              }}
            >
              <View style={styles.iconText}>
                <Icon
                  name="medal"
                  type="font-awesome-5"
                  size={30}
                  color={colorSet.primary}
                ></Icon>
                <Text style={styleFont.Title}>Badges</Text>
              </View>
              <Text style={styleFont.Headline}>
                {bagdeRank + bagdeStepDay + bagdeStepWeek}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
  },
  textView: {
    alignItems: 'center',
  },
  quote: {
    marginTop: 10,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.9,
  },
  card: {
    flexDirection: 'row',
    height: Dimensions.get('window').height * 0.18,
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: colorSet.lightGray,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingStart: 20,
    paddingEnd: 20,
  },
  iconText: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

Dashboard.propTypes = {navigation: PropTypes.object};

export default Dashboard;
