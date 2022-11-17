import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {ECharts} from 'react-native-echarts-wrapper';

export default class Graph extends Component {
  option = {
    xAxis: {
      type: 'category',
      data: ['', '', '', '', '', '', ''],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'bar',
      },
      {
        data: [1075, 1075, 1075, 1075, 1075, 1075, 1075],
        type: 'line',
      },
    ],
  };

  render() {
    return (
      <View style={styles.chartContainer}>
        <ECharts option={this.option} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
  },
});
