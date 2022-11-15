import React, {useContext, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
import {useStyles} from './utils/GlobalStyle.js';
import {
  Calendar,
  WeekCalendar,
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-calendars';
import MonthFromTime from 'es-abstract/5/MonthFromTime';
import WeeklyCalendar from 'react-native-weekly-calendar';
import {typeOf} from 'react-is';

export default function App() {
  const styleFont = useStyles();
  const [date, setDate] = useState('No data');
  if (styleFont == undefined) return undefined;
  else
    return (
      <View style={styles.container}>
        {/* <Text style={styleFont.Headline}>
          Open up App.js to start working on your app!
        </Text> */}
        <WeeklyCalendar
          onDayPress={(day) => {
            setDate(day.format('DD-MM-YYYY'));
            console.log(day.format('DD-MM-YYYY'));
            console.log('date is ' + date + ' ' + typeOf(date));
          }}
          // themeColor="pink"
          style={{height: 100}}
        />
        <Text>{date.toString()}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar: {
    height: 1,
  },
});
