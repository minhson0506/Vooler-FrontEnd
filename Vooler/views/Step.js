import React, { useContext, useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { AppBarBackButton } from '../components/AppBar';
import { colorSet, safeAreaStyle, useStyles } from '../utils/GlobalStyle';
import WeeklyCalendar from 'react-native-weekly-calendar';
import Graph from './Graph';
import PropTypes from 'prop-types';
import { Icon } from '@rneui/base';
import { useUser } from '../hooks/ApiHooks';
import { MainContext } from '../contexts/MainContext';
import { getToday, fetchStep } from '../utils/getData';

const Step = ({ navigation }) => {
  const {
    token,
    step,
    setStep,
    loading,
    setLoading,
    setAvgLastWeek,
    avgLastWeek,
  } = useContext(MainContext);
  const context = useContext(MainContext);

  const { getUserRecordwithDate } = useUser();
  const [graph, setGraph] = useState([]);

  const onPress = () => {
    setLoading(!loading);
    navigation.goBack();
  };

  // get data for displaying
  const getGraphData = async (day, bool) => {
    try {
      const graphData = await getUserRecordwithDate(day, token);
      const startDay = graphData.start_date.split('-');
      const current = new Date(
        parseInt(startDay[0]),
        parseInt(startDay[1]) - 1,
        parseInt(startDay[2]) + 1
      );
      let weekArray = [current.toISOString().slice(0, 10)];
      for (let i = 0; i <= 5; i++) {
        weekArray.push(
          new Date(current.setDate(current.getDate() + 1))
            .toISOString()
            .slice(0, 10)
        );
      }

      let weekData = weekArray.map((element) => {
        for (let i = 0; i < graphData.records.length; i++) {
          if (element == graphData.records[i].record_date) {
            return graphData.records[i].step_count_for_date;
          }
        }
        return 0;
      });
      if (bool) {
        setGraph(weekData);
      } else {
        setAvgLastWeek(graphData.total_steps_accumulated / 7);
      }
    } catch (error) {
      console.log('Error getting data for graph', error);
    }
  };

  useEffect(() => {
    const lastSaturday = new Date(
      new Date().setDate(new Date().getDate() - 1 - new Date().getDay())
    )
      .toISOString()
      .slice(0, 10);
    fetchStep(getToday(), context);
    getGraphData(getToday(), true);
    getGraphData(lastSaturday, false);
  }, []);

  const styleFont = useStyles();
  if (styleFont == undefined) return undefined;
  else
    return (
      <View style={safeAreaStyle.AndroidSafeArea}>
        <AppBarBackButton title={'Step'} onPress={onPress}></AppBarBackButton>
        <WeeklyCalendar
          onDayPress={(day, weekdays) => {
            setStep(0);
            fetchStep(day.format('YYYY-MM-DD'), context);
            const thisSaturday = new Date(
              new Date(day).setDate(new Date(day).getDate() + 6 - weekdays)
            )
              .toISOString()
              .slice(0, 10);
            const lastSaturday = new Date(
              new Date(day).setDate(new Date(day).getDate() - 1 - weekdays)
            )
              .toISOString()
              .slice(0, 10);
            getGraphData(thisSaturday, true);
            getGraphData(lastSaturday, false);
          }}
          themeColor={colorSet.primary}
          style={{ height: 100 }}
        />
        <View style={styles.container}>
          <View style={styles.iconText}>
            <Icon
              name="shoe-print"
              type="material-community"
              size={40}
              color={colorSet.black}
            ></Icon>
            <Text style={styleFont.Headline}>{step ? step : 0}</Text>
            <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: 18 }}>
              STEPS
            </Text>
          </View>
          <View style={styles.card}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={[styles.text, styleFont.Text]}>Week summary</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginEnd: 10,
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    height: 15,
                    width: 22,
                    backgroundColor: colorSet.primary,
                    borderRadius: 5,
                  }}
                ></View>
                <Text
                  style={{
                    fontFamily: 'Nunito-Bold',
                    fontSize: 15,
                    marginLeft: 10,
                  }}
                >
                  steps
                </Text>
              </View>
            </View>
            <Graph source={graph} avgLastWeek={avgLastWeek}></Graph>
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
  iconText: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    width: 150,
    height: 150,
    backgroundColor: colorSet.primary,
    borderRadius: 1000,
  },
  card: {
    height: Dimensions.get('window').height * 0.45,
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: colorSet.lightGray,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    justifyContent: 'space-evenly',
  },
  text: {
    marginStart: 10,
    fontSize: 20,
  },
});

Step.propTypes = { navigation: PropTypes.object };

export default Step;
