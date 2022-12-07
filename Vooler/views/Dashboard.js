import React, {useContext, useState, useEffect} from 'react';
import {
  Dimensions,
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import {colorSet, safeAreaStyle, useStyles} from '../utils/GlobalStyle';
import {AppBarIcon} from '../components/AppBar';
import PropTypes from 'prop-types';
import {Icon} from '@rneui/base';
import {MainContext} from '../contexts/MainContext';
import {getBadge, getTodayStep, getTeamDataToday} from '../utils/getData';
import {Platform} from 'react-native';
import {quoteArray} from '../utils/data';
import BackgroundFetch from 'react-native-background-fetch';

const Dashboard = ({navigation}) => {
  const {TaskModule} = NativeModules;
  const iosPedometer = NativeModules.Pedometer;
  const context = useContext(MainContext);
  const {
    loading,
    setLoading,
    user,
    currentStep,
    rank,
    badgeStepDay,
    badgeStepWeek,
    badgeRank,
    token,
  } = useContext(MainContext);

  const [quote, setQuote] = useState(
    '“The longer I live, the more beautiful life becomes.” - Frank Lloyd Wright'
  );
  const [second, setSecond] = useState(0);

  const randomQuote = () => {
    const random = Math.floor(Math.random() * 18);
    setQuote(quoteArray[random].quote);
  };

  const [state, setState] = useState({events: []});

  const addEvent = (taskId) => {
    return new Promise((resolve, reject) => {
      setState((state) => ({
        events: [
          ...state.events,
          {
            taskId: taskId,
            timestamp: new Date().toString(),
          },
        ],
      }));
      resolve();
    });
  };

  const initBackgroundFetch = async () => {
    const onEvent = async (taskId) => {
      // Do background work
      console.log('[BackgroundFetch] task: ', taskId);
      iosPedometer
        .runPedometerBackgroundTasks()
        .then((ret) => console.log(ret))
        .catch((e) => console.log(e.message));
      await addEvent(taskId);
      // signal to the OS that your task is complete.
      BackgroundFetch.finish(taskId);
    };
    // Timeout callback is executed when your Task has exceeded its allowed running-time.
    const onTimeout = async (taskId) => {
      console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
      BackgroundFetch.finish(taskId);
    };

    // Initialize BackgroundFetch only once when component mounts.
    let status = await BackgroundFetch.configure(
      {minimumFetchInterval: 15},
      onEvent,
      onTimeout
    );
    console.log('[BackgroundFetch] configure status: ', status);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (second === 100) {
        setSecond(0);
      } else setSecond(second + 1);
      getTeamDataToday(context).then(
        getTodayStep(context).then(getBadge(context))
      );
    }, 500);
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    Platform.OS === 'android'
      ? TaskModule.getToken(token)
      : () => {
          iosPedometer.getToken(token);
          initBackgroundFetch();
        };

    randomQuote();
  }, []);

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
              <Text style={styleFont.Headline}>
                {currentStep ? currentStep : 0}
              </Text>
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
                {badgeRank + badgeStepDay + badgeStepWeek}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
