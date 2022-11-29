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
import {quoteArray} from '../utils/data';
import {useUser} from '../hooks/ApiHooks';
import {getDate, getTeamData, fetchStep} from '../utils/getData';

const Dashboard = ({navigation}) => {
  // const {TaskModule} = NativeModules;
  const {user, loading, setLoading, token, rank, step, weekStep} =
    useContext(MainContext);
  const context = useContext(MainContext);

  console.log(`step day ${step}, step week: ${weekStep}`);

  const [quote, setQuote] = useState(
    '“The longer I live, the more beautiful life becomes.” - Frank Lloyd Wright'
  );

  const randomQuote = () => {
    const random = Math.floor(Math.random() * 18);
    setQuote(quoteArray[random].quote);
  };

  useEffect(() => {
    randomQuote();
    fetchStep(getDate(), context);
  }, [loading]);

  useEffect(() => {
    // TaskModule.getToken(token);
    getTeamData(getDate(), context);
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
              <Text style={styleFont.Headline}>0</Text>
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
