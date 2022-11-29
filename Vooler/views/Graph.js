import {color} from '@rneui/base';
import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {getUserWeekData} from '../utils/getData';
import {colorSet} from '../utils/GlobalStyle';

const Graph = ({source}) => {
  const avg = source.reduce((a, b) => a + b, 0) / source.length;
  const dateArray = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const barData = source.map((element, index) => {
    return {
      value: element,
      label: dateArray[index],
      frontColor: element > avg ? colorSet.primary : '#BFBFBF',
    };
  });

  return (
    <>
      <BarChart
        barWidth={22}
        noOfSections={3}
        frontColor="#BFBFBF"
        barBorderRadius={4}
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
        hideRules
        initialSpacing={10}
        showReferenceLine1
        referenceLine1Position={avg}
        referenceLine1Config={{
          color: 'gray',
          dashWidth: 2,
          dashGap: 3,
          width: Dimensions.get('window').width * 0.75,
        }}
      />
      <Text style={styles.text}>Average: {Math.round(avg)} steps/day</Text>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Graph;
