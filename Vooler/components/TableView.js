import {Table, Row, Rows} from 'react-native-table-component';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import {colorSet, useStyles} from '../utils/GlobalStyle';

const RankTable = () => {
  const header = ['Rank', 'Team', 'Step'];
  const data = [
    ['4', 'Hoitokoti 4', '2240'],
    ['5', 'Hoitokoti 5', '2010'],
    ['6', 'Hoitokoti 6', '2005'],
  ];
  const fontStyle = useStyles();
  if (fontStyle == undefined) return undefined;
  else
    return (
      <ScrollView style={{flex: 1}}>
        <Table borderStyle={{borderWidth: 0}} style={styles.container}>
          <Row data={header} textStyle={[styles.textHeader, fontStyle.Title]} />
          <Rows
            data={data}
            textStyle={[styles.text, fontStyle.Text]}
            style={styles.row}
          />
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
