import React from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {colorSet} from '../utils/GlobalStyle';

const Graph = ({source, avgLastWeek}) => {
  const dateArray = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const barData = source.map((element, index) => {
    return {
      value: element,
      label: dateArray[index],
      frontColor: element > avgLastWeek ? colorSet.primary : '#BFBFBF',
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
        referenceLine1Position={avgLastWeek}
        referenceLine1Config={{
          color: 'gray',
          dashWidth: 2,
          dashGap: 3,
          width: Dimensions.get('window').width * 0.75,
        }}
      />
      <Text style={styles.text}>
        Last week avg. {Math.round(avgLastWeek)} steps/day
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Graph;
