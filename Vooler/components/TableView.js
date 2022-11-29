import {Table, Row, Rows} from 'react-native-table-component';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import {colorSet, useStyles} from '../utils/GlobalStyle';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';

const RankTable = ({state, source}) => {
  const {user} = useContext(MainContext);
  const header = ['Rank', state, 'Step'];
  const fontStyle = useStyles();
  if (fontStyle == undefined) return undefined;
  else
    return (
      <Table borderStyle={{borderWidth: 0}} style={styles.container}>
        <Row data={header} textStyle={styles.textHeader} />
        {state == 'Team' ? (
          <Rows data={source} textStyle={styles.text} style={styles.row} />
        ) : (
          <Rows data={source} textStyle={styles.text} style={styles.row} />
        )}
      </Table>
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
    fontSize: 22,
    fontFamily: 'Nunito-Black',
    textTransform: 'uppercase',
  },
  text: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Nunito-Bold',
  },
  row: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: colorSet.darkGray,
  },
});

export default RankTable;
