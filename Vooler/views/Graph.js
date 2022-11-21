import {color} from '@rneui/base';
import React, {Component} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {colorSet} from '../utils/GlobalStyle';

const Graph = () => {
  const barData = [
    {value: 396, label: 'S', frontColor: colorSet.primary},
    {value: 259, label: 'M'},
    {value: 245, label: 'T'},
    {value: 500, label: 'W', frontColor: colorSet.primary},
    {value: 320, label: 'T', frontColor: colorSet.primary},
    {value: 450, label: 'F', frontColor: colorSet.primary},
    {value: 200, label: 'S'},
  ];
  return (
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
      referenceLine1Position={300}
      referenceLine1Config={{
        color: 'gray',
        dashWidth: 2,
        dashGap: 3,
        width: Dimensions.get('window').width * 0.75,
      }}
    />
  );
};

export default Graph;
