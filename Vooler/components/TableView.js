import {Table, Row, Rows} from 'react-native-table-component';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import {colorSet, useStyles} from '../utils/GlobalStyle';
import {useContext, useState, useEffect} from 'react';
import {MainContext} from '../contexts/MainContext';
import {useTeam} from '../hooks/ApiHooks';

const RankTable = ({state, source}) => {
  const {user, team} = useContext(MainContext);
  const header = ['Rank', state, 'Step'];
  const fontStyle = useStyles();
  const [teamName, setTeamName] = useState('');
  const {getAllTeams} = useTeam();

  const getTeamName = async () => {
    console.log('teamid', team);
    try {
      const array = await getAllTeams();
      if (array) {
        for (let i = 0; i < 6; i++) {
          if (array[i].team_id == team) {
            console.log('got name', array[i].team_name);
            setTeamName(array[i].team_name);
          }
        }
      }
    } catch (error) {
      console.error('get team error', error);
    }
  };

  useEffect(() => {
    getTeamName();
  }, []);

  if (fontStyle == undefined) return undefined;
  else
    return (
      <Table borderStyle={{borderWidth: 0}} style={styles.container}>
        <Row data={header} textStyle={styles.textHeader} />
        {state == 'Team'
          ? source.map((rowData) => (
              <Row
                key={rowData[0]}
                data={rowData}
                style={[
                  styles.row,
                  rowData[1] == teamName && {backgroundColor: colorSet.primary},
                ]}
                textStyle={[styles.text, fontStyle.Text]}
              />
            ))
          : source.map((rowData) => (
              <Row
                key={rowData[0]}
                data={rowData}
                style={[
                  styles.row,
                  rowData[1] == user && {backgroundColor: colorSet.primary},
                ]}
                textStyle={[styles.text, fontStyle.Text]}
              />
            ))}
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
