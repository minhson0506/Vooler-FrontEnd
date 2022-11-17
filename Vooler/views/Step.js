import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {safeAreaStyle, useStyles} from '../utils/GlobalStyle';
import WeeklyCalendar from 'react-native-weekly-calendar';

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
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});

export default Step;
