import {Table, Row, Rows} from 'react-native-table-component';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import {colorSet, useStyles} from '../utils/GlobalStyle';
import {useContext, useState, useEffect} from 'react';
import {MainContext} from '../contexts/MainContext';
import {useTeam} from '../hooks/ApiHooks';
import {Icon} from '@rneui/base';

const RankTable = ({state, source, sourceYesterday}) => {
  const {user, team, loading} = useContext(MainContext);
  const header = ['Rank', state, 'Step'];
  const fontStyle = useStyles();
  const [teamName, setTeamName] = useState('');
  const {getAllTeams} = useTeam();
  const [data, setData] = useState([]);

  const getData = () => {
    if (state != 'Team') {
      for (let i = 0; i < source.length; i++) {
        for (let j = 0; j < sourceYesterday.length; j++) {
          if (source[i][1] == sourceYesterday[j][1]) {
            if (source[i][0] == sourceYesterday[j][0]) {
            } else if (source[i][0] < sourceYesterday[j][0]) {
            } else {
            }
          }
        }
      }
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
      <Table style={styles.container}>
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
          : source.map((rowData, index) => (
              <View
                style={{flexDirection: 'row', jutifyContent: 'space-evenly'}}
              >
                <Row
                  key={index}
                  data={rowData}
                  style={[
                    styles.row,
                    rowData[1] == user && {backgroundColor: colorSet.primary},
                  ]}
                  textStyle={[styles.text, fontStyle.Text]}
                />
                {data[index] == 'none' ? (
                  <Icon
                    name="equal"
                    type="material-community"
                    size={30}
                    color={colorSet.black}
                  ></Icon>
                ) : data[index] == 'up' ? (
                  <Icon
                    name="arrow-up"
                    type="ionicon"
                    size={30}
                    color={colorSet.green}
                  ></Icon>
                ) : (
                  <Icon
                    name="arrow-down"
                    type="ionicon"
                    size={30}
                    color={colorSet.red}
                  ></Icon>
                )}
              </View>
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
    width: '80%',
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: colorSet.darkGray,
  },
});

export default RankTable;
