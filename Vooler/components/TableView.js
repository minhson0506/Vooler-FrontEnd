import {Table, Row, Rows} from 'react-native-table-component';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import {colorSet, useStyles} from '../utils/GlobalStyle';
import {color} from '@rneui/base';

const RankTable = ({state}) => {
  const header = ['Rank', state, 'Step'];
  const data = [
    ['4', 'Hoitokoti 4', '2240'],
    ['5', 'Hoitokoti 5', '2010'],
    ['6', 'Hoitokoti 6', '2005'],
  ];
  const teamData = [
    ['1', 'Laura', '540'],
    ['2', 'Dolphin', '450'],
    ['3', 'Bee', '405'],
    ['4', 'Squirrel', '400'],
    ['5', 'Bunny', '350'],
    ['6', 'Dinosaur', '305'],
    ['7', 'Chicken', '220'],
    ['8', 'Foxy', '210'],
  ];
  const fontStyle = useStyles();
  if (fontStyle == undefined) return undefined;
  else
    return (
      <ScrollView style={{flex: 1}}>
        <Table borderStyle={{borderWidth: 0}} style={styles.container}>
          <Row data={header} textStyle={[styles.textHeader, fontStyle.Title]} />
          {state == 'Team' ? (
            <Rows
              data={data}
              textStyle={[styles.text, fontStyle.Text]}
              style={styles.row}
            />
          ) : (
            <Rows
              data={teamData}
              textStyle={[styles.text, fontStyle.Text]}
              style={styles.row}
            />
          )}
        </Table>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
  },
  textHeader: {
    textAlign: 'center',
    color: colorSet.primary,
  },
  text: {
    textAlign: 'center',
  },
  row: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: colorSet.lightGray,
  },
});

export default RankTable;
