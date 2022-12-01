import {Table, Row} from 'react-native-table-component';
import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import {colorSet, useStyles} from '../utils/GlobalStyle';
import {useContext, useState, useEffect} from 'react';
import {MainContext} from '../contexts/MainContext';
import {useTeam} from '../hooks/ApiHooks';
import {Icon} from '@rneui/base';

const RankTable = ({state, source, sourceYesterday}) => {
  const {user, team, loading} = useContext(MainContext);
  const header = ['Rank', 'Team', 'Step'];
  const userHeader = ['Rank', 'User', 'Step', 'Status'];
  const fontStyle = useStyles();
  const [teamName, setTeamName] = useState('');
  const {getAllTeams} = useTeam();
  const [data, setData] = useState([]);

  const getData = () => {
    if (state != 'Team') {
      const array = source.map((element) => {
        let string = 'none';
        for (let j = 0; j < sourceYesterday.length; j++) {
          if (element[1] == sourceYesterday[j][1]) {
            if (element[0] == sourceYesterday[j][0]) {
              string = 'none';
            } else if (element[0] < sourceYesterday[j][0]) {
              string = 'up';
            } else {
              string = 'down';
            }
          }
        }
        return string;
      });
      setData(array);
    }
  };

  useEffect(() => {
    getData();
  }, [loading]);

  const getTeamName = async () => {
    try {
      const array = await getAllTeams();
      if (array) {
        for (let i = 0; i < 6; i++) {
          if (array[i].team_id == team) {
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
      <Table key={'table'} style={styles.container}>
        <Row
          key={'header'}
          data={state == 'Team' ? header : userHeader}
          textStyle={styles.textHeader}
        />
        <ScrollView
          key={'scroll'}
          contentContainerStyle={{
            height: Dimensions.get('window').height * 0.9,
          }}
        >
          {state == 'Team'
            ? source.map((rowData) => (
                <Row
                  key={rowData[0]}
                  data={rowData}
                  style={[
                    styles.teamRow,
                    rowData[1] == teamName && {
                      backgroundColor: colorSet.primary,
                    },
                  ]}
                  textStyle={[styles.teamText, fontStyle.Text]}
                />
              ))
            : source.map((rowData, index) => (
                <View key={rowData[0]} style={styles.rowWithIcon}>
                  <Row
                    key={rowData[1]}
                    data={rowData}
                    style={[styles.row]}
                    textStyle={[
                      styles.text,
                      fontStyle.Text,
                      rowData[1] == user && styles.textUser,
                    ]}
                  />
                  <View key={rowData[2]} style={{marginTop: 10, marginLeft: 10}}>
                    {data[index] == 'none' ? (
                      <Icon
                        key={'same'}
                        name="equal"
                        type="material-community"
                        size={30}
                        color={colorSet.black}
                      ></Icon>
                    ) : data[index] == 'up' ? (
                      <Icon
                        key={'up'}
                        name="arrow-up"
                        type="ionicon"
                        size={30}
                        color={colorSet.green}
                      ></Icon>
                    ) : (
                      <Icon
                        key={'down'}
                        name="arrow-down"
                        type="ionicon"
                        size={30}
                        color={colorSet.red}
                      ></Icon>
                    )}
                  </View>
                </View>
              ))}
        </ScrollView>
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
    color: '#555555',
  },
  textUser: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Nunito-ExtraBold',
    color: colorSet.black,
  },
  row: {
    width: '80%',
    marginTop: 20,
  },
  teamRow: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: colorSet.darkGray,
  },
  teamText: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Nunito-Bold',
    color: colorSet.black,
  },
  rowWithIcon: {
    borderBottomWidth: 1,
    borderColor: colorSet.darkGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default RankTable;
