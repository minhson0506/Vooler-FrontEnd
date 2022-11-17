import React, {useContext, useState, Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {safeAreaStyle, useStyles} from '../utils/GlobalStyle';
import WeeklyCalendar from 'react-native-weekly-calendar';
import {ECharts} from 'react-native-echarts-wrapper';
import Graph from './Graph';

const Step = () => {
  const styleFont = useStyles();
  const [date, setDate] = useState('No data');
  if (styleFont == undefined) return undefined;
  else
    return (
      <View style={styles.container}>
        <WeeklyCalendar
          onDayPress={(day) => {
            setDate(day.format('DD-MM-YYYY'));
            console.log(day.format('DD-MM-YYYY'));
          }}
          // themeColor="pink"
          style={{height: 100}}
        />
        <Text>{date.toString()}</Text>
        {/* <Graph></Graph> */}
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  chartContainer: {
    flex: 1,
  },
});

export default Step;
